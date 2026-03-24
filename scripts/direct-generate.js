import fs from 'fs';
import path from 'path';

const backendPath = '/vercel/share/v0-next-shadcn/backend';
const prismaPath = path.join(backendPath, 'node_modules', '.bin', 'prisma');

console.log('[v0] Checking Prisma binary at:', prismaPath);
console.log('[v0] Exists:', fs.existsSync(prismaPath));

// Try to find prisma in node_modules
const prismaCliPath = path.join(backendPath, 'node_modules', 'prisma', 'build', 'index.js');
console.log('[v0] Checking Prisma CLI at:', prismaCliPath);
console.log('[v0] Exists:', fs.existsSync(prismaCliPath));

// List what's in the backend node_modules
const nodeModulesPath = path.join(backendPath, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  const dirs = fs.readdirSync(nodeModulesPath).slice(0, 20);
  console.log('[v0] Found in node_modules:', dirs);
}

// Try to import prisma directly
try {
  console.log('[v0] Attempting to require prisma...');
  const { exec } = await import('node:child_process');
  
  exec(`cd ${backendPath} && npx prisma generate`, (error, stdout, stderr) => {
    if (error) {
      console.error('[v0] Error:', error.message);
      process.exit(1);
    }
    console.log('[v0] Success!');
    console.log(stdout);
  });
} catch (e) {
  console.error('[v0] Failed:', e.message);
  process.exit(1);
}
