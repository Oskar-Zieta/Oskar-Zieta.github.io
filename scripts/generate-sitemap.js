const fs = require('fs');
const path = require('path');

// Configure these for your site
const hostname = 'https://zieta.dev';
const pages = ['/', '/about.html', '/projects.html', '/contact.html'];

function makeUrl(loc) {
  const lastmod = new Date().toISOString().split('T')[0];
  return `  <url>\n    <loc>${hostname}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n  </url>`;
}

const urls = pages.map(makeUrl).join('\n');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

fs.writeFileSync(path.join(__dirname, '..', 'sitemap.xml'), xml, 'utf8');
console.log('sitemap.xml generated');
