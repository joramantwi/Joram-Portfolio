"use strict";

const { verify, sign } = require("../shared/tokens");
const { getRequest, updateRequest } = require("../shared/storage");
const { sendEmail } = require("../shared/email");
const { escapeHtml } = require("../shared/validate");
const { page } = require("../shared/html");

module.exports = async function (context, req) {
  const id = String((req.query && req.query.id) || "");
  const action = String((req.query && req.query.action) || "");
  const token = String((req.query && req.query.token) || "");

  const respond = (title, bodyHtml, status = 200) => {
    context.res = {
      status,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: page(title, bodyHtml),
    };
  };

  try {
    if (!id || !verify("manage", id, token)) {
      return respond("Invalid link", "<p>This approval link is not valid.</p>", 400);
    }

    const entity = await getRequest(id);
    if (!entity) {
      return respond("Not found", "<p>This request no longer exists.</p>", 404);
    }
    if (entity.status !== "pending") {
      return respond(
        "Already handled",
        `<p>This request was already <strong>${escapeHtml(entity.status)}</strong>.</p>`
      );
    }

    const base = (process.env.SITE_BASE_URL || "").replace(/\/$/, "");

    if (action === "approve") {
      const expires = new Date(Date.now() + 72 * 3600 * 1000).toISOString();
      await updateRequest({
        partitionKey: "request",
        rowKey: id,
        status: "approved",
        approvedAt: new Date().toISOString(),
        downloadExpires: expires,
        downloads: 0,
      });

      const downloadToken = sign("download", id);
      const url = `${base}/api/download-cv?id=${id}&token=${downloadToken}`;

      await sendEmail({
        to: entity.email,
        subject: "Your requested CV — Joram Antwi",
        html: `<div style="font-family:'Segoe UI',sans-serif;color:#1b1a19">
<p>Hi ${escapeHtml(entity.name)},</p>
<p>Thanks for your interest. You can download my CV using the private link below. It is valid for 72 hours.</p>
<p style="margin:20px 0"><a href="${url}" style="background:#0f6cbd;color:#fff;padding:11px 20px;border-radius:6px;text-decoration:none">Download CV</a></p>
<p style="color:#8a8886;font-size:12px">If the button doesn't work, copy this link into your browser:<br>${url}</p>
<p>Best regards,<br>Joram Antwi</p>
</div>`,
        plainText: `Hi ${entity.name}, here is my CV (private link, valid 72 hours): ${url}`,
      });

      return respond(
        "Approved",
        "<p>The requester has been emailed a private, time-limited download link.</p>"
      );
    }

    if (action === "deny") {
      await updateRequest({
        partitionKey: "request",
        rowKey: id,
        status: "denied",
        deniedAt: new Date().toISOString(),
      });
      return respond("Declined", "<p>The request was declined. No CV link was sent.</p>");
    }

    return respond("Invalid action", "<p>Unknown action.</p>", 400);
  } catch (err) {
    context.log.error("decide-cv error", err);
    return respond("Error", "<p>Something went wrong handling this request.</p>", 500);
  }
};
