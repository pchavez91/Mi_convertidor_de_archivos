# Acceso desde Red Local

Esta aplicación puede ser accedida desde otros dispositivos en tu red local.

## Configuración

### Backend

El servidor backend ya está configurado para aceptar conexiones desde cualquier IP en la red local (0.0.0.0).

Al iniciar el servidor, verás un mensaje como:

```
🚀 Convertidor de Archivos - Servidor iniciado
============================================================
📍 Acceso local:    http://localhost:8000
🌐 Acceso en red:    http://192.168.1.100:8000
📚 Documentación:    http://localhost:8000/docs
============================================================
```

### Frontend

El servidor frontend también está configurado para aceptar conexiones desde la red local.

## Cómo acceder desde otro dispositivo

### Paso 1: Obtener la IP del servidor

En el servidor (donde está corriendo la aplicación), ejecuta:

**Windows:**
```bash
ipconfig
```
Busca la dirección IPv4 (ejemplo: 192.168.1.100)

**Linux/macOS:**
```bash
ifconfig
# o
ip addr
```

### Paso 2: Acceder desde otro dispositivo

Desde cualquier dispositivo en la misma red local (mismo WiFi o red cableada), abre un navegador y accede a:

```
http://[IP_DEL_SERVIDOR]:5173
```

Por ejemplo:
```
http://192.168.1.100:5173
```

## Verificación

1. Asegúrate de que ambos dispositivos estén en la misma red
2. Verifica que el firewall de Windows no esté bloqueando los puertos 8000 y 5173
3. Si tienes problemas, prueba desactivar temporalmente el firewall para probar

## Firewall de Windows

Si no puedes acceder desde otros dispositivos, es probable que el firewall esté bloqueando los puertos.

### Permitir puertos en el firewall:

1. Abre "Firewall de Windows Defender" desde el menú de inicio
2. Haz clic en "Configuración avanzada"
3. Selecciona "Reglas de entrada" → "Nueva regla"
4. Selecciona "Puerto" → Siguiente
5. Selecciona "TCP" y escribe el puerto (8000 o 5173) → Siguiente
6. Selecciona "Permitir la conexión" → Siguiente
7. Marca todos los perfiles → Siguiente
8. Dale un nombre (ej: "Convertidor Backend" o "Convertidor Frontend") → Finalizar

Repite el proceso para ambos puertos (8000 y 5173).

## Solución de problemas

### Error: "No se puede acceder a este sitio"

- Verifica que ambos dispositivos estén en la misma red
- Verifica que el servidor esté corriendo
- Verifica que el firewall permita los puertos
- Intenta acceder usando la IP directamente

### Error: "CORS" o errores de conexión

- El backend ya está configurado para permitir CORS desde cualquier origen
- Si persiste, verifica que el backend esté corriendo en `0.0.0.0:8000`

### El frontend no se conecta al backend

- Verifica que el backend esté corriendo
- El frontend detecta automáticamente la IP correcta del backend
- Si hay problemas, verifica la consola del navegador para ver errores

