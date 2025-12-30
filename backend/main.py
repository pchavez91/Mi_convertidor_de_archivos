from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
import subprocess
import shutil
from pathlib import Path
import uuid
from typing import Optional
import aiofiles
import socket
import logging
import traceback

app = FastAPI(title="Convertidor de Archivos API")

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configurar CORS para permitir acceso desde red local
# Permite localhost y todas las IPs de la red local (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
cors_origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]

# Agregar IPs de red local comunes
try:
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    # Agregar IP local
    cors_origins.extend([
        f"http://{local_ip}:5173",
        f"http://{local_ip}:3000",
    ])
    # Agregar rangos comunes de red local
    ip_parts = local_ip.split('.')
    if len(ip_parts) == 4:
        base_ip = '.'.join(ip_parts[:3])
        # Permitir cualquier IP en el mismo segmento de red
        cors_origins.append(f"http://{base_ip}.*:5173")
        cors_origins.append(f"http://{base_ip}.*:3000")
except:
    pass

# Permitir todos los orígenes para desarrollo en red local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todos los orígenes para acceso desde red local
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directorios para archivos temporales
UPLOAD_DIR = Path("uploads")
OUTPUT_DIR = Path("outputs")
UPLOAD_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)

# Formatos soportados
AUDIO_FORMATS = ["mp3", "wav", "aac", "ogg", "flac", "m4a", "wma"]
VIDEO_FORMATS = ["mp4", "avi", "mov", "mkv", "webm", "flv", "wmv", "m4v"]
IMAGE_FORMATS = ["jpg", "jpeg", "png", "webp", "gif", "bmp", "svg", "ico", "tiff"]
DOCUMENT_FORMATS = ["pdf", "docx", "txt", "html", "md", "rtf", "odt"]

def get_file_type(filename: str) -> str:
    """Determina el tipo de archivo basado en la extensión"""
    ext = filename.split('.')[-1].lower()
    if ext in AUDIO_FORMATS:
        return "audio"
    elif ext in VIDEO_FORMATS:
        return "video"
    elif ext in IMAGE_FORMATS:
        return "image"
    elif ext in DOCUMENT_FORMATS:
        return "document"
    return "unknown"

