# Solución de Errores con el Dominio

## Error: "Hostname already exists on app"

### Problema
El certificado SSL para `api.todoconvertir.com` ya está agregado en Fly.io, pero probablemente el DNS no está configurado o el certificado aún no está emitido.

### Solución

1. **Verificar el estado del certificado:**
   ```powershell
   fly certs show api.todoconvertir.com
   ```

2. **Ver todos los certificados:**
   ```powershell
   fly certs list
   ```

3. **Si el estado no es "Issued", necesitas:**
   - Configurar los registros DNS que Fly.io te indicó
   - Esperar a que el DNS se propague
   - El certificado se emitirá automáticamente

4. **Para ver las instrucciones de DNS:**
   ```powershell
   fly certs show api.todoconvertir.com
   ```
   
   Esto mostrará los registros DNS que debes agregar.

## Error: "the config for your app is missing an app name"

### Problema
Estás ejecutando comandos de Fly.io desde el directorio `backend/`, pero el archivo `fly.toml` está en la raíz del proyecto.

### Solución

**Opción 1: Cambiar al directorio raíz (Recomendado)**
```powershell
# Desde backend/, sube un nivel
cd ..

# Ahora estás en la raíz, verifica que existe fly.toml
ls fly.toml

# Ahora puedes ejecutar los comandos
fly certs list
fly certs add api.todoconvertir.com
```

**Opción 2: Especificar el nombre de la app**
```powershell
# Desde cualquier directorio, usa el flag -a
fly certs list -a convertidor-backend
fly certs add api.todoconvertir.com -a convertidor-backend
```

## Error: "No es posible conectar con el servidor remoto" al hacer curl

### Problema
El dominio `todoconvertir.com` aún no está configurado o el DNS no está apuntando correctamente.

### Solución

1. **Verifica que el dominio esté agregado en Fly.io:**
   ```powershell
   cd E:\Proyecto\Mi_convertidor_de_archivos
   fly certs list -a convertidor-backend
   ```

2. **Si no está agregado, agrégalo:**
   ```powershell
   fly certs add api.todoconvertir.com -a convertidor-backend
   ```

3. **Fly.io te dará instrucciones de DNS. Configura los registros:**
   - Si usa CNAME: `api.todoconvertir.com` → `convertidor-backend.fly.dev`
   - Si usa A: `api.todoconvertir.com` → [IP que Fly.io te dará]

4. **Espera a que el DNS se propague (puede tardar hasta 48 horas, pero generalmente es rápido)**

5. **Verifica el estado del certificado:**
   ```powershell
   fly certs show api.todoconvertir.com -a convertidor-backend
   ```
   
   El estado debe ser "Issued" (emitido).

## Pasos Completos para Configurar el Dominio

### Paso 1: Ir a la raíz del proyecto
```powershell
cd E:\Proyecto\Mi_convertidor_de_archivos
```

### Paso 2: Verificar que la app existe
```powershell
fly status -a convertidor-backend
```

### Paso 3: Agregar el certificado SSL
```powershell
fly certs add api.todoconvertir.com -a convertidor-backend
```

### Paso 4: Configurar DNS
Fly.io te mostrará los registros DNS que debes agregar. Ejemplo:

**Si usa CNAME:**
```
Tipo: CNAME
Nombre: api
Valor: convertidor-backend.fly.dev
TTL: 3600
```

**Si usa A:**
```
Tipo: A
Nombre: api
Valor: [IP que Fly.io te dará]
TTL: 3600
```

### Paso 5: Esperar y verificar
```powershell
# Espera unos minutos y verifica el estado
fly certs show api.todoconvertir.com -a convertidor-backend

# Cuando el estado sea "Issued", prueba:
curl https://api.todoconvertir.com/
```

### Paso 6: Configurar CORS
```powershell
fly secrets set FRONTEND_URL=https://todoconvertir.com,https://www.todoconvertir.com -a convertidor-backend
```

## Verificación Rápida

```powershell
# 1. Verificar que estás en el directorio correcto
pwd
# Debe mostrar: E:\Proyecto\Mi_convertidor_de_archivos

# 2. Verificar que fly.toml existe
Test-Path fly.toml
# Debe mostrar: True

# 3. Ver certificados
fly certs list -a convertidor-backend

# 4. Ver estado de la app
fly status -a convertidor-backend
```

## Notas Importantes

- **Siempre ejecuta comandos de Fly.io desde la raíz del proyecto** (donde está `fly.toml`)
- **O usa el flag `-a convertidor-backend`** si estás en otro directorio
- **El DNS puede tardar en propagarse** (generalmente 5-30 minutos, máximo 48 horas)
- **El certificado SSL se genera automáticamente** después de configurar DNS (puede tardar 5-10 minutos)
