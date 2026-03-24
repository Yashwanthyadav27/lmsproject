import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const backendDir = path.resolve(path.dirname(__filename), '../backend');

console.log('[v0] Backend directory:', backendDir);
console.log('[v0] Generating Prisma client...');

try {
  // Run prisma generate
  execSync('npm run prisma:generate', {
    cwd: backendDir,
    stdio: 'inherit'
  });
  
  console.log('[v0] ✓ Prisma client generated successfully!');
  process.exit(0);
} catch (error) {
  console.error('[v0] ✗ Error generating Prisma client:', error.message);
  process.exit(1);
}
