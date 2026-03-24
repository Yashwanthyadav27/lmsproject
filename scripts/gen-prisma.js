const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// The actual backend location
const backendPath = '/vercel/share/v0-next-shadcn/backend';

console.log('[v0] Generating Prisma client...');
console.log('[v0] Backend path:', backendPath);

// Check if backend exists
if (!fs.existsSync(backendPath)) {
  console.log('[v0] ERROR: Backend directory not found');
  process.exit(1);
}

// Check if prisma schema exists
const schemaPath = path.join(backendPath, 'prisma', 'schema.prisma');
if (!fs.existsSync(schemaPath)) {
  console.log('[v0] ERROR: Prisma schema not found at', schemaPath);
  process.exit(1);
}

console.log('[v0] Found Prisma schema at:', schemaPath);

try {
  // Run prisma generate in the backend directory
  console.log('[v0] Running: prisma generate');
  
  execSync('npx prisma generate', {
    cwd: backendPath,
    stdio: 'inherit'
  });

  console.log('[v0] ✓ Prisma client generated successfully!');
  process.exit(0);
} catch (error) {
  console.error('[v0] Failed to generate Prisma client:', error.message);
  process.exit(1);
}
