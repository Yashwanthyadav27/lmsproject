#!/usr/bin/env python3
import subprocess
import os
import sys

# Try multiple paths to find the backend
backend_path = None
search_dirs = [
    '/vercel/share/v0-next-shadcn/backend',
    '/vercel/share/v0-project/backend',
    'backend',
    '../backend',
    '../../backend',
]

print(f"[v0] Searching for backend directory...")

for search_dir in search_dirs:
    abs_path = os.path.abspath(search_dir)
    print(f"[v0] Checking: {abs_path}")
    if os.path.exists(abs_path) and os.path.isdir(abs_path):
        backend_path = abs_path
        print(f"[v0] Found backend!")
        break

if not backend_path:
    print(f"[v0] Backend directory not found")
    sys.exit(1)

print(f"[v0] Found backend at: {backend_path}")
print("[v0] Generating Prisma client...")

try:
    # Run prisma generate using the binary directly from node_modules
    prisma_bin = os.path.join(backend_path, 'node_modules', '.bin', 'prisma')
    
    if not os.path.exists(prisma_bin):
        print(f"[v0] Prisma binary not found at {prisma_bin}")
        sys.exit(1)
    
    result = subprocess.run(
        [prisma_bin, 'generate'],
        cwd=backend_path,
        capture_output=True,
        text=True
    )
    
    print(result.stdout)
    if result.stderr:
        print(f"[v0] stderr: {result.stderr}")
    
    if result.returncode != 0:
        print(f"[v0] Error: return code {result.returncode}")
        sys.exit(1)
    
    print("[v0] ✓ Prisma client generated successfully!")
    
except Exception as e:
    print(f"[v0] Failed to generate Prisma client: {str(e)}")
    sys.exit(1)
