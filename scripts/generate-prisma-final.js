import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const BACKEND_DIR = '/vercel/share/v0-next-shadcn/backend';

console.log('[v0] Prisma Client Generation');
console.log('[v0] Backend directory:', BACKEND_DIR);

// Verify backend directory exists
if (!fs.existsSync(BACKEND_DIR)) {
  console.error('[v0] ERROR: Backend directory not found at', BACKEND_DIR);
  process.exit(1);
}

console.log('[v0] Backend directory exists ✓');

// Check if prisma is installed
const prismaBinPath = path.join(BACKEND_DIR, 'node_modules/.bin/prisma');
console.log('[v0] Looking for prisma at:', prismaBinPath);

if (!fs.existsSync(prismaBinPath)) {
  console.error('[v0] ERROR: Prisma binary not found');
  console.error('[v0] Tried path:', prismaBinPath);
  process.exit(1);
}

console.log('[v0] Prisma binary found ✓');

// Run prisma generate
try {
  console.log('[v0] Running: prisma generate');
  const result = execSync(`${prismaBinPath} generate`, {
    cwd: BACKEND_DIR,
    stdio: 'inherit'
  });
  console.log('[v0] Prisma client generated successfully ✓');
} catch (error) {
  console.error('[v0] ERROR: Failed to generate Prisma client');
  console.error('[v0] Error details:', error.message);
  process.exit(1);
}
