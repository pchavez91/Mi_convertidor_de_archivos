#!/bin/bash
set -e

echo "🚀 Iniciando migración completa del frontend..."

cd /Users/paukoh/Mi_convertidor_de_archivos

# 1. Backup
if [ -d "frontend" ]; then
    echo "📦 Creando backup..."
    if [ -d "frontend_old_backup" ]; then
        rm -rf frontend_old_backup
    fi
    mv frontend frontend_old_backup
    echo "✅ Backup creado"
fi

# 2. Copiar nuevo frontend
echo "📋 Copiando nuevo frontend..."
SOURCE="/Users/paukoh/Downloads/an-unusual-hero"
DEST="frontend"

if [ ! -d "$SOURCE" ]; then
    echo "❌ Error: $SOURCE no existe"
    exit 1
fi

cp -r "$SOURCE" "$DEST"

# 3. Limpiar
echo "🧹 Limpiando archivos..."
cd "$DEST"
rm -rf node_modules .next .git pnpm-lock.yaml 2>/dev/null || true
rm -f vite.config.js index.html 2>/dev/null || true
rm -rf src 2>/dev/null || true

# 4. Actualizar package.json
echo "📝 Actualizando package.json..."
sed -i '' 's/"name": "my-v0-project"/"name": "convertidor-archivos-frontend"/' package.json

# 5. Verificar estructura
echo "🔍 Verificando estructura..."
if [ -d "app" ] && [ -d "components" ] && [ -d "lib" ]; then
    echo "✅ Estructura Next.js verificada"
else
    echo "❌ Error: Estructura Next.js no encontrada"
    exit 1
fi

echo ""
echo "✅ Migración completada!"
echo ""
echo "📝 Próximos pasos:"
echo "1. cd frontend"
echo "2. npm install"
echo "3. npm run dev"

