# Guía de Despliegue en Fly.io

Esta guía te ayudará a desplegar el Convertidor de Archivos en Fly.io.

## Prerrequisitos

1. Instalar Fly CLI:
   ```bash
   # Windows (PowerShell)
   powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
   
   # macOS/Linux
   curl -L https://fly.io/install.sh | sh
   ```

2. Crear cuenta en [fly.io](https://fly.io) (gratis)

## Configuración del Backend

### Paso 1: Iniciar sesión en Fly.io

```bash
fly auth login
```

### Paso 2: Crear la aplicación

**Opción A: Usar fly.toml existente (Recomendado)**
```bash
fly launch --no-config
```

Esto usará el `fly.toml` que ya está configurado.

**Opción B: Crear desde cero**
```bash
fly launch
```

Esto te pedirá:
- Nombre de la app: `convertidor-backend` (o el que prefieras)
- Región (elige la más cercana, ej: `iad` para Virginia, `sjc` para California)
- ¿Copiar configuración de fly.toml? → Sí
- ¿Crear Postgres? → No
- ¿Crear Redis? → No

### Paso 3: Configurar variables de entorno (opcional)

Si tu frontend estará en otro dominio, configura la URL:

```bash
fly secrets set FRONTEND_URL=https://tu-frontend.com
```

### Paso 4: Desplegar

```bash
fly deploy
```

Esto construirá la imagen Docker, instalará FFmpeg y todas las dependencias, y desplegará tu aplicación.

### Paso 5: Verificar el despliegue

```bash
fly status
fly logs
```

Tu backend estará disponible en: `https://[tu-app].fly.dev`

## Configuración del Frontend

### Opción 1: Vercel (Recomendado para React)

1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Configura el proyecto:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**:
     - `VITE_API_URL`: `https://[tu-backend].fly.dev`

4. Deploy automático

### Opción 2: Netlify

1. Ve a [netlify.com](https://netlify.com)
2. Conecta tu repositorio
3. Configura:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
   - **Environment Variables**:
     - `VITE_API_URL`: `https://[tu-backend].fly.dev`

### Opción 3: Fly.io (Static Site)

También puedes desplegar el frontend en Fly.io como sitio estático.

## Comandos Útiles de Fly.io

```bash
# Ver logs en tiempo real
fly logs

# Ver estado de la app
fly status

# Abrir la app en el navegador
fly open

# Ver información de la app
fly info

# Escalar la app
fly scale count 1

# Ver métricas
fly metrics
```

## Solución de Problemas

### Error: FFmpeg no encontrado
- Verifica que el Dockerfile incluya la instalación de FFmpeg
- Revisa los logs: `fly logs`

### Error: Puerto no disponible
- Fly.io usa la variable `PORT` automáticamente
- El código ya está configurado para usar `PORT` o 8000 por defecto

### Frontend no se conecta al backend
- Verifica que `VITE_API_URL` esté configurada correctamente
- Verifica la configuración de CORS en el backend
- Asegúrate de que el backend esté funcionando: `fly status`

## Costos

El plan gratuito de Fly.io incluye:
- 3 VMs compartidas
- 160GB de transferencia de salida/mes
- Sin sleep automático

Para la mayoría de proyectos pequeños, esto es suficiente.

## Próximos Pasos

1. Despliega el backend en Fly.io
2. Despliega el frontend en Vercel/Netlify
3. Configura `VITE_API_URL` en el frontend con la URL de tu backend
4. ¡Listo! Tu aplicación estará en producción
