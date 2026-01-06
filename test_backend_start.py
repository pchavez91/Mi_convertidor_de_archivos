#!/usr/bin/env python
"""Script para probar que el backend puede iniciarse correctamente"""
import sys
import os

# Agregar el directorio backend al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

try:
    print("🔍 Verificando imports...")
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    print("✅ FastAPI importado correctamente")
    
    import uvicorn
    print("✅ Uvicorn importado correctamente")
    
    print("\n🔍 Verificando que main.py puede importarse...")
    import importlib.util
    spec = importlib.util.spec_from_file_location("main", "backend/main.py")
    if spec is None:
        print("❌ No se pudo cargar main.py")
        sys.exit(1)
    
    main_module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(main_module)
    print("✅ main.py importado correctamente")
    
    print("\n🔍 Verificando que la app FastAPI existe...")
    if hasattr(main_module, 'app'):
        print("✅ App FastAPI encontrada")
        print(f"   Título: {main_module.app.title}")
    else:
        print("❌ No se encontró la app FastAPI")
        sys.exit(1)
    
    print("\n✅ Todos los checks pasaron. El backend debería poder iniciarse.")
    print("\n💡 Para iniciar el backend, ejecuta:")
    print("   cd backend")
    print("   py main.py")
    
except ImportError as e:
    print(f"❌ Error de importación: {e}")
    print("\n💡 Asegúrate de tener todas las dependencias instaladas:")
    print("   cd backend")
    print("   pip install -r requirements.txt")
    sys.exit(1)
except Exception as e:
    print(f"❌ Error inesperado: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
