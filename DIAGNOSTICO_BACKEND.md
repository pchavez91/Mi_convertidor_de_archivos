# Diagnóstico: Backend No Funciona

## Problema
La página carga pero el backend no funciona (no se pueden convertir archivos).

## Verificaciones Paso a Paso

### 1. Verificar que el Backend esté Accesible

Abre en el navegador o ejecuta:

```powershell
# Probar el backend directamente
curl https://api.todoconvertir.com/
```

**Debería mostrar:**
```json
{"message":"Convertidor de Archivos API","status":"running",...}
```

**Si no funciona:**
- El certificado SSL puede no estar emitido
- El DNS puede no estar propagado
- La app puede estar caída

### 2. Verificar Certificado SSL en Fly.io

```powershell
fly certs show api.todoconvertir.com
```

**El estado debe ser "Issued"**. Si está en "Pending":
- Verifica que el DNS esté configurado correctamente
- Espera unos minutos más

### 3. Verificar DNS

```powershell
# Verificar que api.todoconvertir.com apunta a Fly.io
nslookup api.todoconvertir.com
```

**Debe mostrar:**
- Un registro CNAME apuntando a `convertidor-backend.fly.dev`
- O una IP de Fly.io

### 4. Verificar Estado de la App en Fly.io

```powershell
fly status
```

**Debe mostrar:**
- Estado: "running" o "started"
- Si está "stopped", iníciala: `fly apps restart convertidor-backend`

### 5. Verificar Variable de Entorno VITE_API_URL

**En Vercel:**
1. Ve a tu proyecto → Settings → Environment Variables
2. Verifica que exista: `VITE_API_URL = https://api.todoconvertir.com`
3. Si no existe, agrégalo
4. **IMPORTANTE**: Haz un nuevo deploy después de agregar/modificar

**En Netlify:**
1. Ve a Site settings → Environment variables
2. Verifica que exista: `VITE_API_URL = https://api.todoconvertir.com`
3. Si no existe, agrégalo
4. **IMPORTANTE**: Haz un nuevo deploy

### 6. Verificar CORS en el Backend

```powershell
# Configurar FRONTEND_URL en Fly.io
fly secrets set FRONTEND_URL=https://todoconvertir.com,https://www.todoconvertir.com
```

**Verificar que esté configurada:**
```powershell
fly secrets list
```

### 7. Verificar en la Consola del Navegador

1. Abre `https://todoconvertir.com` en el navegador
2. Abre la consola (F12 → Console)
3. Intenta convertir un archivo
4. Revisa los errores:

**Errores comunes:**

- **CORS Error**: El backend no permite el origen del frontend
  - Solución: Configura `FRONTEND_URL` en Fly.io (paso 6)

- **Network Error / Failed to fetch**: El backend no está accesible
  - Verifica que `api.todoconvertir.com` funcione (paso 1)
  - Verifica el certificado SSL (paso 2)

- **404 Not Found**: La URL del backend es incorrecta
  - Verifica `VITE_API_URL` en Vercel/Netlify (paso 5)

- **Timeout**: El backend tarda mucho en responder
  - Verifica el estado de la app (paso 4)
  - Revisa los logs: `fly logs`

### 8. Verificar Logs del Backend

```powershell
# Ver logs en tiempo real
fly logs

# Ver últimos logs
fly logs --limit 50
```

Busca errores relacionados con:
- CORS
- Conversión de archivos
- Conexiones rechazadas

### 9. Probar la API Directamente

Abre en el navegador:
```
https://api.todoconvertir.com/docs
```

Deberías ver la documentación interactiva de FastAPI. Si no carga, el backend no está accesible.

## Soluciones Rápidas

### Solución 1: Reconfigurar Variables de Entorno

**Frontend (Vercel/Netlify):**
```
VITE_API_URL = https://api.todoconvertir.com
```
→ Hacer nuevo deploy

**Backend (Fly.io):**
```powershell
fly secrets set FRONTEND_URL=https://todoconvertir.com,https://www.todoconvertir.com
fly apps restart convertidor-backend
```

### Solución 2: Verificar y Reiniciar la App

```powershell
# Ver estado
fly status

# Si está caída, reiniciar
fly apps restart convertidor-backend

# Verificar que esté corriendo
fly status
```

### Solución 3: Verificar Certificado SSL

```powershell
# Ver estado del certificado
fly certs show api.todoconvertir.com

# Si está en "Pending", verificar DNS
fly certs check api.todoconvertir.com
```

### Solución 4: Verificar DNS

En tu proveedor de DNS, verifica que exista:

```
Host: api
Tipo: CNAME
Valor: convertidor-backend.fly.dev.
```

## Comandos de Verificación Rápida

```powershell
# 1. Verificar backend
curl https://api.todoconvertir.com/

# 2. Verificar certificado
fly certs show api.todoconvertir.com

# 3. Verificar estado de la app
fly status

# 4. Verificar variables de entorno
fly secrets list

# 5. Ver logs
fly logs --limit 20
```

## Checklist de Verificación

- [ ] `https://api.todoconvertir.com/` responde con JSON
- [ ] Certificado SSL está en estado "Issued"
- [ ] DNS de `api.todoconvertir.com` apunta a Fly.io
- [ ] App en Fly.io está "running"
- [ ] `VITE_API_URL` está configurada en Vercel/Netlify
- [ ] `FRONTEND_URL` está configurada en Fly.io
- [ ] No hay errores de CORS en la consola del navegador
- [ ] La documentación API carga: `https://api.todoconvertir.com/docs`

## Si Nada Funciona

1. **Verifica que el backend funcione localmente:**
   ```powershell
   cd backend
   python main.py
   ```
   Abre `http://localhost:8000` y verifica que funcione.

2. **Verifica los logs detallados:**
   ```powershell
   fly logs --limit 100
   ```

3. **Revisa la configuración de CORS en el código:**
   - Verifica que `backend/main.py` tenga los dominios correctos

4. **Prueba desde otro navegador o modo incógnito:**
   - Algunos bloqueadores pueden interferir

## Información para Depuración

Comparte esta información si necesitas ayuda:

```powershell
# Estado del certificado
fly certs show api.todoconvertir.com

# Estado de la app
fly status

# Variables de entorno
fly secrets list

# Últimos logs
fly logs --limit 20
```
