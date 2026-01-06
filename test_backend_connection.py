#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Script para probar la conexion al backend"""
import requests
import sys

try:
    print("Probando conexion a http://localhost:8000/...")
    response = requests.get("http://localhost:8000/", timeout=5)
    print(f"OK - Status Code: {response.status_code}")
    print(f"OK - Respuesta: {response.json()}")
    sys.exit(0)
except requests.exceptions.ConnectionError as e:
    print(f"ERROR de conexion: {e}")
    print("\nEl backend no esta respondiendo. Verifica:")
    print("   1. Que el backend este corriendo: py main.py")
    print("   2. Que no haya un firewall bloqueando")
    print("   3. Que el puerto 8000 no este ocupado por otro proceso")
    sys.exit(1)
except Exception as e:
    print(f"ERROR: {e}")
    sys.exit(1)
