#!/usr/bin/env python3
import subprocess
import os
import sys

# Navigate to backend directory
backend_path = os.path.join(os.getcwd(), 'backend')

if not os.path.exists(backend_path):
    print("[v0] Backend directory not found")
    sys.exit(1)

print("[v0] Generating Prisma client...")

try:
    # Run prisma generate using the binary directly from node_modules
    prisma_bin = os.path.join(backend_path, 'node_modules', '.bin', 'prisma')
    
    if not os.path.exists(prisma_bin):
        print(f"[v0] Prisma binary not found at {prisma_bin}")
        print("[v0] Trying alternative approach...")
        # Try using node to run prisma
        result = subprocess.run(
            [sys.executable, '-m', 'subprocess'],
            cwd=backend_path,
            capture_output=True,
            text=True
        )
    else:
        result = subprocess.run(
            [prisma_bin, 'generate'],
            cwd=backend_path,
            capture_output=True,
            text=True
        )
    
    if result.returncode != 0:
        print(f"[v0] Error: {result.stderr}")
        sys.exit(1)
    
    print("[v0] ✓ Prisma client generated successfully!")
    print(result.stdout)
    
except Exception as e:
    print(f"[v0] Failed to generate Prisma client: {str(e)}")
    sys.exit(1)
