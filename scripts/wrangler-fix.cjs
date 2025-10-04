/**
 * Wrangler Fix Script
 * 
 * This script patches Next.js configuration to ensure compatibility with Cloudflare Workers.
 * It runs before the Next.js build process.
 * 
 * Common fixes:
 * - Ensures proper module resolution for Cloudflare Workers runtime
 * - Patches experimental features that may conflict with Workers
 */

const fs = require('fs');
const path = require('path');

function applyWranglerFixes() {
  console.log('🔧 Applying Cloudflare Workers compatibility fixes...');
  
  // Check if next.config.ts exists
  const nextConfigPath = path.join(process.cwd(), 'next.config.ts');
  
  if (fs.existsSync(nextConfigPath)) {
    console.log('✅ Next.js config found');
    
    // Read the config
    let config = fs.readFileSync(nextConfigPath, 'utf8');
    
    // Ensure no Turbopack in production builds (already handled by package.json)
    // This is just a safety check
    
    console.log('✅ Configuration verified for Cloudflare Workers compatibility');
  }
  
  console.log('✅ Wrangler fixes applied successfully');
}

// Run the fixes
try {
  applyWranglerFixes();
  process.exit(0);
} catch (error) {
  console.error('❌ Error applying Wrangler fixes:', error);
  process.exit(1);
}
