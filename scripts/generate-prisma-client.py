#!/usr/bin/env python3
import subprocess
import os
import sys

# The backend is at /vercel/share/v0-next-shadcn/backend
backend_path = '/vercel/share/v0-next-shadcn/backend'

print(f"[v0] Backend path: {backend_path}")
print(f"[v0] Checking if directory exists...")

if not os.path.exists(backend_path):
    print(f"[v0] ERROR: Backend directory not found at {backend_path}")
    sys.exit(1)

print(f"[v0] Backend directory found!")

# Check for node_modules
node_modules = os.path.join(backend_path, 'node_modules')
if not os.path.exists(node_modules):
    print(f"[v0] ERROR: node_modules not found. Dependencies not installed.")
    print(f"[v0] This usually means npm install hasn't been run yet.")
    sys.exit(1)

print(f"[v0] node_modules found!")

# Check for prisma binary
prisma_bin = os.path.join(node_modules, '.bin', 'prisma')
if not os.path.exists(prisma_bin):
    # Try pnpm structure
    prisma_bin = os.path.join(node_modules, '.pnpm', '@prisma+client@5.22.0_prisma@5.22.0', 'node_modules', '@prisma', 'client', 'default.js')
    if os.path.exists(prisma_bin):
        print(f"[v0] Found Prisma in pnpm structure")
    else:
        print(f"[v0] ERROR: Prisma binary not found")
        sys.exit(1)

print(f"[v0] Generating Prisma client...")

try:
    # Use npx to run prisma generate - first check if npx exists
    result = subprocess.run(
        ['which', 'npx'],
        capture_output=True,
        text=True
    )
    
    if result.returncode == 0:
        # npx exists, use it
        result = subprocess.run(
            ['npx', 'prisma', 'generate'],
            cwd=backend_path,
            capture_output=True,
            text=True
        )
    else:
        # Try using node directly with the prisma package
        prisma_cli = os.path.join(backend_path, 'node_modules', 'prisma', 'build', 'index.js')
        if os.path.exists(prisma_cli):
            result = subprocess.run(
                ['node', prisma_cli, 'generate'],
                cwd=backend_path,
                capture_output=True,
                text=True
            )
        else:
            print(f"[v0] ERROR: Could not find prisma CLI")
            sys.exit(1)
    
    print(result.stdout)
    if result.stderr:
        print(f"[v0] stderr: {result.stderr}")
    
    if result.returncode != 0:
        print(f"[v0] ERROR: Prisma generation failed with return code {result.returncode}")
        sys.exit(1)
    
    print("[v0] ✓ Prisma client generated successfully!")
    
except Exception as e:
    print(f"[v0] ERROR: {str(e)}")
    sys.exit(1)
