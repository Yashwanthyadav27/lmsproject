import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendDir = path.join(__dirname, '../backend');

console.log('[v0] Starting Prisma setup...');
console.log('[v0] Backend directory:', backendDir);

try {
  console.log('[v0] Generating Prisma client...');
  execSync('prisma generate', { 
    cwd: backendDir,
    stdio: 'inherit'
  });
  console.log('[v0] Prisma client generated successfully!');
} catch (error) {
  console.error('[v0] Error generating Prisma client:', error.message);
  process.exit(1);
}
