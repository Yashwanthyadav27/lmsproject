#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const backendPath = '/vercel/share/v0-next-shadcn/backend';

console.log('[v0] Fixing Prisma client generation...');
console.log('[v0] Backend path:', backendPath);

// Check if backend exists
if (!fs.existsSync(backendPath)) {
  console.log('[v0] ERROR: Backend path does not exist at', backendPath);
  process.exit(1);
}

// Check if prisma schema exists
const schemaPath = path.join(backendPath, 'prisma', 'schema.prisma');
if (!fs.existsSync(schemaPath)) {
  console.log('[v0] ERROR: Prisma schema not found at', schemaPath);
  process.exit(1);
}

console.log('[v0] Found Prisma schema at:', schemaPath);

// Check if .prisma/client exists
const clientPath = path.join(backendPath, 'node_modules', '.prisma', 'client');
if (fs.existsSync(clientPath)) {
  console.log('[v0] .prisma/client already exists, cleaning up...');
  try {
    execSync(`rm -rf "${clientPath}"`, { stdio: 'inherit' });
  } catch (e) {
    console.log('[v0] Could not remove old client, continuing...');
  }
}

// Try to find prisma binary
const prismaBinary = path.join(backendPath, 'node_modules', '.bin', 'prisma');
console.log('[v0] Looking for prisma binary at:', prismaBinary);

if (!fs.existsSync(prismaBinary)) {
  console.log('[v0] Prisma binary not found, trying alternative paths...');
  // Try using npx
  try {
    console.log('[v0] Running: cd ' + backendPath + ' && npx prisma generate');
    execSync('npx prisma generate', {
      cwd: backendPath,
      stdio: 'inherit'
    });
    console.log('[v0] ✓ Prisma client generated successfully!');
  } catch (error) {
    console.error('[v0] ERROR:', error.message);
    process.exit(1);
  }
} else {
  console.log('[v0] Found prisma binary, running generate...');
  try {
    execSync(prismaBinary + ' generate', {
      cwd: backendPath,
      stdio: 'inherit'
    });
    console.log('[v0] ✓ Prisma client generated successfully!');
  } catch (error) {
    console.error('[v0] ERROR:', error.message);
    process.exit(1);
  }
}
