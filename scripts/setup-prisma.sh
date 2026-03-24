#!/bin/bash

echo "Generating Prisma client..."
cd backend
npx prisma generate
echo "Prisma client generated successfully!"
