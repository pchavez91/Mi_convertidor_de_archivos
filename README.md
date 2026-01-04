# Convertidor de Archivos

Aplicación web moderna para convertir archivos de audio, video, imágenes y documentos.

## Características

- 🎵 Conversión de audio: MP3, WAV, AAC, OGG, FLAC, M4A, WMA
- 🎬 Conversión de video: MP4, AVI, MOV, MKV, WEBM, FLV, WMV, M4V
- 🖼️ Conversión de imágenes: JPG, PNG, WEBP, GIF, BMP, ICO, TIFF
- 📄 Conversión de documentos: PDF, DOCX, TXT, HTML, MD
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

**Nota:** Si tienes problemas instalando `reportlab`, puedes instalarlo manualmente:
```bash
py -m pip install reportlab
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

### Video
**Entrada y Salida**: MP4, AVI, MOV, MKV, WEBM, FLV, WMV, M4V

- **MP4**: Formato más compatible y estándar
- **AVI**: Formato clásico de video
- **MOV**: Formato Apple QuickTime
- **MKV**: Contenedor flexible y versátil
- **WEBM**: Optimizado para web, formato abierto
- **FLV**: Formato Flash Video
- **WMV**: Formato Windows Media Video
- **M4V**: Formato Apple para video

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

## Tecnologías

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: FastAPI + Python
- **Conversión**: 
  - FFmpeg (audio y video)
  - Pillow (imágenes)
  - python-docx (documentos Word)
  - PyPDF2 (PDF)
  - reportlab (generación de PDF)
