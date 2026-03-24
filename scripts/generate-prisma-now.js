import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The backend is at /vercel/share/v0-next-shadcn/backend
const backendDir = '/vercel/share/v0-next-shadcn/backend';

console.log('[v0] Generating Prisma client...');
console.log('[v0] Backend directory:', backendDir);

try {
  // Run prisma generate using npx
  const command = 'npx prisma generate';
  console.log('[v0] Running command:', command);
  
  const output = execSync(command, {
    cwd: backendDir,
    stdio: 'pipe',
    encoding: 'utf-8'
  });
  
  console.log('[v0] Output:', output);
  console.log('[v0] ✓ Prisma client generated successfully!');
  process.exit(0);
  
} catch (error) {
  console.error('[v0] Error output:', error.stdout || error.message);
  console.error('[v0] Error stderr:', error.stderr || '');
  console.error('[v0] ✗ Failed to generate Prisma client');
  process.exit(1);
}
