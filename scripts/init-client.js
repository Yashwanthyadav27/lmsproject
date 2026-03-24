import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const backendPath = '/vercel/share/v0-next-shadcn/backend';

console.log('[v0] Initializing Prisma client...');
console.log('[v0] Backend path:', backendPath);

try {
  // Check if the backend directory exists
  if (!fs.existsSync(backendPath)) {
    console.log('[v0] Backend directory not found at:', backendPath);
    process.exit(1);
  }

  // Check if prisma is installed in node_modules
  const prismaPath = path.join(backendPath, 'node_modules/.bin/prisma');
  if (!fs.existsSync(prismaPath)) {
    console.log('[v0] Prisma binary not found at:', prismaPath);
    process.exit(1);
  }

  console.log('[v0] Running prisma generate...');
  
  // Run prisma generate in the backend directory
  const output = execSync(`${prismaPath} generate`, {
    cwd: backendPath,
    stdio: 'inherit',
    encoding: 'utf-8'
  });

  console.log('[v0] ✓ Prisma client generated successfully!');
  process.exit(0);
} catch (error) {
  console.error('[v0] ✗ Error generating Prisma client:');
  console.error(error.message);
  process.exit(1);
}
