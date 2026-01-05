FROM python:3.11-slim

# Instalar FFmpeg y dependencias del sistema
RUN apt-get update && apt-get install -y \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar requirements.txt
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código del backend
COPY backend/ ./backend/

# Crear directorios para archivos temporales
RUN mkdir -p /app/backend/uploads /app/backend/outputs

# Exponer puerto (Fly.io usará la variable PORT)
EXPOSE 8000

# Comando de inicio
CMD ["python", "backend/main.py"]
