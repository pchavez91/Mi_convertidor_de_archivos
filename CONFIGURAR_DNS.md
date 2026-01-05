# Configurar DNS para api.todoconvertir.com

## Paso 1: Verificar el estado del certificado

```powershell
fly certs show api.todoconvertir.com
```

Esto te mostrará:
- El estado del certificado (Pending, Issued, etc.)
- Las instrucciones de DNS que debes configurar

## Paso 2: Ver las instrucciones de DNS

El comando anterior mostrará algo como:

```
Hostname: api.todoconvertir.com
Status: Pending
DNS Provider: [tu proveedor]

DNS Validation Instructions:
  Add a CNAME record:
    Name: _acme-challenge.api
    Value: [valor que Fly.io te dará]
```

O puede pedirte un registro A o CNAME diferente.

## Paso 3: Configurar DNS en tu proveedor

### Si Fly.io pide un CNAME:

1. Ve al panel de control de tu proveedor de DNS (donde compraste `todoconvertir.com`)
2. Agrega un registro CNAME:
   ```
   Tipo: CNAME
   Nombre: api
   Valor: convertidor-backend.fly.dev
   TTL: 3600 (o automático)
   ```

### Si Fly.io pide un registro A:

1. Agrega un registro A:
   ```
   Tipo: A
   Nombre: api
   Valor: [IP que Fly.io te proporcionará]
   TTL: 3600
   ```

### Si Fly.io pide un registro para validación ACME:

1. Agrega el registro que Fly.io te indique (generalmente `_acme-challenge.api`)
2. Este es temporal y se usa solo para validar el dominio

## Paso 4: Verificar la propagación DNS

Después de agregar los registros, espera 5-30 minutos y verifica:

```powershell
# Verificar el estado del certificado
fly certs show api.todoconvertir.com

# Verificar DNS (desde PowerShell)
nslookup api.todoconvertir.com
```

## Paso 5: Esperar la emisión del certificado

Una vez que el DNS esté configurado correctamente:
- Fly.io detectará automáticamente los cambios
- El certificado se emitirá en 5-10 minutos
- El estado cambiará de "Pending" a "Issued"

## Verificación Final

Cuando el certificado esté emitido:

```powershell
# Debe mostrar "Issued"
fly certs show api.todoconvertir.com

# Probar la conexión
curl https://api.todoconvertir.com/
```

## Solución de Problemas

### El certificado sigue en "Pending"
- Verifica que los registros DNS estén configurados correctamente
- Espera más tiempo (puede tardar hasta 48 horas, pero generalmente es rápido)
- Verifica que no haya errores de validación: `fly certs show api.todoconvertir.com`

### Error de validación DNS
- Verifica que el nombre del registro sea exactamente como Fly.io lo indica
- Verifica que el valor sea correcto (sin espacios, mayúsculas/minúsculas correctas)
- Algunos proveedores DNS requieren que el nombre termine con un punto (.)

### El dominio no responde después de emitir el certificado
- Verifica que el DNS esté propagado: `nslookup api.todoconvertir.com`
- Verifica que la app esté corriendo: `fly status`
- Verifica los logs: `fly logs`
