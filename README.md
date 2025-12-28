# Convertidor de Archivos

Aplicación web moderna para convertir archivos de audio, video, imágenes y documentos.

## Características

- 🎵 Conversión de audio (MP3, WAV, AAC, OGG, etc.)
- 🎬 Conversión de video (MP4, AVI, MOV, MKV, etc.)
- 🖼️ Conversión de imágenes (JPG, PNG, WEBP, SVG, etc.)
- 📄 Conversión de documentos (PDF, DOCX, TXT, etc.)
- 🚀 Interfaz moderna y fácil de usar
- ⚡ Conversión rápida y eficiente

## Requisitos

- Python 3.9+
- Node.js 18+
- FFmpeg (para conversión de audio/video)

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

### Frontend

```bash
cd frontend
npm install
```

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

### Iniciar el frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Acceso desde Red Local

La aplicación puede ser accedida desde otros dispositivos en tu red local. Ver [ACCESO_RED_LOCAL.md](ACCESO_RED_LOCAL.md) para más detalles.

Al iniciar el backend, verás la IP de red local en la consola. Usa esa IP desde otros dispositivos:
```
http://[IP_DEL_SERVIDOR]:5173
```

## Tecnologías

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: FastAPI + Python
- **Conversión**: FFmpeg, Pillow, python-docx

