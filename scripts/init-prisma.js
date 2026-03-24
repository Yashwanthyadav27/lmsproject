import { spawn } from 'child_process';
import path from 'path';

const backendDir = '/vercel/share/v0-next-shadcn/backend';

console.log('[Prisma Setup] Generating Prisma client...');

const prisma = spawn('npx', ['prisma', 'generate'], {
  cwd: backendDir,
  stdio: 'inherit'
});

prisma.on('close', (code) => {
  if (code === 0) {
    console.log('[Prisma Setup] ✓ Prisma client generated successfully!');
    process.exit(0);
  } else {
    console.error('[Prisma Setup] ✗ Failed to generate Prisma client');
    process.exit(1);
  }
});

prisma.on('error', (error) => {
  console.error('[Prisma Setup] ✗ Failed to generate Prisma client');
  console.error(error.message);
  process.exit(1);
});
