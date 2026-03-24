import { execSync } from 'child_process';
import path from 'path';

const backendDir = path.join(process.cwd(), 'backend');

console.log('[Prisma Setup] Generating Prisma client...');

try {
  execSync('prisma generate', {
    cwd: backendDir,
    stdio: 'inherit',
    shell: true
  });
  console.log('[Prisma Setup] ✓ Prisma client generated successfully!');
} catch (error) {
  console.error('[Prisma Setup] ✗ Failed to generate Prisma client');
  console.error(error.message);
  process.exit(1);
}
