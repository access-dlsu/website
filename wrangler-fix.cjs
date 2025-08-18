// This script updates the `name` field in wrangler.jsonc based on the current git branch
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const commentJson = require('comment-json');

const wranglerPath = path.join(__dirname, 'wrangler.jsonc');

// Exit if not running in a CI/CD or serverless environment
if (
  !process.env.CI &&
  !process.env.SERVERLESS &&
  !process.env.CF_PAGES &&
  !process.env.CF_WORKERS
) {
  process.exit(0);
}

function getBranch() {
  if (process.env.BRANCH_NAME) {
    return process.env.BRANCH_NAME;
  }
  try {
    return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  } catch (e) {
    return null;
  }
}

function updateWranglerName() {
  if (!fs.existsSync(wranglerPath)) {
    console.error('wrangler.jsonc not found');
    process.exit(1);
  }
  const reset = process.argv.includes('--reset') || process.argv.includes('-r');
  const branch = getBranch();
  const wrangler = commentJson.parse(fs.readFileSync(wranglerPath, 'utf8'));
  if (reset || !branch || branch === 'main') {
    wrangler.name = `infinity`;
    delete wrangler.workers_dev;
    delete wrangler.preview_urls;
    console.log(`Reset wrangler.jsonc name`);
  } else {
    wrangler.name = `infinity-${branch}`;
    wrangler.workers_dev = false;
    wrangler.preview_urls = false;
    console.log(`Updated wrangler.jsonc name to infinity-${branch}`);
  }
  fs.writeFileSync(wranglerPath, commentJson.stringify(wrangler, null, 2));
}

updateWranglerName();
