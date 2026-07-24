"use strict";

const crypto = require("crypto");

function base64url(buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Create an HMAC-SHA256 signature bound to a purpose and request id.
 * @param {"manage"|"download"} purpose
 * @param {string} id
 * @returns {string}
 */
function sign(purpose, id) {
  const secret = process.env.APPROVAL_SIGNING_SECRET;
  if (!secret) {
    throw new Error("APPROVAL_SIGNING_SECRET is not configured");
  }
  const mac = crypto
    .createHmac("sha256", secret)
    .update(`${purpose}:${id}`)
    .digest();
  return base64url(mac);
}

/**
 * Constant-time verification of a token.
 * @param {"manage"|"download"} purpose
 * @param {string} id
 * @param {string} token
 * @returns {boolean}
 */
function verify(purpose, id, token) {
  if (!token || !id) return false;
  let expected;
  try {
    expected = sign(purpose, id);
  } catch {
    return false;
  }
  const a = Buffer.from(expected);
  const b = Buffer.from(String(token));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

module.exports = { sign, verify };
