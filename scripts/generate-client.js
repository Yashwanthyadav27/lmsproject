import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The backend is at /vercel/share/v0-next-shadcn/backend
const backendPath = '/vercel/share/v0-next-shadcn/backend';

console.log('[v0] Generating Prisma client...');
console.log('[v0] Backend path:', backendPath);

try {
  // Try to run prisma generate with the binary from node_modules
  const prismaBinary = path.join(backendPath, 'node_modules', '.bin', 'prisma');
  
  console.log('[v0] Running prisma generate...');
  execSync(`${prismaBinary} generate`, {
    cwd: backendPath,
    stdio: 'inherit',
    shell: true
  });
  
  console.log('[v0] ✓ Prisma client generated successfully!');
} catch (error) {
  console.error('[v0] Error generating Prisma client:', error.message);
  
  // Try alternative approach with npx
  try {
    console.log('[v0] Trying with npx...');
    execSync('npx prisma generate', {
      cwd: backendPath,
      stdio: 'inherit'
    });
    console.log('[v0] ✓ Prisma client generated with npx!');
  } catch (npxError) {
    console.error('[v0] npx approach also failed:', npxError.message);
    process.exit(1);
  }
}
