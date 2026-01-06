# Instrucciones para Debug del Backend

## Problema Actual
El backend no está respondiendo a las peticiones del frontend, mostrando `ERR_BLOCKED_BY_CLIENT` o errores de conexión.

## Pasos para Diagnosticar

### 1. Verificar que el Backend esté Corriendo

Abre una terminal PowerShell y ejecuta:

```powershell
cd E:\Proyecto\Mi_convertidor_de_archivos\backend
py main.py
```

**Deberías ver:**
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

**Si NO ves esto, hay un error al iniciar. Revisa:**
- ¿Hay errores en la consola?
- ¿Están instaladas todas las dependencias? (`pip install -r requirements.txt`)

### 2. Probar la Conexión Directamente

Con el backend corriendo, abre tu navegador y ve a:

**http://localhost:8000/**

**Deberías ver un JSON:**
```json
{
  "message": "Convertidor de Archivos API",
  "status": "running",
  "local_ip": "192.168.100.150",
  "access_url": "http://192.168.100.150:8000"
}
```

**Si NO ves esto:**
- El backend no está corriendo correctamente
- Hay un firewall bloqueando
- El puerto 8000 está ocupado por otro proceso

### 3. Verificar el Puerto

En otra terminal PowerShell, ejecuta:

```powershell
netstat -ano | findstr :8000
```

**Deberías ver algo como:**
```
TCP    0.0.0.0:8000           0.0.0.0:0              LISTENING       3292
```

Si no ves nada, el backend NO está corriendo.

### 4. Verificar Dependencias

```powershell
cd E:\Proyecto\Mi_convertidor_de_archivos\backend
pip list | findstr fastapi
pip list | findstr uvicorn
```

Si no aparecen, instálalas:
```powershell
pip install -r requirements.txt
```

### 5. Probar el Frontend

Con el backend corriendo:

1. Abre otra terminal
2. Ve al directorio frontend: `cd E:\Proyecto\Mi_convertidor_de_archivos\frontend`
3. Inicia el frontend: `npm run dev`
4. Abre el navegador en: `http://localhost:5173`
5. Abre la consola del navegador (F12)
6. Deberías ver: `🔗 API URL detectada: http://localhost:8000`

### 6. Solucionar ERR_BLOCKED_BY_CLIENT

Si ves `ERR_BLOCKED_BY_CLIENT`:

1. **Desactiva extensiones del navegador** (uBlock, AdBlock, etc.)
2. **Prueba en modo incógnito** (Ctrl+Shift+N)
3. **Agrega a la lista blanca**: `localhost:8000`
4. **Verifica el firewall de Windows**

### 7. Verificar CORS

El backend está configurado para permitir todas las conexiones en desarrollo:
```python
allow_origins=["*"]
```

Si aún así hay problemas, verifica que el backend esté usando esta configuración.

## Errores Comunes

### Error: "No se puede establecer una conexión"
- **Causa**: El backend no está corriendo
- **Solución**: Inicia el backend con `py main.py`

### Error: "ERR_BLOCKED_BY_CLIENT"
- **Causa**: Extensión del navegador bloqueando
- **Solución**: Desactiva bloqueadores o usa modo incógnito

### Error: "Port 8000 already in use"
- **Causa**: Otro proceso usando el puerto
- **Solución**: 
  ```powershell
  netstat -ano | findstr :8000
  # Encuentra el PID y termínalo:
  taskkill /PID [PID] /F
  ```

### Error al importar módulos
- **Causa**: Dependencias no instaladas
- **Solución**: 
  ```powershell
  cd backend
  pip install -r requirements.txt
  ```

## Comandos Útiles

```powershell
# Verificar que Python funciona
py --version

# Verificar que el backend puede importarse
cd backend
py -c "import main; print('OK')"

# Ver procesos en el puerto 8000
netstat -ano | findstr :8000

# Matar proceso en puerto 8000 (reemplaza PID)
taskkill /PID [PID] /F

# Instalar dependencias
cd backend
pip install -r requirements.txt
```
