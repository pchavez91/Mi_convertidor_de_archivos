# Configurar VITE_API_URL en Vercel

## Cómo Verificar si VITE_API_URL está Configurada

### Paso 1: Acceder a tu Proyecto en Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. En el dashboard, busca y haz clic en tu proyecto (probablemente `Mi_convertidor_de_archivos` o similar)

### Paso 2: Ir a Settings → Environment Variables

1. En la página de tu proyecto, haz clic en **"Settings"** (Configuración) en el menú superior
2. En el menú lateral izquierdo, haz clic en **"Environment Variables"** (Variables de Entorno)

### Paso 3: Verificar si Existe VITE_API_URL

En la lista de variables de entorno, busca:
- **Name**: `VITE_API_URL`
- **Value**: `https://api.todoconvertir.com`

**Si NO existe**, necesitas agregarla.

## Cómo Agregar VITE_API_URL

### Paso 1: Agregar la Variable

1. En la página de **Environment Variables**, haz clic en el botón **"+ Add New"** o **"Add"**
2. Completa el formulario:
   - **Key** (Clave): `VITE_API_URL`
   - **Value** (Valor): `https://api.todoconvertir.com`
   - **Environment** (Entorno): Selecciona todos los entornos:
     - ✅ Production
     - ✅ Preview
     - ✅ Development (opcional, pero recomendado)
3. Haz clic en **"Save"** (Guardar)

### Paso 2: Hacer un Nuevo Deploy

**⚠️ IMPORTANTE**: Después de agregar o modificar variables de entorno, DEBES hacer un nuevo deploy para que los cambios surtan efecto.

**Opción A: Deploy Automático (si tienes GitHub conectado)**
1. Haz un commit y push a tu repositorio
2. Vercel detectará los cambios y hará un deploy automático

**Opción B: Deploy Manual**
1. En la página de tu proyecto, ve a la pestaña **"Deployments"**
2. Haz clic en el menú de tres puntos (⋯) del último deployment
3. Selecciona **"Redeploy"**
4. Confirma el redeploy

**Opción C: Desde el Dashboard**
1. En la página de tu proyecto, haz clic en **"Deployments"**
2. Haz clic en **"Redeploy"** en el último deployment

## Verificación Después del Deploy

### Paso 1: Verificar que la Variable Esté en el Deploy

1. Ve a **Deployments**
2. Haz clic en el último deployment
3. En los logs del build, busca referencias a `VITE_API_URL`
4. O verifica en **Settings → Environment Variables** que la variable esté guardada

### Paso 2: Probar en el Navegador

1. Abre `https://todoconvertir.com` en el navegador
2. Abre la consola del navegador (F12 → Console)
3. Intenta convertir un archivo
4. Verifica que no haya errores de conexión

### Paso 3: Verificar en el Código (Opcional)

Puedes verificar que la variable se esté usando correctamente:

1. En la consola del navegador, ejecuta:
   ```javascript
   console.log(import.meta.env.VITE_API_URL)
   ```
2. Debería mostrar: `https://api.todoconvertir.com`

## Solución de Problemas

### La Variable No Aparece Después del Deploy

1. **Verifica que hayas hecho un nuevo deploy** después de agregar la variable
2. **Verifica que la variable esté en el entorno correcto** (Production, Preview, Development)
3. **Verifica que el nombre sea exactamente** `VITE_API_URL` (case-sensitive)

### El Frontend Sigue Usando localhost

1. **Limpia la caché del navegador** (Ctrl+Shift+Delete)
2. **Abre en modo incógnito** para evitar caché
3. **Verifica que el deploy se haya completado** correctamente

### Error: "Cannot read property of undefined"

Esto puede significar que la variable no está disponible. Verifica:
1. Que la variable esté configurada en Vercel
2. Que hayas hecho un nuevo deploy
3. Que el nombre sea exactamente `VITE_API_URL` (las variables de Vite deben empezar con `VITE_`)

## Configuración Completa Recomendada

Para asegurar que todo funcione correctamente, configura estas variables:

```
VITE_API_URL = https://api.todoconvertir.com
```

**Entornos**: Production, Preview, Development

## Notas Importantes

1. **Las variables de Vite deben empezar con `VITE_`** para estar disponibles en el frontend
2. **Los cambios en variables de entorno requieren un nuevo deploy** para surtir efecto
3. **Las variables se inyectan en tiempo de build**, no en tiempo de ejecución
4. **Para desarrollo local**, puedes crear un archivo `.env.local` en `frontend/`:
   ```
   VITE_API_URL=http://localhost:8000
   ```

## Verificación Rápida

```bash
# Desde la consola del navegador en https://todoconvertir.com
console.log(import.meta.env.VITE_API_URL)
// Debe mostrar: https://api.todoconvertir.com
```

## Resumen de Pasos

1. ✅ Ve a Vercel → Tu Proyecto → Settings → Environment Variables
2. ✅ Verifica si existe `VITE_API_URL`
3. ✅ Si no existe, agrega: `VITE_API_URL = https://api.todoconvertir.com`
4. ✅ Selecciona todos los entornos (Production, Preview, Development)
5. ✅ Guarda
6. ✅ Haz un nuevo deploy (Redeploy)
7. ✅ Verifica que funcione en `https://todoconvertir.com`
