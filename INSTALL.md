# Guía de Instalación

## Requisitos Previos

### 1. Python 3.9 o superior
Verifica tu versión:
```bash
# Windows
py --version

# Linux/macOS
python3 --version
```

### 2. Node.js 18 o superior
Verifica tu versión:
```bash
node --version
```

### 3. FFmpeg (para conversión de audio/video)

#### Windows:
1. Descarga FFmpeg desde: https://ffmpeg.org/download.html
2. Extrae el archivo ZIP
3. Agrega la carpeta `bin` a tu PATH del sistema
4. Verifica la instalación:
```bash
ffmpeg -version
```

#### macOS:
```bash
brew install ffmpeg
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install ffmpeg
```

## Instalación del Proyecto

### Paso 1: Instalar dependencias del Backend

**Windows:**
```bash
cd backend
py -m pip install --upgrade pip
py -m pip install -r requirements.txt
```

**Linux/macOS:**
```bash
cd backend
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
```

### Paso 2: Instalar dependencias del Frontend

```bash
cd frontend
npm install
```

## Ejecución

### Terminal 1 - Backend
```bash
# Windows
cd backend
py main.py

# Linux/macOS
cd backend
python3 main.py
```

El servidor estará disponible en: `http://localhost:8000`

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

## Solución de Problemas

### Error: FFmpeg no encontrado
- Asegúrate de que FFmpeg esté instalado y en tu PATH
- Reinicia tu terminal después de instalar FFmpeg

### Error: Puerto ya en uso
- Cambia el puerto en `backend/main.py` (línea final) o `frontend/vite.config.js`

### Error: Módulos de Python no encontrados
- Asegúrate de estar en un entorno virtual:
```bash
# Windows:
py -m venv venv
venv\Scripts\activate
py -m pip install -r requirements.txt

# macOS/Linux:
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
```

### Error: "python" no se reconoce como comando (Windows)
- En Windows, usa `py` en lugar de `python`:
```bash
py -m pip install --upgrade pip
py main.py
```

