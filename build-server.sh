#!/bin/bash
echo "Building only server file..."
npx tsc -p tsconfig.server.json
echo "Server build complete!"
