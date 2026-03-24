import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The backend directory where Prisma needs to generate the client
const backendDir = '/vercel/share/v0-next-shadcn/backend';

console.log('[v0] Starting Prisma client generation...');
console.log('[v0] Backend directory:', backendDir);

try {
  // Check if Prisma CLI exists
  const prismaCliPath = path.join(backendDir, 'node_modules', '.pnpm', 'prisma@5.22.0', 'node_modules', 'prisma', 'build', 'index.js');
  
  // Alternative path for pnpm structure
  const prismaCliPath2 = path.join(backendDir, 'node_modules', '.bin', 'prisma');
  
  console.log('[v0] Checking for Prisma CLI...');
  console.log('[v0] Path 1:', prismaCliPath, 'exists:', fs.existsSync(prismaCliPath));
  console.log('[v0] Path 2:', prismaCliPath2, 'exists:', fs.existsSync(prismaCliPath2));
  
  // Try to dynamically import the Prisma CLI
  const prismaPath = path.join(backendDir, 'node_modules', 'prisma');
  if (fs.existsSync(prismaPath)) {
    console.log('[v0] Found Prisma at:', prismaPath);
    
    // Change directory to backend and try to run prisma generate
    process.chdir(backendDir);
    console.log('[v0] Changed to backend directory');
    
    // Import the prisma CLI
    const prismaCLI = await import(path.join(prismaPath, 'build', 'index.js'));
    console.log('[v0] Imported Prisma CLI');
    
    // Run generate command
    process.argv = ['node', 'prisma', 'generate'];
    console.log('[v0] Running: prisma generate');
    
    if (prismaCLI.default) {
      await prismaCLI.default();
    } else if (prismaCLI.run) {
      await prismaCLI.run();
    }
    
    console.log('[v0] ✓ Prisma client generated successfully!');
  } else {
    console.log('[v0] Prisma not found in node_modules');
    console.log('[v0] Contents of node_modules:', fs.readdirSync(path.join(backendDir, 'node_modules')).slice(0, 10));
  }
} catch (error) {
  console.log('[v0] Error:', error.message);
  console.log('[v0] Stack:', error.stack);
}
