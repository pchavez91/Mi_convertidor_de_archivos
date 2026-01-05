# Configuración DNS Correcta para todoconvertir.com

## ❌ Configuración Actual (Incorrecta)

Actualmente tienes:
- `@` (todoconvertir.com) → Apunta a Fly.io (backend) ❌
- `www` → Apunta a Fly.io (backend) ❌

Por eso ves el JSON del backend cuando accedes a `todoconvertir.com`.

## ✅ Configuración Correcta

### Estructura de Dominios

- **Frontend**: `todoconvertir.com` y `www.todoconvertir.com` → Vercel/Netlify
- **Backend (API)**: `api.todoconvertir.com` → Fly.io

## Pasos para Corregir

### Paso 1: Desplegar el Frontend (si aún no lo has hecho)

Primero necesitas desplegar el frontend en Vercel o Netlify. Ver `CONFIGURAR_FRONTEND.md` para instrucciones detalladas.

### Paso 2: Obtener las IPs/CNAME del Frontend

**Si usas Vercel:**
- Ve a tu proyecto en Vercel → Settings → Domains
- Agrega `todoconvertir.com` y `www.todoconvertir.com`
- Vercel te dará las IPs o CNAME que debes usar

**Si usas Netlify:**
- Ve a Site settings → Domain management
- Agrega `todoconvertir.com` y `www.todoconvertir.com`
- Netlify te dará las IPs o CNAME

### Paso 3: Configurar DNS Correctamente

En tu panel de DNS (Spaceship), cambia los registros así:

#### Eliminar o Modificar Registros Actuales:

1. **Elimina o modifica el registro A para `@`:**
   - Actual: `@` → `66.241.124.104` (IP de Fly.io)
   - **Nuevo**: `@` → [IP de Vercel/Netlify] (ej: `76.76.21.21` para Vercel)

2. **Elimina o modifica el registro AAAA para `@`:**
   - Actual: `@` → `2a09:8280:1::c0:f555:0` (IPv6 de Fly.io)
   - **Nuevo**: `@` → [IPv6 de Vercel/Netlify] (si lo proporcionan)

3. **Modifica el registro CNAME para `www`:**
   - Actual: `www` → `convertidor-backend.fly.dev`
   - **Nuevo**: `www` → [CNAME de Vercel/Netlify] (ej: `cname.vercel-dns.com`)

#### Agregar Nuevo Registro para API:

4. **Agrega un nuevo registro CNAME para `api`:**
   - Tipo: `CNAME`
   - Host: `api`
   - Valor: `convertidor-backend.fly.dev.` (con punto al final)
   - TTL: `30 min` (o el que prefieras)

## Configuración DNS Final

Después de los cambios, deberías tener:

```
Host    Tipo    Valor
----    ----    -----
@       A       [IP de Vercel/Netlify]          ← Frontend
@       AAAA    [IPv6 de Vercel/Netlify]        ← Frontend (opcional)
www     CNAME   [CNAME de Vercel/Netlify]      ← Frontend
api     CNAME   convertidor-backend.fly.dev.   ← Backend (NUEVO)
```

## Ejemplo con Vercel

Si usas Vercel, la configuración sería:

```
Host    Tipo    Valor
----    ----    -----
@       A       76.76.21.21                    ← Vercel
www     CNAME   cname.vercel-dns.com           ← Vercel
api     CNAME   convertidor-backend.fly.dev.   ← Fly.io
```

## Paso 4: Eliminar Certificados Incorrectos de Fly.io

Ya que `todoconvertir.com` y `www.todoconvertir.com` no deben apuntar a Fly.io, puedes eliminar esos certificados:

```powershell
# Eliminar certificado de todoconvertir.com (no lo necesitas en Fly.io)
fly certs remove todoconvertir.com

# Eliminar certificado de www.todoconvertir.com (no lo necesitas en Fly.io)
fly certs remove www.todoconvertir.com
```

## Paso 5: Crear Certificado para API (si no existe)

Si aún no tienes el certificado para `api.todoconvertir.com`:

```powershell
fly certs add api.todoconvertir.com
```

Fly.io te dará instrucciones de DNS, pero como ya agregaste el registro CNAME en el Paso 3, el certificado se emitirá automáticamente.

## Paso 6: Verificar

Después de cambiar DNS y esperar la propagación (5-30 minutos):

1. **Frontend debe funcionar:**
   - `https://todoconvertir.com` → Debe mostrar la interfaz de conversión
   - `https://www.todoconvertir.com` → Debe mostrar la interfaz de conversión

2. **Backend debe funcionar:**
   - `https://api.todoconvertir.com` → Debe mostrar el JSON: `{"message":"Convertidor de Archivos API",...}`

3. **Verificar certificados:**
   ```powershell
   fly certs list
   ```
   
   Debe mostrar solo `api.todoconvertir.com` con estado "Issued".

## Resumen de Cambios en DNS

### Antes (Incorrecto):
```
@       A       66.241.124.104              ← Backend ❌
@       AAAA    2a09:8280:1::c0:f555:0    ← Backend ❌
www     CNAME   convertidor-backend.fly.dev ← Backend ❌
```

### Después (Correcto):
```
@       A       [IP de Vercel/Netlify]     ← Frontend ✅
@       AAAA    [IPv6 de Vercel/Netlify]   ← Frontend ✅
www     CNAME   [CNAME de Vercel/Netlify]  ← Frontend ✅
api     CNAME   convertidor-backend.fly.dev ← Backend ✅
```

## Notas Importantes

1. **Espera la propagación DNS**: Los cambios pueden tardar 5-30 minutos (máximo 48 horas)
2. **El frontend debe estar desplegado**: Asegúrate de tener el frontend en Vercel/Netlify antes de cambiar DNS
3. **Variable de entorno**: No olvides configurar `VITE_API_URL=https://api.todoconvertir.com` en Vercel/Netlify
4. **CORS**: Configura `FRONTEND_URL` en Fly.io:
   ```powershell
   fly secrets set FRONTEND_URL=https://todoconvertir.com,https://www.todoconvertir.com
   ```

## Verificación Final

```powershell
# Verificar DNS (desde PowerShell)
nslookup todoconvertir.com
nslookup api.todoconvertir.com

# Verificar certificados en Fly.io
fly certs list

# Verificar estado de la app
fly status
```
