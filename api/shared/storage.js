"use strict";

const { TableClient } = require("@azure/data-tables");
const { BlobServiceClient } = require("@azure/storage-blob");

const TABLE_NAME = "cvrequests";
const PARTITION = "request";

function connectionString() {
  const conn = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!conn) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING is not configured");
  }
  return conn;
}

let tablePromise = null;
async function getTable() {
  if (!tablePromise) {
    const client = TableClient.fromConnectionString(connectionString(), TABLE_NAME);
    tablePromise = client.createTable().catch(() => {}).then(() => client);
  }
  return tablePromise;
}

async function createRequest(entity) {
  const table = await getTable();
  await table.createEntity(entity);
}

async function getRequest(id) {
  const table = await getTable();
  try {
    return await table.getEntity(PARTITION, id);
  } catch {
    return null;
  }
}

async function updateRequest(entity) {
  const table = await getTable();
  await table.updateEntity(entity, "Merge");
}

/**
 * Count how many requests a given email has made since an ISO timestamp.
 * Used for lightweight rate limiting.
 */
async function countRecentByEmail(email, sinceIso) {
  const table = await getTable();
  const safeEmail = email.replace(/'/g, "''");
  const filter = `PartitionKey eq '${PARTITION}' and email eq '${safeEmail}' and createdAt ge '${sinceIso}'`;
  let count = 0;
  const iter = table.listEntities({ queryOptions: { filter } });
  for await (const _entity of iter) {
    count += 1;
    if (count > 50) break;
  }
  return count;
}

/**
 * Download the private CV blob into a Buffer. The blob is never public.
 */
async function downloadCvBuffer() {
  const container = process.env.CV_CONTAINER || "cv";
  const blobName = process.env.CV_BLOB_NAME || "Joram-Antwi-CV.pdf";
  const service = BlobServiceClient.fromConnectionString(connectionString());
  const blobClient = service.getContainerClient(container).getBlobClient(blobName);
  const buffer = await blobClient.downloadToBuffer();
  return { buffer, blobName };
}

module.exports = {
  createRequest,
  getRequest,
  updateRequest,
  countRecentByEmail,
  downloadCvBuffer,
  PARTITION,
};
