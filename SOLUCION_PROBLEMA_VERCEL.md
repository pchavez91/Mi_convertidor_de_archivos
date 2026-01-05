# Solución: Backend No Funciona - Configuración de Vercel

## ❌ Problema Detectado

En tu configuración de Vercel, `todoconvertir.com` está configurado para **redirigir** a `www.todoconvertir.com` en lugar de estar conectado directamente a Production.

Esto puede causar problemas con las variables de entorno y la detección del dominio.

## ✅ Solución: Corregir Configuración en Vercel

### Paso 1: Cambiar Configuración de todoconvertir.com

1. Ve a Vercel → Tu Proyecto → **Settings → Domains**
2. Haz clic en **"Edit"** en `todoconvertir.com`
3. Cambia la configuración:
   - **ANTES**: "Redirect to Another Domain" → `www.todoconvertir.com`
   - **DESPUÉS**: "Connect to an environment" → Selecciona **"Production"**
4. Haz clic en **"Save"**

### Paso 2: Verificar que www.todoconvertir.com esté en Production

1. Verifica que `www.todoconvertir.com` esté conectado a **"Production"**
2. Si no lo está, haz clic en **"Edit"** y conéctalo a Production

## Verificaciones Adicionales

### 1. Verificar Variable VITE_API_URL en Vercel

1. Ve a **Settings → Environment Variables**
2. Verifica que exista:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://api.todoconvertir.com`
   - **Environments**: Production, Preview (y Development si quieres)

3. **Si NO existe**, agrégalo:
   - Haz clic en **"+ Add New"**
   - Key: `VITE_API_URL`
   - Value: `https://api.todoconvertir.com`
   - Selecciona: Production, Preview
   - Guarda

4. **IMPORTANTE**: Después de agregar/modificar, haz un **Redeploy**

### 2. Verificar DNS

Tu configuración DNS se ve correcta:
- ✅ `@` (todoconvertir.com) → A → `216.198.79.1` (Vercel)
- ✅ `api` → CNAME → `convertidor-backend.fly.dev.` (Fly.io)
- ✅ `www` → CNAME → `70de2aaf059f3f22.vercel-dns-017.com.` (Vercel)

### 3. Verificar Backend en Fly.io

```powershell
# Verificar que el backend esté accesible
curl https://api.todoconvertir.com/

# Debe mostrar el JSON del backend
```

### 4. Verificar Certificado SSL

```powershell
fly certs show api.todoconvertir.com
```

El estado debe ser **"Issued"**.

### 5. Verificar CORS en Fly.io

```powershell
# Configurar FRONTEND_URL
fly secrets set FRONTEND_URL=https://todoconvertir.com,https://www.todoconvertir.com

# Reiniciar la app
fly apps restart convertidor-backend

# Verificar que esté configurada
fly secrets list
```

### 6. Verificar Estado de la App

```powershell
fly status
```

Debe mostrar estado **"running"** o **"started"**.

## Checklist Completo

- [ ] `todoconvertir.com` está conectado a **Production** (no redirigiendo)
- [ ] `www.todoconvertir.com` está conectado a **Production**
- [ ] `VITE_API_URL` está configurada en Vercel = `https://api.todoconvertir.com`
- [ ] Se hizo un **Redeploy** después de agregar/modificar variables
- [ ] `FRONTEND_URL` está configurada en Fly.io
- [ ] Certificado SSL de `api.todoconvertir.com` está en estado "Issued"
- [ ] La app en Fly.io está "running"
- [ ] `https://api.todoconvertir.com/` responde con JSON

## Verificación en el Navegador

### Paso 1: Abrir la Página

1. Abre `https://todoconvertir.com` en el navegador
2. Abre la consola del navegador (F12 → Console)

### Paso 2: Verificar Variable de Entorno

En la consola, ejecuta:
```javascript
console.log(import.meta.env.VITE_API_URL)
```

**Debe mostrar**: `https://api.todoconvertir.com`

Si muestra `undefined` o `http://localhost:8000`:
- La variable no está configurada o no se hizo redeploy

### Paso 3: Probar Conexión al Backend

En la consola, ejecuta:
```javascript
fetch('https://api.todoconvertir.com/')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

**Debe mostrar**: El JSON del backend sin errores

Si hay error de CORS:
- Configura `FRONTEND_URL` en Fly.io (paso 5 arriba)

## Solución de Problemas Específicos

### Error: "Cannot read property of undefined"

**Causa**: `VITE_API_URL` no está disponible

**Solución**:
1. Verifica que esté configurada en Vercel
2. Haz un redeploy
3. Limpia la caché del navegador

### Error: CORS en la consola

**Causa**: El backend no permite el origen del frontend

**Solución**:
```powershell
fly secrets set FRONTEND_URL=https://todoconvertir.com,https://www.todoconvertir.com
fly apps restart convertidor-backend
```

### Error: Network Error / Failed to fetch

**Causa**: El backend no está accesible

**Solución**:
1. Verifica que `https://api.todoconvertir.com/` funcione en el navegador
2. Verifica el certificado SSL: `fly certs show api.todoconvertir.com`
3. Verifica el estado de la app: `fly status`

### El Frontend Sigue Usando localhost

**Causa**: La variable no está configurada o no se hizo redeploy

**Solución**:
1. Verifica `VITE_API_URL` en Vercel
2. Haz un redeploy completo
3. Limpia la caché del navegador (Ctrl+Shift+Delete)
4. Prueba en modo incógnito

## Comandos de Verificación Rápida

```powershell
# 1. Verificar backend
curl https://api.todoconvertir.com/

# 2. Verificar certificado
fly certs show api.todoconvertir.com

# 3. Verificar estado
fly status

# 4. Verificar variables
fly secrets list

# 5. Ver logs
fly logs --limit 20
```

## Pasos Inmediatos a Seguir

1. ✅ **Cambiar configuración de `todoconvertir.com` en Vercel** (de redirect a Production)
2. ✅ **Verificar `VITE_API_URL` en Vercel** (Settings → Environment Variables)
3. ✅ **Hacer Redeploy** en Vercel
4. ✅ **Configurar `FRONTEND_URL` en Fly.io** (si no está configurada)
5. ✅ **Reiniciar app en Fly.io** (si hiciste cambios)
6. ✅ **Probar en el navegador** con la consola abierta

## Resumen

El problema principal es que `todoconvertir.com` está redirigiendo en lugar de estar conectado a Production. Esto puede causar que las variables de entorno no se apliquen correctamente.

**Solución inmediata**:
1. Cambia `todoconvertir.com` de "Redirect" a "Connect to Production"
2. Verifica que `VITE_API_URL` esté configurada
3. Haz un redeploy
4. Configura `FRONTEND_URL` en Fly.io si no está
