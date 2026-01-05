# Configurar Frontend en todoconvertir.com

## Problema Actual

Estás viendo el JSON del backend cuando accedes a `todoconvertir.com`:
```json
{"message":"Convertidor de Archivos API","status":"running",...}
```

Esto significa que el dominio `todoconvertir.com` está apuntando al backend de Fly.io, pero debería apuntar al frontend.

## Solución: Estructura Correcta

- **Backend (API)**: `api.todoconvertir.com` → Fly.io
- **Frontend**: `todoconvertir.com` → Vercel o Netlify

## Pasos para Configurar el Frontend

### Opción 1: Vercel (Recomendado)

#### Paso 1: Crear cuenta y conectar repositorio

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta (gratis)
2. Conecta tu repositorio de GitHub/GitLab
3. Selecciona el proyecto `Mi_convertidor_de_archivos`

#### Paso 2: Configurar el proyecto

En la configuración del proyecto:

- **Framework Preset**: `Vite`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install` (o déjalo vacío)

#### Paso 3: Configurar Variable de Entorno

En **Settings → Environment Variables**, agrega:

```
Nombre: VITE_API_URL
Valor: https://api.todoconvertir.com
```

**IMPORTANTE**: Después de agregar la variable, haz un nuevo deploy.

#### Paso 4: Configurar el Dominio

1. Ve a **Settings → Domains**
2. Agrega `todoconvertir.com`
3. Agrega `www.todoconvertir.com` (opcional)
4. Vercel te dará instrucciones de DNS

#### Paso 5: Configurar DNS para el Frontend

En tu proveedor de DNS, configura:

**Para el dominio principal (todoconvertir.com):**
```
Tipo: A
Nombre: @
Valor: 76.76.21.21
TTL: 3600
```

**Para www (opcional):**
```
Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
TTL: 3600
```

O usa los registros que Vercel te proporcione.

#### Paso 6: Verificar

Después de configurar DNS y esperar la propagación (5-30 minutos):
- `todoconvertir.com` → Debe mostrar el frontend (interfaz de conversión)
- `api.todoconvertir.com` → Debe mostrar el JSON del backend

---

### Opción 2: Netlify

#### Paso 1: Crear cuenta y conectar repositorio

1. Ve a [netlify.com](https://netlify.com) y crea una cuenta (gratis)
2. Conecta tu repositorio de GitHub/GitLab
3. Selecciona el proyecto

#### Paso 2: Configurar el proyecto

En la configuración:

- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `frontend/dist`

#### Paso 3: Configurar Variable de Entorno

En **Site settings → Environment variables**, agrega:

```
Key: VITE_API_URL
Value: https://api.todoconvertir.com
```

**IMPORTANTE**: Haz un nuevo deploy después de agregar la variable.

#### Paso 4: Configurar el Dominio

1. Ve a **Site settings → Domain management**
2. Agrega `todoconvertir.com`
3. Netlify te dará instrucciones de DNS

#### Paso 5: Configurar DNS

Usa los registros que Netlify te proporcione.

---

## Verificación Final

Después de configurar todo:

1. **Frontend funciona:**
   - Abre `https://todoconvertir.com`
   - Debe mostrar la interfaz de conversión (no el JSON)

2. **Backend funciona:**
   - Abre `https://api.todoconvertir.com`
   - Debe mostrar el JSON: `{"message":"Convertidor de Archivos API",...}`

3. **Frontend se conecta al backend:**
   - Abre `https://todoconvertir.com`
   - Abre la consola del navegador (F12)
   - No debe haber errores de CORS
   - Intenta convertir un archivo para verificar

## Solución de Problemas

### El frontend muestra el JSON del backend

**Problema**: El DNS de `todoconvertir.com` está apuntando a Fly.io (backend).

**Solución**: 
1. Verifica en tu proveedor de DNS que `todoconvertir.com` apunte a Vercel/Netlify (no a Fly.io)
2. Solo `api.todoconvertir.com` debe apuntar a Fly.io

### Error de CORS en el navegador

**Problema**: El frontend no puede conectarse al backend.

**Solución**:
1. Verifica que `VITE_API_URL` esté configurada correctamente en Vercel/Netlify
2. Verifica que `FRONTEND_URL` esté configurada en Fly.io:
   ```powershell
   fly secrets set FRONTEND_URL=https://todoconvertir.com,https://www.todoconvertir.com
   ```
3. Reinicia la app en Fly.io:
   ```powershell
   fly apps restart convertidor-backend
   ```

### El frontend no carga

**Problema**: El DNS no está propagado o está mal configurado.

**Solución**:
1. Verifica los registros DNS en tu proveedor
2. Espera más tiempo (puede tardar hasta 48 horas, pero generalmente es rápido)
3. Verifica con `nslookup todoconvertir.com`

## Resumen de URLs Finales

- ✅ **Frontend**: `https://todoconvertir.com` → Vercel/Netlify
- ✅ **Backend API**: `https://api.todoconvertir.com` → Fly.io
- ✅ **Documentación API**: `https://api.todoconvertir.com/docs`

## Próximos Pasos

1. Despliega el frontend en Vercel o Netlify
2. Configura `VITE_API_URL=https://api.todoconvertir.com`
3. Configura el dominio `todoconvertir.com` en Vercel/Netlify
4. Actualiza DNS para que `todoconvertir.com` apunte a Vercel/Netlify (no a Fly.io)
5. Verifica que todo funcione
