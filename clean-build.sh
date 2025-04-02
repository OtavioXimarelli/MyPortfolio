#!/bin/bash

echo "Starting clean build process..."

# Execute the SSR cleanup first
chmod +x ./cleanup-ssr.sh
./cleanup-ssr.sh

# Clean the Angular cache
echo "Cleaning Angular cache..."
rm -rf .angular/cache

# Clean node modules and reinstall
echo "Removing node_modules..."
rm -rf node_modules
echo "Reinstalling dependencies..."
yarn install

# Run fix-beasties script
chmod +x ./fix-beasties.sh
./fix-beasties.sh

# Run production build
echo "Building production version..."
yarn build:prod

echo "Clean build process completed!"
