# Solución: Error "blocked:mixed-content"

## ❌ Problema

El error **"blocked:mixed-content"** significa que:
- El frontend está en **HTTPS** (`https://todoconvertir.com`)
- Pero está intentando conectarse al backend usando **HTTP** (`http://...`)
- Los navegadores bloquean peticiones HTTP desde páginas HTTPS por seguridad

## ✅ Solución Aplicada

He corregido el código para que:

1. **Siempre use HTTPS en producción** cuando el frontend está en HTTPS
2. **Detecte automáticamente** `api.todoconvertir.com` cuando está en `todoconvertir.com`
3. **Use HTTP solo en desarrollo local** (localhost)

## Cambios Realizados

### 1. Frontend (`frontend/src/App.jsx`)

- ✅ Mejorada la detección automática para usar HTTPS en producción
- ✅ Eliminado el fallback a HTTP cuando está en HTTPS
- ✅ Detección mejorada del protocolo actual

### 2. Footer (`frontend/src/components/Footer.jsx`)

- ✅ Corregido el enlace a la documentación para usar HTTPS en producción

## Verificaciones Necesarias

### 1. Verificar VITE_API_URL en Vercel

**IMPORTANTE**: Aunque el código ahora detecta automáticamente, es mejor configurar la variable explícitamente.

1. Ve a **Vercel → Tu Proyecto → Settings → Environment Variables**
2. Verifica que exista:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://api.todoconvertir.com`
   - **Environments**: Production, Preview
3. Si no existe, agrégalo
4. **Haz un Redeploy** después de agregar/modificar

### 2. Verificar que el Backend Use HTTPS

```powershell
# Verificar que el backend responda en HTTPS
curl https://api.todoconvertir.com/

# Debe mostrar el JSON sin errores
```

### 3. Verificar Certificado SSL

```powershell
fly certs show api.todoconvertir.com
```

El estado debe ser **"Issued"**.

### 4. Verificar CORS

```powershell
# Configurar FRONTEND_URL si no está configurada
fly secrets set FRONTEND_URL=https://todoconvertir.com,https://www.todoconvertir.com

# Reiniciar la app
fly apps restart convertidor-backend
```

## Próximos Pasos

### 1. Hacer Deploy del Frontend Corregido

**Opción A: Si tienes GitHub conectado**
```bash
git add .
git commit -m "Fix: Usar HTTPS en producción para evitar mixed-content"
git push
```
Vercel hará deploy automático.

**Opción B: Redeploy Manual**
1. Ve a Vercel → Tu Proyecto → Deployments
2. Haz clic en "Redeploy" en el último deployment

### 2. Verificar en el Navegador

Después del deploy:

1. Abre `https://todoconvertir.com`
2. Abre la consola (F12 → Console)
3. Verifica que no haya errores de "mixed-content"
4. Intenta convertir un archivo
5. En la pestaña Network, verifica que las peticiones sean a `https://api.todoconvertir.com`

### 3. Verificar la URL del API

En la consola del navegador, ejecuta:
```javascript
// Esto debería mostrar la URL correcta
console.log(import.meta.env.VITE_API_URL || 'https://api.todoconvertir.com')
```

## Verificación Final

Después de hacer el deploy:

- ✅ No debe haber errores de "mixed-content" en la consola
- ✅ Las peticiones en Network deben ser a `https://api.todoconvertir.com`
- ✅ Las conversiones deben funcionar correctamente
- ✅ No debe haber errores de CORS

## Si Aún Hay Problemas

### Verificar que VITE_API_URL esté Configurada

Aunque el código ahora detecta automáticamente, es mejor tenerla configurada:

1. Ve a Vercel → Settings → Environment Variables
2. Agrega: `VITE_API_URL = https://api.todoconvertir.com`
3. Haz un Redeploy

### Verificar CORS

Si hay errores de CORS:

```powershell
fly secrets set FRONTEND_URL=https://todoconvertir.com,https://www.todoconvertir.com
fly apps restart convertidor-backend
```

### Limpiar Caché del Navegador

1. Presiona `Ctrl+Shift+Delete`
2. Selecciona "Cached images and files"
3. Limpia la caché
4. Recarga la página (Ctrl+F5)

## Resumen

✅ **Código corregido**: Ahora siempre usa HTTPS en producción
✅ **Detección mejorada**: Detecta automáticamente `api.todoconvertir.com`
✅ **Fallback seguro**: Solo usa HTTP en desarrollo local

**Acción requerida**: 
1. Haz un nuevo deploy del frontend
2. Verifica que `VITE_API_URL` esté configurada en Vercel (recomendado)
3. Prueba en el navegador
