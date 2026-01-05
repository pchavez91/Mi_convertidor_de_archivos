# Verificación de Configuración del Dominio: todoconvertir.com

Esta guía te ayudará a verificar que tu dominio `todoconvertir.com` esté configurado correctamente.

## ✅ Checklist de Verificación

### 1. Backend en Fly.io

#### Verificar que el dominio esté agregado:
```bash
fly certs list
```

Deberías ver algo como:
```
Hostname                    Status
api.todoconvertir.com       Issued
```

#### Si no está agregado, agrégalo:
```bash
# Para el dominio principal del backend (ej: api.todoconvertir.com)
fly certs add api.todoconvertir.com

# O si el backend está en el dominio raíz
fly certs add todoconvertir.com
```

#### Verificar el estado del certificado:
```bash
fly certs show api.todoconvertir.com
```

El estado debe ser **"Issued"** (emitido).

### 2. Configurar Variables de Entorno en Fly.io

#### Configurar FRONTEND_URL (para CORS):
```bash
fly secrets set FRONTEND_URL=https://todoconvertir.com
```

Si también usas www:
```bash
fly secrets set FRONTEND_URL=https://todoconvertir.com,https://www.todoconvertir.com
```

#### Verificar las variables configuradas:
```bash
fly secrets list
```

### 3. Frontend (Vercel/Netlify)

#### Configurar el dominio:
- **Vercel**: Settings → Domains → Agregar `todoconvertir.com` y `www.todoconvertir.com`
- **Netlify**: Site settings → Domain management → Agregar dominio

#### Configurar Variable de Entorno VITE_API_URL:

**En Vercel:**
- Settings → Environment Variables
- Agregar: `VITE_API_URL` = `https://api.todoconvertir.com` (o la URL de tu backend)

**En Netlify:**
- Site settings → Environment variables
- Agregar: `VITE_API_URL` = `https://api.todoconvertir.com`

**IMPORTANTE**: Después de agregar la variable, necesitas hacer un nuevo deploy.

### 4. Configuración DNS

Verifica que los registros DNS estén configurados correctamente:

#### Para el Backend (api.todoconvertir.com):
```
Tipo: CNAME
Nombre: api
Valor: convertidor-backend.fly.dev
TTL: 3600
```

O si usas registro A (Fly.io te dará la IP):
```
Tipo: A
Nombre: api
Valor: [IP de Fly.io]
TTL: 3600
```

#### Para el Frontend (todoconvertir.com):
**En Vercel:**
```
Tipo: A
Nombre: @
Valor: 76.76.21.21
TTL: 3600

Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
TTL: 3600
```

**En Netlify:**
```
Tipo: A
Nombre: @
Valor: [IPs que Netlify te proporcionará]
TTL: 3600

Tipo: CNAME
Nombre: www
Valor: [tu-app].netlify.app
TTL: 3600
```

### 5. Verificar que Todo Funciona

#### Probar el Backend:
```bash
# Verificar que el backend responde
curl https://api.todoconvertir.com/

# O en el navegador:
https://api.todoconvertir.com/
```

Deberías ver:
```json
{
  "message": "Convertidor de Archivos API",
  "status": "running"
}
```

#### Probar el Frontend:
Abre en el navegador:
```
https://todoconvertir.com
```

Deberías ver la aplicación funcionando.

#### Verificar CORS:
Abre la consola del navegador (F12) en `todoconvertir.com` y verifica que no haya errores de CORS.

### 6. Comandos Útiles para Verificar

```bash
# Ver estado de la app en Fly.io
fly status

# Ver logs del backend
fly logs

# Ver información de la app
fly info

# Ver certificados SSL
fly certs list

# Ver detalles de un certificado
fly certs show api.todoconvertir.com
```

## 🔧 Solución de Problemas

### Error: "Certificate not issued"
- Espera unos minutos (puede tardar hasta 10 minutos)
- Verifica que los registros DNS estén configurados correctamente
- Ejecuta: `fly certs check api.todoconvertir.com`

### Error: CORS en el navegador
- Verifica que `FRONTEND_URL` esté configurada en Fly.io
- Verifica que el valor sea exactamente `https://todoconvertir.com` (con https)
- Reinicia la app: `fly apps restart convertidor-backend`

### El frontend no se conecta al backend
- Verifica que `VITE_API_URL` esté configurada en Vercel/Netlify
- Verifica que el valor sea `https://api.todoconvertir.com`
- Haz un nuevo deploy del frontend después de agregar la variable

### El dominio no carga
- Verifica los registros DNS (puede tardar hasta 48 horas en propagarse)
- Usa herramientas como `nslookup` o `dig` para verificar:
  ```bash
  nslookup api.todoconvertir.com
  dig api.todoconvertir.com
  ```

## 📝 Resumen de URLs Esperadas

- **Frontend**: `https://todoconvertir.com`
- **Backend API**: `https://api.todoconvertir.com` (o el que hayas configurado)
- **Documentación API**: `https://api.todoconvertir.com/docs`

## ✅ Verificación Final

1. ✅ Backend responde en `https://api.todoconvertir.com`
2. ✅ Frontend carga en `https://todoconvertir.com`
3. ✅ Frontend se conecta al backend (sin errores en consola)
4. ✅ Las conversiones funcionan correctamente
5. ✅ No hay errores de CORS

Si todos estos puntos están verificados, ¡tu configuración está correcta! 🎉
