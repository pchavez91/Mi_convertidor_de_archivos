# Deploy del Frontend Corregido

## Problema Actual

El error "blocked:mixed-content" persiste porque:
- ✅ El código está corregido localmente
- ❌ El frontend desplegado en Vercel todavía tiene la versión antigua
- ❌ Necesitas hacer un nuevo deploy

## Solución: Hacer Deploy del Código Corregido

### Opción 1: Deploy Automático (GitHub)

Si tu repositorio está conectado a GitHub:

```bash
# Desde la raíz del proyecto
git add .
git commit -m "Fix: Usar HTTPS en producción para evitar mixed-content"
git push
```

Vercel detectará los cambios y hará deploy automático.

### Opción 2: Deploy Manual en Vercel

1. Ve a **Vercel → Tu Proyecto → Deployments**
2. Haz clic en el menú de tres puntos (⋯) del último deployment
3. Selecciona **"Redeploy"**
4. Confirma el redeploy

**Nota**: Esto redeployará el código actual del repositorio. Si no has hecho commit de los cambios, primero haz commit y push.

### Opción 3: Verificar y Forzar Deploy

1. Ve a **Vercel → Tu Proyecto**
2. Ve a **Settings → Git**
3. Verifica que el repositorio esté conectado
4. Si hay cambios sin commit, haz commit y push primero
5. Vercel hará deploy automático

## Verificaciones Antes del Deploy

### 1. Verificar que el Código Esté Corregido

Abre `frontend/src/App.jsx` y verifica que la función `getApiUrl()` use HTTPS:

```javascript
// Debe tener esta lógica:
if (hostname === 'todoconvertir.com' || hostname === 'www.todoconvertir.com') {
  return 'https://api.todoconvertir.com'  // ← HTTPS, no HTTP
}
```

### 2. Verificar VITE_API_URL en Vercel

1. Ve a **Settings → Environment Variables**
2. Verifica que exista:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://api.todoconvertir.com` (con HTTPS)
   - **Environments**: Production, Preview

### 3. Verificar que los Cambios Estén en Git

```bash
# Verificar cambios
git status

# Si hay cambios sin commit:
git add .
git commit -m "Fix: Usar HTTPS en producción"
git push
```

## Después del Deploy

### 1. Esperar a que Complete

- El deploy puede tardar 1-3 minutos
- Verifica en Vercel que el deploy esté completo y exitoso

### 2. Limpiar Caché del Navegador

**IMPORTANTE**: El navegador puede tener la versión antigua en caché.

1. Presiona `Ctrl+Shift+Delete`
2. Selecciona "Cached images and files"
3. Selecciona "All time"
4. Haz clic en "Clear data"
5. Cierra y vuelve a abrir el navegador

O usa modo incógnito:
- Presiona `Ctrl+Shift+N` (Chrome) o `Ctrl+Shift+P` (Firefox)
- Abre `https://todoconvertir.com`

### 3. Verificar en el Navegador

1. Abre `https://todoconvertir.com`
2. Abre la consola (F12 → Console)
3. Verifica que NO haya errores de "mixed-content"
4. Ve a la pestaña **Network**
5. Intenta convertir un archivo
6. Verifica que las peticiones sean a `https://api.todoconvertir.com` (con HTTPS)

### 4. Verificar la URL del API

En la consola del navegador:
```javascript
// Debe mostrar https://api.todoconvertir.com
console.log(import.meta.env.VITE_API_URL || 'https://api.todoconvertir.com')
```

## Si el Error Persiste Después del Deploy

### Verificar que el Deploy Incluya los Cambios

1. Ve a **Vercel → Deployments**
2. Haz clic en el último deployment
3. Ve a la pestaña **Build Logs**
4. Verifica que el build sea exitoso
5. Verifica la fecha/hora del deploy (debe ser reciente)

### Verificar VITE_API_URL en el Build

En los logs del build, busca referencias a `VITE_API_URL`. Debe estar presente.

### Forzar Rebuild Completo

1. Ve a **Settings → General**
2. Busca "Clear Build Cache" o similar
3. Limpia la caché
4. Haz un nuevo deploy

### Verificar en el Código Desplegado

1. Abre `https://todoconvertir.com`
2. Abre la consola (F12)
3. Ve a **Sources** o **Network**
4. Busca el archivo `index-*.js`
5. Busca la función `getApiUrl` o `API_URL`
6. Verifica que use `https://api.todoconvertir.com`

## Comandos Útiles

```bash
# Verificar cambios en git
git status

# Verificar que los cambios estén commiteados
git log --oneline -5

# Verificar que estén en el remoto
git log origin/main --oneline -5
```

## Resumen de Pasos

1. ✅ **Verificar que el código esté corregido** (debe usar HTTPS)
2. ✅ **Hacer commit y push** de los cambios
3. ✅ **Esperar deploy automático** en Vercel (o hacer redeploy manual)
4. ✅ **Limpiar caché del navegador** (muy importante)
5. ✅ **Verificar en el navegador** que funcione

## Nota sobre el Error de Reinicio

El error al reiniciar la máquina `2873971b4d7dd8` no es crítico. Es un problema temporal de conexión. La máquina `0805456c362468` se reinició correctamente y ambas están en estado "started", así que el backend está funcionando.

Si quieres reiniciar la otra máquina:
```powershell
fly machines restart 2873971b4d7dd8
```

Pero no es necesario, ambas máquinas están funcionando.
