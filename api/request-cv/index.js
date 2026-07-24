"use strict";

const { randomUUID } = require("crypto");
const { validateRequest, escapeHtml } = require("../shared/validate");
const { createRequest, countRecentByEmail } = require("../shared/storage");
const { sendEmail } = require("../shared/email");
const { sign } = require("../shared/tokens");

module.exports = async function (context, req) {
  try {
    const { value, errors } = validateRequest(req.body || {});

    // Honeypot: silently accept and drop bot submissions.
    if (value.honeypot) {
      context.res = { status: 200, body: { ok: true } };
      return;
    }
    if (errors.length) {
      context.res = { status: 400, body: { ok: false, errors } };
      return;
    }

    // Lightweight rate limit: max 3 requests per email per hour.
    const sinceIso = new Date(Date.now() - 3600 * 1000).toISOString();
    const recent = await countRecentByEmail(value.email, sinceIso).catch(() => 0);
    if (recent >= 3) {
      context.res = {
        status: 429,
        body: { ok: false, error: "Too many requests. Please try again later." },
      };
      return;
    }

    const id = randomUUID();
    const nowIso = new Date().toISOString();
    await createRequest({
      partitionKey: "request",
      rowKey: id,
      name: value.name,
      email: value.email,
      company: value.company,
      message: value.message,
      status: "pending",
      createdAt: nowIso,
    });

    const base = (process.env.SITE_BASE_URL || "").replace(/\/$/, "");
    const token = sign("manage", id);
    const approveUrl = `${base}/api/decide-cv?id=${id}&action=approve&token=${token}`;
    const denyUrl = `${base}/api/decide-cv?id=${id}&action=deny&token=${token}`;

    const owner = process.env.OWNER_EMAIL;
    if (owner) {
      await sendEmail({
        to: owner,
        subject: `CV request from ${value.name}${value.company ? ` (${value.company})` : ""}`,
        html: `<h2 style="font-family:'Segoe UI',sans-serif">New CV request</h2>
<p><strong>Name:</strong> ${escapeHtml(value.name)}</p>
<p><strong>Email:</strong> ${escapeHtml(value.email)}</p>
<p><strong>Company:</strong> ${escapeHtml(value.company) || "—"}</p>
<p><strong>Message:</strong><br>${escapeHtml(value.message) || "—"}</p>
<p style="margin-top:20px">
<a href="${approveUrl}" style="background:#107c41;color:#fff;padding:11px 20px;border-radius:6px;text-decoration:none;font-family:'Segoe UI',sans-serif;margin-right:10px">Approve &amp; send CV</a>
<a href="${denyUrl}" style="background:#c33d2e;color:#fff;padding:11px 20px;border-radius:6px;text-decoration:none;font-family:'Segoe UI',sans-serif">Deny</a>
</p>`,
        plainText: `New CV request from ${value.name} (${value.email}).\nApprove: ${approveUrl}\nDeny: ${denyUrl}`,
      });
    }

    context.res = { status: 200, body: { ok: true } };
  } catch (err) {
    context.log.error("request-cv error", err);
    context.res = {
      status: 500,
      body: { ok: false, error: "Something went wrong. Please try again later." },
    };
  }
};
