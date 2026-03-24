import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const backendDir = '/vercel/share/v0-next-shadcn/backend';

console.log('[v0] Checking backend directory...');
if (!fs.existsSync(backendDir)) {
  console.error(`[v0] Backend directory not found at ${backendDir}`);
  process.exit(1);
}

console.log(`[v0] Backend found at: ${backendDir}`);
console.log('[v0] Checking for prisma binary...');

// Path to prisma binary in pnpm structure
const prismaBin = path.join(backendDir, 'node_modules', '.pnpm', 'prisma@5.22.0', 'node_modules', 'prisma', 'dist', 'bin.js');

if (!fs.existsSync(prismaBin)) {
  console.log('[v0] Prisma binary not found at expected pnpm path, trying alternative...');
  // Try node_modules/.bin/prisma
  const altPrismaBin = path.join(backendDir, 'node_modules', '.bin', 'prisma');
  if (!fs.existsSync(altPrismaBin)) {
    console.error('[v0] Prisma binary not found');
    process.exit(1);
  }
}

console.log('[v0] Running: prisma generate');
console.log(`[v0] Working directory: ${backendDir}`);

// Run prisma generate
const prisma = spawn('npx', ['prisma', 'generate'], {
  cwd: backendDir,
  stdio: 'inherit',
  shell: true
});

prisma.on('close', (code) => {
  if (code === 0) {
    console.log('[v0] ✓ Prisma client generated successfully!');
    process.exit(0);
  } else {
    console.error(`[v0] ✗ Prisma generation failed with code ${code}`);
    process.exit(1);
  }
});

prisma.on('error', (err) => {
  console.error('[v0] Error running prisma generate:', err.message);
  process.exit(1);
});
