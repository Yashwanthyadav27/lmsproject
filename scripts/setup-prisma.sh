#!/bin/bash

# Setup Prisma for the LMS project
cd /vercel/share/v0-project/backend

echo "Installing dependencies..."
npm install

echo "Generating Prisma client..."
npx prisma generate

echo "Running migrations..."
npx prisma migrate deploy

echo "Prisma setup complete!"
