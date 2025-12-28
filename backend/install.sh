#!/bin/bash
echo "Actualizando pip..."
python3 -m pip install --upgrade pip

echo ""
echo "Instalando dependencias del backend..."
pip3 install -r requirements.txt

echo ""
echo "Instalación completada!"

