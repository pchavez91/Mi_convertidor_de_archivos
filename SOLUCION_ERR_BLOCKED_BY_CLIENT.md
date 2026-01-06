# Solución: ERR_BLOCKED_BY_CLIENT

## Problema
El navegador está bloqueando las peticiones al backend con el error `ERR_BLOCKED_BY_CLIENT`.

## Causas Comunes

1. **Bloqueadores de anuncios** (uBlock Origin, AdBlock Plus, etc.)
2. **Extensiones de privacidad** (Privacy Badger, etc.)
3. **Configuración del navegador** (modo estricto de privacidad)
4. **Antivirus o firewall** bloqueando conexiones locales

## Soluciones

### Solución 1: Desactivar extensiones temporalmente
1. Abre el navegador en modo incógnito (Ctrl+Shift+N)
2. O desactiva temporalmente las extensiones de bloqueo
3. Prueba la aplicación nuevamente

### Solución 2: Agregar a la lista blanca
Si usas uBlock Origin o AdBlock:
1. Haz clic en el icono de la extensión
2. Busca "Lista blanca" o "Whitelist"
3. Agrega: `localhost:8000` o `127.0.0.1:8000`

### Solución 3: Verificar entorno virtual
Aunque el backend está corriendo, puede faltar el entorno virtual:

```bash
# Crear entorno virtual (si no existe)
cd backend
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar backend
python main.py
```

### Solución 4: Verificar firewall
1. Asegúrate de que Windows Firewall no esté bloqueando Python
2. Permite Python a través del firewall si es necesario

### Solución 5: Probar en otro navegador
Prueba en Chrome, Firefox o Edge para verificar si es específico del navegador.

## Verificación

1. Abre `http://localhost:8000/` directamente en el navegador
2. Deberías ver un JSON con información del servidor
3. Si ves el JSON, el backend está funcionando correctamente
4. Si no ves nada o hay error, el problema es del bloqueador

## Mensaje de Error Mejorado

El código ahora detecta este error y muestra un mensaje más claro con estas instrucciones.
