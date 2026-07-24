"use strict";

const { EmailClient } = require("@azure/communication-email");

let clientInstance = null;
function getClient() {
  const conn = process.env.ACS_CONNECTION_STRING;
  if (!conn) {
    throw new Error("ACS_CONNECTION_STRING is not configured");
  }
  if (!clientInstance) {
    clientInstance = new EmailClient(conn);
  }
  return clientInstance;
}

/**
 * Send an email via Azure Communication Services.
 * @param {{ to: string, subject: string, html: string, plainText?: string, replyTo?: string }} message
 */
async function sendEmail({ to, subject, html, plainText, replyTo }) {
  const senderAddress = process.env.ACS_SENDER_ADDRESS;
  if (!senderAddress) {
    throw new Error("ACS_SENDER_ADDRESS is not configured");
  }
  const client = getClient();
  const emailMessage = {
    senderAddress,
    content: { subject, html, plainText: plainText || "" },
    recipients: { to: [{ address: to }] },
  };
  if (replyTo) {
    emailMessage.replyTo = [{ address: replyTo }];
  }
  const poller = await client.beginSend(emailMessage);
  await poller.pollUntilDone();
}

module.exports = { sendEmail };
