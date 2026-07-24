"use strict";

/**
 * Minimal branded HTML page used for approve/deny confirmation screens.
 */
function page(title, bodyHtml) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<style>
  body { font-family: "Segoe UI", system-ui, -apple-system, sans-serif; background: #f5f6f8; color: #1b1a19; display: grid; place-items: center; min-height: 100vh; margin: 0; }
  .card { background: #fff; border: 1px solid #e1e1e1; border-radius: 12px; padding: 36px 44px; max-width: 460px; box-shadow: 0 2px 6px rgba(0,0,0,.08); }
  .bar { height: 4px; width: 44px; border-radius: 999px; background: linear-gradient(90deg,#0f6cbd,#8764b8); margin-bottom: 18px; }
  h1 { font-size: 20px; margin: 0 0 8px; }
  p { color: #605e5c; font-size: 14px; line-height: 1.55; margin: 6px 0; }
</style>
</head>
<body>
  <div class="card">
    <div class="bar"></div>
    <h1>${title}</h1>
    ${bodyHtml}
  </div>
</body>
</html>`;
}

module.exports = { page };
