# Solución: ERR_CONNECTION_REFUSED

## Problema
El backend se está cerrando inmediatamente después de iniciar, causando `ERR_CONNECTION_REFUSED`.

## Diagnóstico

### 1. Verificar que el Backend Esté Corriendo

**IMPORTANTE**: El backend debe estar corriendo en una terminal **separada** y **permanecer abierta**.

1. Abre una terminal PowerShell
2. Navega al directorio backend:
   ```powershell
   cd E:\Proyecto\Mi_convertidor_de_archivos\backend
   ```
3. Inicia el backend:
   ```powershell
   py main.py
   ```
4. **NO CIERRES ESTA TERMINAL** - El backend debe seguir corriendo
5. Deberías ver:
   ```
   ============================================================
   🚀 Convertidor de Archivos - Servidor iniciado
   ============================================================
   📍 Acceso local:    http://localhost:8000
   🌐 Acceso en red:    http://192.168.100.150:8000
   📚 Documentación:    http://localhost:8000/docs
   ============================================================
   
   INFO:     Started server process [XXXX]
   INFO:     Waiting for application startup.
   INFO:     Application startup complete.
   INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
   ```

### 2. Si el Backend se Cierra Inmediatamente

Si el backend se cierra inmediatamente después de iniciar, puede ser por:

#### A. Error de Importación
```powershell
cd backend
py -c "import main"
```

Si hay un error, instala las dependencias:
```powershell
pip install -r requirements.txt
```

#### B. Error de Sintaxis
```powershell
cd backend
py -m py_compile main.py
```

#### C. Puerto Ocupado
```powershell
netstat -ano | findstr :8000
```

Si hay otro proceso, termínalo:
```powershell
taskkill /PID [PID] /F
```

### 3. Probar la Conexión

Con el backend corriendo, abre en el navegador:
```
http://localhost:8000/
```

Deberías ver un JSON. Si no aparece, el backend no está funcionando.

### 4. Verificar el Frontend

En **otra terminal** (no cierres la del backend):

1. Navega al frontend:
   ```powershell
   cd E:\Proyecto\Mi_convertidor_de_archivos\frontend
   ```
2. Inicia el frontend:
   ```powershell
   npm run dev
   ```
3. Abre el navegador en: `http://localhost:5173`
4. Abre la consola (F12)
5. Deberías ver: `🔗 API URL detectada: http://localhost:8000`

## Solución Rápida

1. **Cierra TODAS las terminales** donde hayas ejecutado el backend
2. **Abre una NUEVA terminal PowerShell**
3. Ejecuta:
   ```powershell
   cd E:\Proyecto\Mi_convertidor_de_archivos\backend
   py main.py
   ```
4. **DEJA ESTA TERMINAL ABIERTA** - No la cierres
5. En **otra terminal**, inicia el frontend:
   ```powershell
   cd E:\Proyecto\Mi_convertidor_de_archivos\frontend
   npm run dev
   ```
6. Abre el navegador en `http://localhost:5173`

## Verificación Final

Si todo está bien:
- El backend muestra: `INFO:     Uvicorn running on http://0.0.0.0:8000`
- El frontend muestra: `🔗 API URL detectada: http://localhost:8000`
- `http://localhost:8000/` muestra un JSON en el navegador
- La conversión funciona en el frontend

## Si Sigue Sin Funcionar

Comparte:
1. El mensaje completo que aparece en la terminal cuando ejecutas `py main.py`
2. Si hay algún error al iniciar
3. Lo que ves cuando abres `http://localhost:8000/` en el navegador
