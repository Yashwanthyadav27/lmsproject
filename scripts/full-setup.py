#!/usr/bin/env python3
import subprocess
import os
import sys

backend_path = '/vercel/share/v0-project/backend'

print(f"[v0] Backend path: {backend_path}")
print(f"[v0] Checking if directory exists...")

if not os.path.exists(backend_path):
    print(f"[v0] Backend directory not found at {backend_path}")
    sys.exit(1)

print(f"[v0] ✓ Backend directory found")

# Check if node_modules exists
nm_path = os.path.join(backend_path, 'node_modules')
if not os.path.exists(nm_path):
    print(f"[v0] node_modules not found, it will be installed by the system")
else:
    print(f"[v0] ✓ node_modules directory exists")

# Check if prisma binary exists
prisma_bin = os.path.join(nm_path, '.bin', 'prisma')
print(f"[v0] Checking for Prisma binary at {prisma_bin}")

if not os.path.exists(prisma_bin):
    print(f"[v0] Prisma binary not found - trying to find prisma directly")
    # Try to find prisma in common locations
    prisma_locations = [
        os.path.join(nm_path, 'prisma', 'prisma'),
        os.path.join(nm_path, 'prisma', 'build', 'index.js'),
    ]
    
    found = False
    for loc in prisma_locations:
        if os.path.exists(loc):
            prisma_bin = loc
            found = True
            print(f"[v0] Found Prisma at {loc}")
            break
    
    if not found:
        print(f"[v0] Could not find Prisma executable")
        print(f"[v0] Contents of node_modules/.bin:")
        bin_dir = os.path.join(nm_path, '.bin')
        if os.path.exists(bin_dir):
            try:
                files = os.listdir(bin_dir)
                for f in files:
                    print(f"  - {f}")
            except:
                pass
        sys.exit(1)

print(f"[v0] Using Prisma binary: {prisma_bin}")
print(f"[v0] Generating Prisma client...")

try:
    result = subprocess.run(
        ['node', prisma_bin, 'generate'],
        cwd=backend_path,
        capture_output=True,
        text=True,
        timeout=60
    )
    
    print(result.stdout)
    if result.stderr:
        print(f"[v0] stderr: {result.stderr}")
    
    if result.returncode == 0:
        print(f"[v0] ✓ Prisma client generated successfully!")
    else:
        print(f"[v0] ✗ Prisma generation failed with return code {result.returncode}")
        sys.exit(1)
        
except subprocess.TimeoutExpired:
    print(f"[v0] Prisma generation timed out")
    sys.exit(1)
except Exception as e:
    print(f"[v0] Error: {str(e)}")
    sys.exit(1)
