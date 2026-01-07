#!/bin/bash

# Script para migrar el frontend de Vite a Next.js
# Ejecutar desde el directorio raíz del proyecto

echo "🚀 Iniciando migración del frontend..."

# Backup del frontend actual
if [ -d "frontend" ]; then
    echo "📦 Creando backup del frontend actual..."
    if [ -d "frontend_old_backup" ]; then
        rm -rf frontend_old_backup
    fi
    mv frontend frontend_old_backup
    echo "✅ Backup creado en frontend_old_backup"
fi

# Copiar el nuevo frontend
SOURCE_DIR="/Users/paukoh/Downloads/an-unusual-hero"
DEST_DIR="frontend"

if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Error: No se encontró el directorio fuente: $SOURCE_DIR"
    exit 1
fi

echo "📋 Copiando archivos del nuevo frontend..."
cp -r "$SOURCE_DIR" "$DEST_DIR"

# Limpiar archivos innecesarios
echo "🧹 Limpiando archivos innecesarios..."
cd "$DEST_DIR"
rm -rf node_modules .next .git pnpm-lock.yaml

echo "✅ Migración completada!"
echo ""
echo "📝 Próximos pasos:"
echo "1. cd frontend"
echo "2. npm install"
echo "3. npm run dev"
echo ""
echo "El backend se mantiene intacto en el directorio backend/"

