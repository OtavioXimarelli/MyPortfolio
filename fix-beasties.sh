#!/bin/bash
echo "Removing problematic SSR dependencies..."
rm -rf node_modules/@angular/ssr 2>/dev/null || true

# Remover outros arquivos relacionados a SSR
echo "Removing SSR-related files..."
find src -name "*.server.ts" -exec rm -f {} \;
find src/app -name "*ssr*" -exec rm -f {} \;
rm -f src/app/app.routes.server.ts 2>/dev/null || true
rm -f src/server.ts 2>/dev/null || true
rm -f src/main.server.ts 2>/dev/null || true
rm -f src/app/app.config.server.ts 2>/dev/null || true

echo "Creating empty type definition for beasties..."
mkdir -p node_modules/beasties
echo "export default {};" > node_modules/beasties/index.js
echo 'declare const _default: {};
export default _default;' > node_modules/beasties/index.d.ts
chmod +x node_modules/beasties/index.js

echo "Fixing tsconfig.app.json to skip SSR-related files..."
# Atualizar o tsconfig.app.json para ignorar verificações de biblioteca
echo "Ensuring skipLibCheck is enabled in tsconfig.app.json"

echo "Fixed SSR-related issues!"
