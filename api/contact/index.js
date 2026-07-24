"use strict";

const { escapeHtml } = require("../shared/validate");
const { sendEmail } = require("../shared/email");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, max) {
  return String(value == null ? "" : value)
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, max);
}

module.exports = async function (context, req) {
  try {
    const body = req.body || {};
    const name = clean(body.name, 120);
    const email = clean(body.email, 200).toLowerCase();
    const message = clean(body.message, 4000);
    const honeypot = clean(body.website, 100);

    // Honeypot: silently accept and drop bots.
    if (honeypot) {
      context.res = { status: 200, body: { ok: true } };
      return;
    }

    const errors = [];
    if (name.length < 2) errors.push("name");
    if (!EMAIL_RE.test(email)) errors.push("email");
    if (message.length < 5) errors.push("message");
    if (errors.length) {
      context.res = { status: 400, body: { ok: false, errors } };
      return;
    }

    const owner = process.env.OWNER_EMAIL;
    if (owner) {
      await sendEmail({
        to: owner,
        subject: `Portfolio message from ${name}`,
        html: `<div style="font-family:'Segoe UI',sans-serif;color:#1b1a19">
<h2>New message from your portfolio</h2>
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Message:</strong><br>${escapeHtml(message)}</p>
</div>`,
        plainText: `New message from ${name} (${email}):\n\n${message}`,
        replyTo: email,
      });
    }

    context.res = { status: 200, body: { ok: true } };
  } catch (err) {
    context.log.error("contact error", err);
    context.res = {
      status: 500,
      body: { ok: false, error: "Something went wrong. Please try again later." },
    };
  }
};
