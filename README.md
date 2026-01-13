# Convertidor de Archivos Online Gratis

> 🚀Esta aplicación está funcionando y disponible en [todoconvertir.com](https://todoconvertir.com)

Aplicación web moderna y gratuita para convertir archivos de audio, imágenes y documentos. 
Herramienta de conversión de formatos sin límites y sin almacenamiento de archivos.

## Características

- 🎵 Conversión de audio: MP3, WAV, AAC, OGG, FLAC, M4A, WMA
- 🖼️ Conversión de imágenes: JPG, PNG, WEBP, GIF, BMP, ICO, TIFF
- 📄 Conversión de documentos: PDF, DOCX, TXT, HTML, MD
- 🚀 Interfaz moderna y fácil de usar
- ⚡ Conversión rápida y eficiente (optimizada para velocidad)
- 🔒 Privacidad garantizada: Los archivos se eliminan automáticamente después de la conversión
- 💝 Gratis y sin límites
- 📏 Límite de tamaño: 50 MB por archivo (para garantizar velocidad y estabilidad)

## Requisitos

- Python 3.9+
- Node.js 18+
- FFmpeg (para conversión de audio)

## Instalación

### Backend

**Opción 1: Usando el script de instalación (recomendado)**
```bash
# Windows
cd backend
install.bat

# Linux/macOS
cd backend
chmod +x install.sh
./install.sh
```

**Opción 2: Instalación manual**
```bash
# Windows
cd backend
py -m pip install --upgrade pip
py -m pip install -r requirements.txt

# Linux/macOS
cd backend
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
```

**Nota:** Si tienes problemas instalando `reportlab`, puedes instalarlo manualmente:
```bash
py -m pip install reportlab
```

### Frontend

```bash
cd frontend
npm install
```

**Nota:** El frontend utiliza React Router para la navegación. Las dependencias se instalan automáticamente con `npm install`.

## Uso

### Iniciar el backend

```bash
# Windows
cd backend
py main.py

# Linux/macOS
cd backend
python3 main.py
```

El servidor estará disponible en `http://localhost:8000`

**Endpoints disponibles:**
- `GET /` - Información del servidor y estado
- `GET /docs` - Documentación interactiva de la API (Swagger UI)
- `GET /formats` - Lista de formatos soportados
- `POST /convert` - Convertir un archivo

### Iniciar el frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Cómo usar la aplicación

1. **Sube un archivo**: Arrastra y suelta un archivo o haz clic para seleccionarlo (máximo 50 MB)
2. **Elige el formato de salida**: Selecciona el formato al que deseas convertir tu archivo
3. **Convierte**: Haz clic en el botón "Convertir Archivo" y espera a que se complete la conversión
4. **Descarga**: Una vez completada, descarga tu archivo convertido

**Notas importantes:**
- **Tamaño máximo**: 50 MB por archivo. Los archivos más grandes no pueden ser procesados.
- No puedes convertir un archivo al mismo formato (ej: MP3 a MP3). Debes elegir un formato diferente.
- Las conversiones de audio están optimizadas para velocidad, priorizando la rapidez sobre la máxima calidad.

### Acceso desde Red Local

La aplicación puede ser accedida desde otros dispositivos en tu red local. Ver [ACCESO_RED_LOCAL.md](ACCESO_RED_LOCAL.md) para más detalles.

Al iniciar el backend, verás la IP de red local en la consola. Usa esa IP desde otros dispositivos:
```
http://[IP_DEL_SERVIDOR]:5173
```

### Rutas de la Aplicación

- `/` - Página principal (convertidor)
- `/politica-privacidad` - Política de privacidad
- `/terminos-condiciones` - Términos y condiciones

## Formatos Soportados

### Audio
**Entrada y Salida**: MP3, WAV, AAC, OGG, FLAC, M4A, WMA

- **MP3**: Formato de audio más común, buena compresión
- **WAV**: Audio sin compresión, máxima calidad
- **AAC**: Alta calidad con menor tamaño que MP3
- **OGG**: Formato abierto y eficiente
- **FLAC**: Sin pérdida de calidad, compresión lossless
- **M4A**: Formato Apple, alta calidad
- **WMA**: Formato Windows Media

### Imágenes
**Entrada y Salida**: JPG/JPEG, PNG, WEBP, GIF, BMP, ICO, TIFF

- **JPG/JPEG**: Ideal para fotografías, buena compresión
- **PNG**: Soporta transparencia, sin pérdida
- **WEBP**: Optimizado para web, mejor compresión que JPG/PNG
- **GIF**: Animaciones y gráficos simples
- **BMP**: Sin compresión, archivos grandes
- **ICO**: Iconos de Windows
- **TIFF**: Alta calidad, usado en impresión

### Documentos
**Entrada**: PDF, DOCX, TXT, HTML, MD, RTF, ODT  
**Salida**: TXT, HTML, PDF, DOCX, MD

- **PDF**: Documento portable, mantiene formato
- **DOCX**: Formato Microsoft Word
- **TXT**: Texto plano sin formato
- **HTML**: Página web, formato de marcado
- **MD**: Markdown, formato de texto ligero
- **RTF**: Rich Text Format
- **ODT**: Formato OpenDocument Text

## Límites y Restricciones

- **Tamaño máximo de archivo**: 50 MB por archivo
- **Tiempo máximo de conversión**: 30 minutos por archivo
- **Formatos**: Solo se pueden convertir archivos de los formatos soportados listados abajo

**Nota sobre el límite de 50 MB:**
Este límite se estableció para garantizar:
- Velocidad de conversión óptima
- Estabilidad del servidor
- Mejor experiencia de usuario
- Prevención de timeouts y errores

Si necesitas convertir archivos más grandes, considera dividirlos en partes más pequeñas o usar herramientas locales.

## Privacidad y Seguridad

- ✅ Los archivos se procesan temporalmente y se eliminan automáticamente
- ✅ No almacenamos archivos permanentemente en el servidor
- ✅ No recopilamos información personal de los usuarios
- ✅ Conexiones seguras (HTTPS recomendado en producción)

## Política de Privacidad y Términos

- [Política de Privacidad](/politica-privacidad)
- [Términos y Condiciones](/terminos-condiciones)

## Compatibilidad

### Navegadores Soportados

- ✅ Chrome/Chromium (recomendado)
- ✅ Firefox
- ✅ Edge
- ✅ Safari
- ⚠️ Brave (puede requerir desactivar bloqueadores de anuncios para algunos recursos)

**Nota:** Si experimentas problemas con Brave, verifica que los bloqueadores de anuncios no estén bloqueando recursos necesarios de la aplicación.

## Donaciones

Este servicio es completamente gratuito y siempre lo será. Si te ha sido útil y quieres apoyar el desarrollo y mantenimiento del proyecto, puedes hacer una donación a través de:

- 💳 PayPal
- 💳 MercadoPago (pesos chilenos - CLP)
- ₿ Criptomonedas

Las donaciones son completamente opcionales y ayudan a mantener el servicio funcionando. Puedes encontrar el botón de donaciones en la parte superior de la página.

## Contacto

- **Email**: pchavez.dev@gmail.com
- **GitHub**: [pchavez91](https://github.com/pchavez91)
- **LinkedIn**: [Patricio Chávez](https://linkedin.com/in/patricio-chavez-005b83352)

## Despliegue y Configuración

Este proyecto está desplegado en producción usando:

- **Frontend**: [Vercel](https://vercel.com) - `https://todoconvertir.com`
- **Backend**: [Fly.io](https://fly.io) - `https://api.todoconvertir.com`

### Configuración para Despliegue

#### Backend (Fly.io)

El backend está configurado con:
- **Dockerfile**: Incluye FFmpeg y todas las dependencias necesarias
- **fly.toml**: Configuración de la aplicación en Fly.io
- **Certificado SSL**: Configurado para `api.todoconvertir.com`
- **CORS**: Configurado para permitir peticiones desde `todoconvertir.com`

Para desplegar el backend:
```bash
# Instalar Fly CLI
# Windows: powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
# macOS/Linux: curl -L https://fly.io/install.sh | sh

# Iniciar sesión
fly auth login

# Crear la aplicación (si no existe)
fly launch

# Desplegar
fly deploy
```

Ver [FLY_DEPLOY.md](FLY_DEPLOY.md) para instrucciones detalladas.

#### Frontend (Vercel)

El frontend está configurado con:
- **Framework**: Vite + React
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variable**: `VITE_API_URL=https://api.todoconvertir.com`

Para desplegar el frontend:
1. Conecta tu repositorio a Vercel
2. Configura el proyecto:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Agrega la variable de entorno `VITE_API_URL`
4. Configura el dominio personalizado

### Variables de Entorno

**Backend (Fly.io):**
```bash
fly secrets set FRONTEND_URL=https://todoconvertir.com,https://www.todoconvertir.com
```

**Frontend (Vercel):**
- `VITE_API_URL=https://api.todoconvertir.com`

## Tecnologías

### Frontend
- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **TailwindCSS** - Framework de CSS
- **React Router v6** - Enrutamiento
- **Axios** - Cliente HTTP

### Backend
- **FastAPI** - Framework web asíncrono
- **Python 3.9+** - Lenguaje de programación
- **Uvicorn** - Servidor ASGI
- **aiofiles** - Operaciones de archivo asíncronas

### Conversión
- **FFmpeg** - Audio (optimizado para velocidad con presets rápidos)
- **Pillow (PIL)** - Imágenes
- **python-docx** - Documentos Word
- **PyPDF2** - Extracción de texto de PDF
- **reportlab** - Generación de PDF

### Optimizaciones de Rendimiento

El sistema está optimizado para priorizar la velocidad de conversión:

**Audio:**
- Presets rápidos de FFmpeg
- Bitrates optimizados para velocidad
- Compresión balanceada
- Perfiles de codec optimizados para procesamiento rápido

Estas optimizaciones garantizan conversiones rápidas mientras mantienen una calidad aceptable.

## Solución de Problemas

### Error: "Formato de salida no especificado"
- Asegúrate de seleccionar un formato de salida antes de convertir
- Verifica que el formato seleccionado sea diferente al formato de entrada

### Error: "El archivo ya está en formato X"
- No puedes convertir un archivo al mismo formato
- Selecciona un formato de salida diferente

### Error: Conversión muy lenta
- Las conversiones de audio pueden tardar varios minutos dependiendo del tamaño
- El sistema está optimizado para velocidad, pero archivos grandes (cerca de 50 MB) pueden tardar más
- Para archivos grandes, considera dividirlos en partes más pequeñas

### Error: Archivo demasiado grande
- El tamaño máximo permitido es 50 MB por archivo
- Si tu archivo excede este límite, divídelo en partes más pequeñas o comprímalo antes de convertir
- El límite se estableció para garantizar velocidad y estabilidad del servicio

### Error: Archivo no encontrado al descargar
- Los archivos se eliminan automáticamente después de un tiempo
- Si el archivo no está disponible, convierte el archivo nuevamente
- El sistema está optimizado para mantener los archivos disponibles durante la descarga

### Error: Archivo no soportado
- Verifica que el formato del archivo esté en la lista de formatos soportados
- Algunos formatos solo están disponibles para entrada o salida, no ambos

### Problemas con Brave Browser
- Si la página aparece en blanco, verifica la consola del navegador (F12)
- Algunos bloqueadores pueden bloquear recursos necesarios
- Intenta desactivar temporalmente los bloqueadores de anuncios

## Licencia

Este proyecto es de propiedad privada. Todos los derechos reservados.

## Sobre el Proyecto

Este proyecto nació de la necesidad de tener una herramienta simple y gratuita para convertir archivos sin tener que instalar software adicional o preocuparse por límites de uso. La aplicación está diseñada para ser rápida, segura y respetuosa con la privacidad del usuario.

**Características principales:**
- Sin límites de uso
- Sin registro requerido
- Procesamiento seguro y privado
- Interfaz intuitiva y moderna
- Soporte para múltiples formatos

## Autor

Desarrollado y mantenido por Patricio Chávez

Si tienes preguntas, sugerencias o encuentras algún problema, no dudes en contactarme:

- 📧 Email: pchavez.dev@gmail.com
- 💻 GitHub: [@pchavez91](https://github.com/pchavez91)
- 💼 LinkedIn: [Patricio Chávez](https://linkedin.com/in/patricio-chavez-005b83352)
