import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

// The backend directory that's actually running
const backendDir = '/vercel/share/v0-next-shadcn/backend';

console.log('[v0] Initializing Prisma client generation...');
console.log(`[v0] Backend directory: ${backendDir}`);

// Check if the directory exists
if (!fs.existsSync(backendDir)) {
  console.error(`[v0] Error: Backend directory not found at ${backendDir}`);
  // Try alternative path
  const altPath = path.resolve(process.cwd(), 'backend');
  console.log(`[v0] Trying alternative path: ${altPath}`);
  if (fs.existsSync(altPath)) {
    console.log(`[v0] Found at: ${altPath}`);
    // Use the alternative path
    generatePrismaClient(altPath);
  } else {
    process.exit(1);
  }
} else {
  generatePrismaClient(backendDir);
}

function generatePrismaClient(dir) {
  try {
    console.log(`[v0] Running prisma generate in ${dir}...`);
    
    // Find the prisma binary in node_modules/.bin or node_modules/prisma
    const binPath = path.join(dir, 'node_modules', '.bin', 'prisma');
    const cliPath = path.join(dir, 'node_modules', 'prisma', 'build', 'index.js');
    
    let command;
    if (fs.existsSync(binPath)) {
      command = `${binPath} generate`;
    } else if (fs.existsSync(cliPath)) {
      command = `node ${cliPath} generate`;
    } else {
      // Fallback to npx
      command = 'npx prisma generate';
    }
    
    console.log(`[v0] Executing: ${command}`);
    
    const output = execSync(command, {
      cwd: dir,
      stdio: 'inherit',
      shell: true
    });
    
    console.log('[v0] ✓ Prisma client generated successfully!');
  } catch (error) {
    console.error(`[v0] Error generating Prisma client:`);
    console.error(error.message);
    process.exit(1);
  }
}
