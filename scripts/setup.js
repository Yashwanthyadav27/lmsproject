#!/usr/bin/env node

const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

// The actual backend path from the debug logs
const backendPaths = [
  '/vercel/share/v0-next-shadcn/backend',
  path.join(__dirname, '../backend'),
  path.join(process.cwd(), 'backend'),
];

let backendPath = null;

console.log('[v0] Looking for backend directory...');

for (const testPath of backendPaths) {
  console.log(`[v0] Checking: ${testPath}`);
  try {
    if (fs.existsSync(testPath) && fs.statSync(testPath).isDirectory()) {
      backendPath = testPath;
      console.log(`[v0] Found backend at: ${backendPath}`);
      break;
    }
  } catch (e) {
    // Continue to next path
  }
}

if (!backendPath) {
  console.error('[v0] ERROR: Backend directory not found');
  process.exit(1);
}

// Change to backend directory
process.chdir(backendPath);
console.log(`[v0] Changed directory to: ${backendPath}`);

// Check if prisma is installed
const prismaPath = path.join(backendPath, 'node_modules', 'prisma');
if (!fs.existsSync(prismaPath)) {
  console.error('[v0] ERROR: Prisma not installed in node_modules');
  process.exit(1);
}

console.log('[v0] Generating Prisma client...');

try {
  // Execute prisma generate
  const output = execSync('npm exec prisma generate', {
    stdio: 'inherit',
    cwd: backendPath,
  });
  
  console.log('[v0] ✓ Prisma client generated successfully!');
  process.exit(0);
} catch (error) {
  console.error('[v0] ERROR: Failed to generate Prisma client');
  console.error(error.message);
  process.exit(1);
}
