import { glob } from 'glob';
import fs from 'fs/promises';

// --- Configuration ---
const SITE_URL = 'https://accessdlsu.com';
// --- End Configuration ---

async function generateSitemap() {
  const buildDate = new Date().toISOString();

  // Find all static page routes
  const pageFiles = await glob('src/app/**/page.{js,jsx,ts,tsx}');
  const staticUrls = pageFiles
    .map((file) => {
      // Create the URL path from the file path
      const path = file
        .replace(/\\/g, '/') // Ensure forward slashes for URLs
        .replace(/^src\/app/, '')
        .replace(/\/page\.(js|jsx|ts|tsx)$/, '');
      // Handle the root index page which would otherwise become an empty string
      return path === '' ? '/' : path;
    })
    // Filter out dynamic route templates like /app/blog/[slug]/page.tsx
    .filter((path) => !path.includes('[') && !path.includes('('));

  // Combine all URLs
  const allUrls = staticUrls;

  // Format into XML
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map((url) => `<url><loc>${SITE_URL}${url}</loc><lastmod>${buildDate}</lastmod></url>`)
  .join('\n')}
</urlset>`;

  // Write the file
  await fs.writeFile('.open-next/assets/sitemap.xml', sitemapContent);
  console.log('✅ Sitemap generated successfully');
}

generateSitemap();