def check_ffmpeg():
    """Verifica si FFmpeg está instalado"""
    try:
        subprocess.run(["ffmpeg", "-version"], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def get_local_ip():
    """Obtiene la IP local del servidor"""
    try:
        # Conectarse a un servidor externo para obtener la IP local
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        try:
            return socket.gethostbyname(socket.gethostname())
        except:
            return "127.0.0.1"

@app.get("/")
async def root():
    local_ip = get_local_ip()
    return {
        "message": "Convertidor de Archivos API",
        "status": "running",
        "local_ip": local_ip,
        "access_url": f"http://{local_ip}:8000"
    }

@app.get("/formats")
async def get_formats():
    """Retorna los formatos soportados"""
    return {
        "audio": AUDIO_FORMATS,
        "video": VIDEO_FORMATS,
        "image": IMAGE_FORMATS,
        "document": DOCUMENT_FORMATS
    }

@app.post("/convert")
async def convert_file(
    file: UploadFile = File(...),
    output_format: str = Form(...)
):
    """Convierte un archivo al formato especificado"""
    
    if not output_format:
        raise HTTPException(status_code=400, detail="Formato de salida no especificado")
    
    output_format = output_format.lower()
    file_type = get_file_type(file.filename)
    
    if file_type == "unknown":
        raise HTTPException(status_code=400, detail="Formato de archivo no soportado")
    
    # Generar nombres únicos
    file_id = str(uuid.uuid4())
    input_path = UPLOAD_DIR / f"{file_id}_{file.filename}"
    output_filename = f"{file_id}.{output_format}"
    output_path = OUTPUT_DIR / output_filename
    
    try:
        # Guardar archivo subido
        async with aiofiles.open(input_path, 'wb') as f:
            content = await file.read()
            await f.write(content)
        
        # Realizar conversión según el tipo
        if file_type in ["audio", "video"]:
            if not check_ffmpeg():
                raise HTTPException(
                    status_code=500, 
                    detail="FFmpeg no está instalado. Por favor instálalo para convertir audio/video."
                )
            await convert_media(input_path, output_path, output_format)
        elif file_type == "image":
            await convert_image(input_path, output_path, output_format)
        elif file_type == "document":
            await convert_document(input_path, output_path, output_format)
        else:
            raise HTTPException(status_code=400, detail="Tipo de archivo no soportado")
        
        # Verificar que el archivo de salida existe
        if not output_path.exists():
            raise HTTPException(status_code=500, detail="Error en la conversión")
        
        return {
            "success": True,
            "download_url": f"/download/{output_filename}",
            "filename": output_filename
        }
    
    except HTTPException:
        # Re-lanzar HTTPException sin modificar
        if input_path.exists():
            input_path.unlink()
        if output_path.exists():
            output_path.unlink()
        raise
    except Exception as e:
        # Limpiar archivos en caso de error
        error_trace = traceback.format_exc()
        logger.error(f"Error en conversión: {str(e)}\n{error_trace}")
        if input_path.exists():
            input_path.unlink()
        if output_path.exists():
            output_path.unlink()
        raise HTTPException(status_code=500, detail=f"Error en la conversión: {str(e)}")

async def convert_media(input_path: Path, output_path: Path, output_format: str):
    """Convierte archivos de audio/video usando FFmpeg"""
    cmd = [
        "ffmpeg",
        "-i", str(input_path),
        "-y",  # Sobrescribir archivo de salida
        str(output_path)
    ]
    
    # Ajustes específicos para audio
    if output_format in AUDIO_FORMATS:
        if output_format == "mp3":
            cmd.insert(-1, "-codec:a")
            cmd.insert(-1, "libmp3lame")
            cmd.insert(-1, "-b:a")
            cmd.insert(-1, "192k")
        elif output_format == "wav":
            cmd.insert(-1, "-codec:a")
            cmd.insert(-1, "pcm_s16le")
    
    process = subprocess.run(
        cmd,
        capture_output=True,
        text=True
    )
    
    if process.returncode != 0:
        raise Exception(f"FFmpeg error: {process.stderr}")

async def convert_image(input_path: Path, output_path: Path, output_format: str):
    """Convierte imágenes usando Pillow"""
    from PIL import Image
    
    img = Image.open(input_path)
    
    # Convertir RGBA a RGB si es necesario (para formatos que no soportan transparencia)
    if output_format in ["jpg", "jpeg"] and img.mode == "RGBA":
        rgb_img = Image.new("RGB", img.size, (255, 255, 255))
        rgb_img.paste(img, mask=img.split()[3])
        img = rgb_img
    
    # Guardar en el nuevo formato
    img.save(output_path, format=output_format.upper() if output_format.upper() != "JPG" else "JPEG")

def extract_text_from_pdf(pdf_path: Path) -> str:
    """Extrae texto de un archivo PDF"""
    try:
        import PyPDF2
        text_content = []
        
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            
            if len(pdf_reader.pages) == 0:
                raise HTTPException(
                    status_code=400,
                    detail="El archivo PDF está vacío o no tiene páginas"
                )
            
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text = page.extract_text()
                if text.strip():
                    text_content.append(text)
        
        if not text_content:
            raise HTTPException(
                status_code=400,
                detail="El archivo PDF no contiene texto extraíble. Puede ser un PDF escaneado (imagen) o estar protegido."
            )
        
        return "\n\n".join(text_content)
    
    except HTTPException:
        raise
    except ImportError:
        raise HTTPException(
            status_code=500,
            detail="PyPDF2 no está instalado. Ejecuta: pip install PyPDF2"
        )
    except Exception as e:
        logger.error(f"Error extrayendo texto de PDF: {str(e)}\n{traceback.format_exc()}")
        raise HTTPException(
            status_code=500,
            detail=f"Error al leer archivo PDF: {str(e)}"
        )

async def convert_document(input_path: Path, output_path: Path, output_format: str):
    """Convierte documentos con manejo robusto de errores"""
    input_ext = input_path.suffix.lower()
    
    # Lista de encodings a probar
    encodings = ['utf-8', 'latin-1', 'cp1252', 'iso-8859-1', 'windows-1252']
    
    try:
        if output_format == "txt":
            # Conversión a texto plano
            if input_ext == ".pdf":
                try:
                    text_content = extract_text_from_pdf(input_path)
                    async with aiofiles.open(output_path, 'w', encoding='utf-8') as f:
                        await f.write(text_content)
                except HTTPException:
                    raise
                except Exception as e:
                    logger.error(f"Error convirtiendo PDF a TXT: {str(e)}")
                    raise HTTPException(
                        status_code=500,
                        detail=f"Error al convertir PDF a TXT: {str(e)}"
                    )
            elif input_ext in [".docx"]:
                try:
                    from docx import Document
                    doc = Document(input_path)
                    text = "\n".join([para.text for para in doc.paragraphs])
                    async with aiofiles.open(output_path, 'w', encoding='utf-8') as f:
                        await f.write(text)
                except Exception as e:
                    logger.error(f"Error leyendo DOCX: {str(e)}")
                    raise HTTPException(
                        status_code=500,
                        detail=f"Error al leer archivo DOCX: {str(e)}"
                    )
            elif input_ext in [".html", ".htm"]:
                # Convertir HTML a texto plano (básico)
                try:
                    import html
                    async with aiofiles.open(input_path, 'r', encoding='utf-8') as f:
                        html_content = await f.read()
                    # Remover tags HTML básicos
                    text = html.unescape(html_content)
                    # Remover tags HTML simples (muy básico)
                    import re
                    text = re.sub(r'<[^>]+>', '', text)
                    async with aiofiles.open(output_path, 'w', encoding='utf-8') as f:
                        await f.write(text)
                except Exception as e:
                    # Si falla, intentar como texto plano
                    for encoding in encodings:
                        try:
                            async with aiofiles.open(input_path, 'r', encoding=encoding) as f:
                                content = await f.read()
                            async with aiofiles.open(output_path, 'w', encoding='utf-8') as f:
                                await f.write(content)
                            break
                        except:
                            continue
                    else:
                        raise HTTPException(status_code=500, detail="Error al leer el archivo")
            else:
                # Leer como texto plano con múltiples encodings
                content = None
                for encoding in encodings:
                    try:
                        async with aiofiles.open(input_path, 'r', encoding=encoding) as f:
                            content = await f.read()
                        break
                    except (UnicodeDecodeError, UnicodeError):
                        continue
                    except Exception as e:
                        logger.error(f"Error leyendo archivo con encoding {encoding}: {str(e)}")
                        continue
                
                if content is None:
                    raise HTTPException(
                        status_code=500,
                        detail="No se pudo leer el archivo con ningún encoding compatible"
                    )
                
                async with aiofiles.open(output_path, 'w', encoding='utf-8') as f:
                    await f.write(content)
        
        elif output_format == "html":
            # Conversión a HTML
            if input_ext == ".pdf":
                try:
                    text_content = extract_text_from_pdf(input_path)
                    # Escapar HTML
                    import html
                    escaped_text = html.escape(text_content)
                    # Convertir saltos de línea a <br>
                    escaped_text = escaped_text.replace('\n', '<br>\n')
                    html_content = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Documento Convertido</title>
</head>
<body>
    <pre>{escaped_text}</pre>
</body>
</html>"""
                    async with aiofiles.open(output_path, 'w', encoding='utf-8') as f:
                        await f.write(html_content)
                except HTTPException:
                    raise
                except Exception as e:
                    logger.error(f"Error convirtiendo PDF a HTML: {str(e)}")
                    raise HTTPException(
                        status_code=500,
                        detail=f"Error al convertir PDF a HTML: {str(e)}"
                    )
            elif input_ext in [".docx"]:
                try:
                    from docx import Document
                    doc = Document(input_path)
                    text = "\n".join([para.text for para in doc.paragraphs])
                    # Escapar HTML
                    import html
                    text = html.escape(text)
                    # Convertir saltos de línea a <br>
                    text = text.replace('\n', '<br>\n')
                    html_content = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Documento Convertido</title>
</head>
<body>
    <pre>{text}</pre>
</body>
</html>"""
                    async with aiofiles.open(output_path, 'w', encoding='utf-8') as f:
                        await f.write(html_content)
                except Exception as e:
                    logger.error(f"Error convirtiendo DOCX a HTML: {str(e)}")
                    raise HTTPException(
                        status_code=500,
                        detail=f"Error al convertir DOCX a HTML: {str(e)}"
                    )
            else:
                # Leer archivo y envolver en HTML
                content = None
                for encoding in encodings:
                    try:
                        async with aiofiles.open(input_path, 'r', encoding=encoding) as f:
                            content = await f.read()
                        break
                    except (UnicodeDecodeError, UnicodeError):
                        continue
                    except Exception as e:
                        logger.error(f"Error leyendo archivo: {str(e)}")
                        continue
                
                if content is None:
                    raise HTTPException(
                        status_code=500,
                        detail="No se pudo leer el archivo con ningún encoding compatible"
                    )
                
                # Escapar HTML
                import html
                escaped_content = html.escape(content)
                html_content = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Documento Convertido</title>
</head>
<body>
    <pre>{escaped_content}</pre>
</body>
</html>"""
                async with aiofiles.open(output_path, 'w', encoding='utf-8') as f:
                    await f.write(html_content)
        
        elif output_format == "md":
            # Conversión a Markdown
            if input_ext == ".pdf":
                try:
                    text_content = extract_text_from_pdf(input_path)
                    async with aiofiles.open(output_path, 'w', encoding='utf-8') as f:
                        await f.write(text_content)
                except HTTPException:
                    raise
                except Exception as e:
                    logger.error(f"Error convirtiendo PDF a MD: {str(e)}")
                    raise HTTPException(
                        status_code=500,
                        detail=f"Error al convertir PDF a Markdown: {str(e)}"
                    )
            elif input_ext in [".docx"]:
                try:
                    from docx import Document
                    doc = Document(input_path)
                    text = "\n".join([para.text for para in doc.paragraphs])
                    async with aiofiles.open(output_path, 'w', encoding='utf-8') as f:
                        await f.write(text)
                except Exception as e:
                    logger.error(f"Error convirtiendo DOCX a MD: {str(e)}")
                    raise HTTPException(
                        status_code=500,
                        detail=f"Error al convertir DOCX a Markdown: {str(e)}"
                    )
            else:
                # Leer como texto y guardar como MD
                content = None
                for encoding in encodings:
                    try:
                        async with aiofiles.open(input_path, 'r', encoding=encoding) as f:
                            content = await f.read()
                        break
                    except (UnicodeDecodeError, UnicodeError):
                        continue
                
                if content is None:
                    raise HTTPException(
                        status_code=500,
                        detail="No se pudo leer el archivo con ningún encoding compatible"
                    )
                
                async with aiofiles.open(output_path, 'w', encoding='utf-8') as f:
                    await f.write(content)
        
        elif output_format == "pdf":
            # Conversión a PDF
            try:
                from reportlab.lib.pagesizes import letter, A4
                from reportlab.pdfgen import canvas
                from reportlab.lib.units import inch
                
                # Leer contenido del archivo
                text_content = ""
                
                if input_ext in [".docx"]:
                    try:
                        from docx import Document
                        doc = Document(input_path)
                        text_content = "\n".join([para.text for para in doc.paragraphs])
                    except Exception as e:
                        logger.error(f"Error leyendo DOCX para PDF: {str(e)}")
                        raise HTTPException(
                            status_code=500,
                            detail=f"Error al leer archivo DOCX: {str(e)}"
                        )
                elif input_ext == ".pdf":
                    raise HTTPException(
                        status_code=400,
                        detail="El archivo ya es un PDF. No es necesario convertirlo."
                    )
                else:
                    # Leer como texto
                    content = None
                    for encoding in encodings:
                        try:
                            async with aiofiles.open(input_path, 'r', encoding=encoding) as f:
                                content = await f.read()
                            break
                        except (UnicodeDecodeError, UnicodeError):
                            continue
                    
                    if content is None:
                        raise HTTPException(
                            status_code=500,
                            detail="No se pudo leer el archivo con ningún encoding compatible"
                        )
                    text_content = content
                
                # Crear PDF
                c = canvas.Canvas(str(output_path), pagesize=A4)
                width, height = A4
                
                # Configuración de texto
                y_position = height - 50
                line_height = 14
                margin = 50
                max_width = width - (2 * margin)
                
                # Dividir texto en líneas que quepan en la página
                lines = text_content.split('\n')
                for line in lines:
                    # Si la línea es muy larga, dividirla
                    words = line.split(' ')
                    current_line = ""
                    
                    for word in words:
                        test_line = current_line + (" " if current_line else "") + word
                        text_width = c.stringWidth(test_line, "Helvetica", 10)
                        
                        if text_width > max_width and current_line:
                            # Dibujar línea actual
                            c.drawString(margin, y_position, current_line)
                            y_position -= line_height
                            current_line = word
                            
                            # Nueva página si es necesario
                            if y_position < margin:
                                c.showPage()
                                y_position = height - 50
                        else:
                            current_line = test_line
                    
                    # Dibujar última línea
                    if current_line:
                        c.drawString(margin, y_position, current_line)
                        y_position -= line_height
                    
                    # Nueva página si es necesario
                    if y_position < margin:
                        c.showPage()
                        y_position = height - 50
                
                c.save()
                
            except ImportError:
                raise HTTPException(
                    status_code=500,
                    detail="Librería reportlab no está instalada. Ejecuta: pip install reportlab"
                )
            except Exception as e:
                logger.error(f"Error creando PDF: {str(e)}\n{traceback.format_exc()}")
                raise HTTPException(
                    status_code=500,
                    detail=f"Error al crear PDF: {str(e)}"
                )
        
        elif output_format == "docx":
            # Conversión a DOCX
            try:
                from docx import Document
                
                # Leer contenido del archivo
                text_content = ""
                
                if input_ext in [".docx"]:
                    raise HTTPException(
                        status_code=400,
                        detail="El archivo ya es un DOCX. No es necesario convertirlo."
                    )
                elif input_ext == ".pdf":
                    try:
                        text_content = extract_text_from_pdf(input_path)
                    except HTTPException:
                        raise
                    except Exception as e:
                        logger.error(f"Error leyendo PDF para DOCX: {str(e)}")
                        raise HTTPException(
                            status_code=500,
                            detail=f"Error al leer archivo PDF: {str(e)}"
                        )
                else:
                    # Leer como texto
                    content = None
                    for encoding in encodings:
                        try:
                            async with aiofiles.open(input_path, 'r', encoding=encoding) as f:
                                content = await f.read()
                            break
                        except (UnicodeDecodeError, UnicodeError):
                            continue
                    
                    if content is None:
                        raise HTTPException(
                            status_code=500,
                            detail="No se pudo leer el archivo con ningún encoding compatible"
                        )
                    text_content = content
                
                # Crear documento DOCX
                doc = Document()
                
                # Dividir en párrafos (por líneas vacías o saltos de línea)
                paragraphs = text_content.split('\n\n')
                for para_text in paragraphs:
                    if para_text.strip():
                        # Dividir líneas largas
                        lines = para_text.split('\n')
                        for line in lines:
                            if line.strip():
                                doc.add_paragraph(line.strip())
                        # Agregar espacio entre párrafos
                        if para_text != paragraphs[-1]:
                            doc.add_paragraph()
                
                # Guardar documento
                doc.save(str(output_path))
                
            except Exception as e:
                logger.error(f"Error creando DOCX: {str(e)}\n{traceback.format_exc()}")
                raise HTTPException(
                    status_code=500,
                    detail=f"Error al crear DOCX: {str(e)}"
                )
        
        else:
            raise HTTPException(
                status_code=400, 
                detail=f"Conversión de documentos a {output_format} no está implementada aún. Formatos disponibles: txt, html, md, pdf, docx"
            )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error en convert_document: {str(e)}\n{traceback.format_exc()}")
        raise HTTPException(
            status_code=500,
            detail=f"Error al convertir documento: {str(e)}"
        )

@app.get("/download/{filename}")
async def download_file(filename: str):
    """Descarga el archivo convertido"""
    file_path = OUTPUT_DIR / filename
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Archivo no encontrado")
    
    return FileResponse(
        file_path,
        media_type="application/octet-stream",
        filename=filename
    )

@app.delete("/cleanup/{filename}")
async def cleanup_file(filename: str):
    """Elimina archivos temporales"""
    upload_file = UPLOAD_DIR / filename
    output_file = OUTPUT_DIR / filename
    
    if upload_file.exists():
        upload_file.unlink()
    if output_file.exists():
        output_file.unlink()
    
    return {"success": True, "message": "Archivos eliminados"}

if __name__ == "__main__":
    import uvicorn
    local_ip = get_local_ip()
    print("\n" + "="*60)
    print("🚀 Convertidor de Archivos - Servidor iniciado")
    print("="*60)
    print(f"📍 Acceso local:    http://localhost:8000")
    print(f"🌐 Acceso en red:    http://{local_ip}:8000")
    print(f"📚 Documentación:    http://localhost:8000/docs")
    print("="*60 + "\n")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")

