const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// The backend directory
const backendPath = '/vercel/share/v0-next-shadcn/backend';

console.log('[v0] Backend path:', backendPath);
console.log('[v0] Checking if backend exists...');

if (!fs.existsSync(backendPath)) {
  console.error('[v0] Backend not found at', backendPath);
  process.exit(1);
}

console.log('[v0] Backend found!');
console.log('[v0] Running prisma generate...');

try {
  // Check for prisma binary
  const prismaPath = path.join(backendPath, 'node_modules/.bin/prisma');
  
  if (!fs.existsSync(prismaPath)) {
    console.log('[v0] Prisma binary not found, checking for pnpm location...');
    
    // Try using pnpm's prisma
    const result = execSync('cd ' + backendPath + ' && npx prisma generate', {
      stdio: 'inherit',
      shell: true
    });
    
    console.log('[v0] Prisma client generated successfully!');
  } else {
    const result = execSync(prismaPath + ' generate', {
      cwd: backendPath,
      stdio: 'inherit'
    });
    
    console.log('[v0] Prisma client generated successfully!');
  }
} catch (error) {
  console.error('[v0] Error generating Prisma client:', error.message);
  process.exit(1);
}
