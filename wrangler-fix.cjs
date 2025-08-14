// This script updates the `name` field in wrangler.jsonc based on the current git branch
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const commentJson = require('comment-json');

const wranglerPath = path.join(__dirname, 'wrangler.jsonc');

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
  const branch = getBranch();
  const wrangler = commentJson.parse(fs.readFileSync(wranglerPath, 'utf8'));
  if (branch && branch !== 'main') {
    wrangler.name = `infinity-${branch}`;
    console.log(`Updated wrangler.jsonc name to infinity-${branch}`);
  }
  fs.writeFileSync(wranglerPath, commentJson.stringify(wrangler, null, 2));
}

updateWranglerName();
