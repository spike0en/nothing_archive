'use strict';

const fs = require('node:fs');
const path = require('node:path');

function basePath(baseUrl) {
  const value = typeof baseUrl === 'string' && baseUrl ? baseUrl : '/';
  const trimmed = value.replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}` : '';
}

function targetPath(relativePath, baseUrl) {
  const route = `/${relativePath.slice(0, -'.html'.length)}`;
  const base = basePath(baseUrl);
  return base && !route.startsWith(`${base}/`) ? `${base}${route}` : route;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function escapeScript(value) {
  return JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, (character) => ({
    '<': '\\u003C', '>': '\\u003E', '&': '\\u0026',
    '\u2028': '\\u2028', '\u2029': '\\u2029',
  })[character]);
}

function redirectHtml(target, siteUrl) {
  const safeTarget = escapeHtml(target);
  const canonical = escapeHtml(siteUrl ? `${siteUrl.replace(/\/+$/, '')}${target}` : target);
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="robots" content="noindex,follow,noai,noimageai">
<meta name="tdm-reservation" content="1">
<link rel="canonical" href="${canonical}">
<meta http-equiv="refresh" content="0;url=${safeTarget}">
<title>Redirecting</title>
<script>(function(){var target=${escapeScript(target)};window.location.replace(target+window.location.search+window.location.hash);}());</script>
</head><body><p>Redirecting to <a href="${safeTarget}">${safeTarget}</a>.</p></body></html>
`;
}

module.exports = function canonicalRedirectsPlugin(context = {}) {
  const siteConfig = context.siteConfig || {};
  const base = basePath(siteConfig.baseUrl);
  const siteUrl = siteConfig.url || '';

  return {
    name: 'canonical-redirects',
    async postBuild({ outDir }) {
      const introCandidates = [
        path.join(outDir, 'docs', 'intro.html'),
        path.join(outDir, base.slice(1), 'docs', 'intro.html'),
      ];
      const intro = introCandidates.find((filePath) => fs.existsSync(filePath) && fs.statSync(filePath).isFile());
      if (!intro) return;

      const alias = path.join(path.dirname(intro), 'index.html');
      if (fs.existsSync(alias)) return;
      const relative = path.relative(outDir, intro).split(path.sep).join('/');
      fs.writeFileSync(alias, redirectHtml(targetPath(relative, siteConfig.baseUrl), siteUrl), 'utf8');
    },
  };
};
