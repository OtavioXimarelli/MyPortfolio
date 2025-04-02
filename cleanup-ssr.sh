#!/bin/bash

# Reset angular.json
echo "Cleaning up angular.json..."
grep -v "server\|ssr" angular.json > angular.json.temp && mv angular.json.temp angular.json

# Atualizar package.json para remover tudo relacionado a SSR
echo "Cleaning up package.json..."

# Remover todos os arquivos físicos relacionados ao SSR
echo "Removing SSR-related files..."
find src -name "*.server.ts" -type f -delete
find src/app -name "*ssr*" -type f -delete
rm -f src/main.server.ts
rm -f src/app/app.routes.server.ts
rm -f src/app/app.config.server.ts

# Remove any SSR-related dependencies from node_modules
echo "Removing SSR-related dependencies from node_modules..."
rm -rf node_modules/@angular/ssr
rm -rf node_modules/@angular/platform-server
rm -rf node_modules/@angular/platform-server-init

echo "Setting up simplified server.js file..."
cat > server.js << EOL
const express = require('express');
const path = require('path');

// Create express application
const app = express();
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = path.join(__dirname, 'docs');

// Serve static files from the docs folder
app.use(express.static(DIST_FOLDER));

// All routes serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_FOLDER, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(\`Server is running on http://localhost:\${PORT}\`);
});
EOL

echo "SSR cleanup complete!"
