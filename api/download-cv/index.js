"use strict";

const { verify } = require("../shared/tokens");
const { getRequest, updateRequest, downloadCvBuffer } = require("../shared/storage");

module.exports = async function (context, req) {
  const id = String((req.query && req.query.id) || "");
  const token = String((req.query && req.query.token) || "");

  try {
    if (!id || !verify("download", id, token)) {
      context.res = { status: 403, body: "This link is invalid." };
      return;
    }

    const entity = await getRequest(id);
    if (!entity || entity.status !== "approved") {
      context.res = { status: 403, body: "This link is no longer active." };
      return;
    }
    if (entity.downloadExpires && new Date(entity.downloadExpires).getTime() < Date.now()) {
      context.res = { status: 403, body: "This link has expired." };
      return;
    }

    const { buffer, blobName } = await downloadCvBuffer();

    await updateRequest({
      partitionKey: "request",
      rowKey: id,
      downloads: (entity.downloads || 0) + 1,
      lastDownloadAt: new Date().toISOString(),
    }).catch(() => {});

    context.res = {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${blobName}"`,
        "Cache-Control": "no-store",
      },
      body: buffer,
      isRaw: true,
    };
  } catch (err) {
    context.log.error("download-cv error", err);
    context.res = { status: 500, body: "Unable to fetch the CV." };
  }
};
