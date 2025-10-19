#!/bin/sh

set -e

if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL environment variable is required"
  exit 1
fi

echo "Starting Next.js application in production mode..."
exec bun run start
