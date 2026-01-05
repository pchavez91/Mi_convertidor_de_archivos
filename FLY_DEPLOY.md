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

Ejecuta:
```bash
fly launch --copy-config
```

O simplemente:
```bash
fly launch
```

Esto te pedirá:
- **Nombre de la app**: `convertidor-backend` (o el que prefieras, debe ser único)
- **Región**: Elige la más cercana (ej: `iad` para Virginia, `sjc` para California)
- **¿Copiar configuración de fly.toml?** → **Sí** (esto usará tu `fly.toml` existente)
- **¿Crear Postgres?** → **No**
- **¿Crear Redis?** → **No**
- **¿Crear GitHub Actions workflow?** → Opcional (puedes decir No por ahora)

**Nota**: El flag `--copy-config` le dice a Fly que use tu `fly.toml` existente sin modificarlo.

### Paso 3: Configurar variables de entorno (opcional)

Si tu frontend estará en otro dominio, configura la URL:

```bash
fly secrets set FRONTEND_URL=https://tu-frontend.com
```

### Paso 4: Desplegar

**IMPORTANTE**: Primero debes crear la aplicación con `fly launch` (Paso 2). Si ya la creaste, ahora despliega:

```bash
fly deploy
```

Esto construirá la imagen Docker, instalará FFmpeg y todas las dependencias, y desplegará tu aplicación.

**Si obtienes el error "app not found"**: Significa que aún no has creado la aplicación. Ejecuta primero `fly launch` (Paso 2).

### Paso 5: Verificar el despliegue

```bash
fly status
fly logs
```

Tu backend estará disponible en: `https://[tu-app].fly.dev`

## Configurar Dominio Personalizado

Si tienes un dominio propio y quieres usarlo en lugar de `[tu-app].fly.dev`:

### Paso 1: Agregar el dominio a tu app

```bash
fly certs add tu-dominio.com
```

O si quieres usar un subdominio:

```bash
fly certs add api.tu-dominio.com
```

### Paso 2: Configurar registros DNS

Fly.io te mostrará los registros DNS que debes agregar. Ejemplo:

```
Tipo: A
Nombre: @ (o api si es subdominio)
Valor: [IP que Fly.io te proporcionará]
```

O si prefieres usar CNAME:

```
Tipo: CNAME
Nombre: @ (o api si es subdominio)
Valor: [tu-app].fly.dev
```

**Nota**: Si usas CNAME, también necesitarás agregar un registro A para el dominio raíz (apex).

### Paso 3: Verificar el certificado SSL

Después de agregar los registros DNS, Fly.io generará automáticamente un certificado SSL gratuito. Verifica el estado:

```bash
fly certs show tu-dominio.com
```

El certificado puede tardar unos minutos en generarse. Una vez que esté listo, verás "Issued" en el estado.

### Paso 4: Actualizar CORS (si es necesario)

Si tu frontend también usará un dominio personalizado, actualiza la variable de entorno:

```bash
fly secrets set FRONTEND_URL=https://tu-frontend.com
```

### Comandos útiles para dominios

```bash
# Ver todos los certificados
fly certs list

# Ver detalles de un certificado
fly certs show tu-dominio.com

# Eliminar un certificado
fly certs remove tu-dominio.com
```

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
