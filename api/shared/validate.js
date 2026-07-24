"use strict";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, max) {
  return String(value == null ? "" : value)
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, max);
}

/**
 * Validate and normalise an incoming CV request body.
 * @param {Record<string, unknown>} body
 */
function validateRequest(body) {
  const value = {
    name: clean(body.name, 120),
    email: clean(body.email, 200).toLowerCase(),
    company: clean(body.company, 160),
    message: clean(body.message, 2000),
    honeypot: clean(body.website, 100),
  };
  const errors = [];
  if (value.name.length < 2) errors.push("name");
  if (!EMAIL_RE.test(value.email)) errors.push("email");
  return { value, errors };
}

function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

module.exports = { validateRequest, escapeHtml };
