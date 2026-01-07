// Client-side file conversion utilities
import { API_URL } from "./api-config"

export type FileCategory = "audio" | "image" | "document"

export interface ConversionFormat {
  extension: string
  label: string
  mimeType: string
  description?: string
}

export const SUPPORTED_FORMATS: Record<FileCategory, ConversionFormat[]> = {
  audio: [
    { extension: "mp3", label: "MP3", mimeType: "audio/mpeg", description: "Más compatible" },
    { extension: "wav", label: "WAV", mimeType: "audio/wav", description: "Sin compresión" },
    { extension: "aac", label: "AAC", mimeType: "audio/aac", description: "Alta calidad" },
    { extension: "ogg", label: "OGG", mimeType: "audio/ogg", description: "Formato abierto" },
    { extension: "flac", label: "FLAC", mimeType: "audio/flac", description: "Sin pérdida" },
  ],
  image: [
    { extension: "jpg", label: "JPG", mimeType: "image/jpeg", description: "Fotografías" },
    { extension: "png", label: "PNG", mimeType: "image/png", description: "Con transparencia" },
    { extension: "webp", label: "WEBP", mimeType: "image/webp", description: "Optimizado web" },
    { extension: "gif", label: "GIF", mimeType: "image/gif", description: "Animaciones" },
    { extension: "bmp", label: "BMP", mimeType: "image/bmp", description: "Sin compresión" },
  ],
  document: [
    { extension: "pdf", label: "PDF", mimeType: "application/pdf", description: "Documento portable" },
    {
      extension: "docx",
      label: "DOCX",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      description: "Word",
    },
    { extension: "txt", label: "TXT", mimeType: "text/plain", description: "Texto plano" },
    { extension: "html", label: "HTML", mimeType: "text/html", description: "Página web" },
    { extension: "md", label: "MD", mimeType: "text/markdown", description: "Markdown" },
  ],
}

export const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

export function getFileCategory(file: File): FileCategory | null {
  const extension = file.name.split(".").pop()?.toLowerCase()

  const audioExtensions = ["mp3", "wav", "aac", "ogg", "flac"]
  const imageExtensions = ["jpg", "jpeg", "png", "webp", "gif", "bmp"]
  const documentExtensions = ["pdf", "docx", "txt", "html", "md"]

  if (audioExtensions.includes(extension || "")) return "audio"
  if (imageExtensions.includes(extension || "")) return "image"
  if (documentExtensions.includes(extension || "")) return "document"

  return null
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export async function convertImage(file: File, targetFormat: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height

      const ctx = canvas.getContext("2d")
      if (!ctx) {
        reject(new Error("No se pudo obtener el contexto del canvas"))
        return
      }

      // For formats that don't support transparency, fill with white background
      if (targetFormat === "jpg" || targetFormat === "bmp") {
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      ctx.drawImage(img, 0, 0)

      const mimeType = SUPPORTED_FORMATS.image.find((f) => f.extension === targetFormat)?.mimeType || "image/png"

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error("Error al convertir la imagen"))
          }
        },
        mimeType,
        0.92,
      )
    }

    img.onerror = () => reject(new Error("Error al cargar la imagen"))
    img.src = URL.createObjectURL(file)
  })
}

export async function convertDocument(file: File, targetFormat: string): Promise<Blob> {
  const text = await file.text()
  let content = text

  const sourceExt = file.name.split(".").pop()?.toLowerCase()

  // Convert based on target format
  if (targetFormat === "html") {
    if (sourceExt === "md") {
      // Simple markdown to HTML conversion
      content = markdownToHtml(text)
    } else {
      content = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Documento Convertido</title>
</head>
<body>
  <pre>${escapeHtml(text)}</pre>
</body>
</html>`
    }
  } else if (targetFormat === "md") {
    if (sourceExt === "html") {
      content = htmlToMarkdown(text)
    } else {
      content = text
    }
  } else if (targetFormat === "txt") {
    if (sourceExt === "html") {
      content = stripHtml(text)
    } else if (sourceExt === "md") {
      content = stripMarkdown(text)
    }
  }

  const mimeType = SUPPORTED_FORMATS.document.find((f) => f.extension === targetFormat)?.mimeType || "text/plain"
  return new Blob([content], { type: mimeType })
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function markdownToHtml(md: string): string {
  const html = md
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*)\*/gim, "<em>$1</em>")
    .replace(/\n/gim, "<br>")

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Documento Convertido</title>
</head>
<body>
  ${html}
</body>
</html>`
}

function htmlToMarkdown(html: string): string {
  return html
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n")
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n")
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n")
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
    .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
    .replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .trim()
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim()
}

function stripMarkdown(md: string): string {
  return md
    .replace(/^#+\s*/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/\[(.*?)\]$$.*?$$/g, "$1")
    .trim()
}

// Convert audio using backend API
export async function convertAudio(
  file: File,
  targetFormat: string,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('output_format', targetFormat)

  try {
    const response = await fetch(`${API_URL}/convert`, {
      method: 'POST',
      body: formData,
      // Note: We can't track upload progress with fetch, but we can simulate it
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Error desconocido' }))
      throw new Error(errorData.detail || `Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    
    if (!data.download_url) {
      throw new Error('No se recibió URL de descarga')
    }

    // Download the converted file
    const downloadResponse = await fetch(`${API_URL}${data.download_url}`)
    
    if (!downloadResponse.ok) {
      throw new Error(`Error al descargar el archivo convertido: ${downloadResponse.status}`)
    }

    const blob = await downloadResponse.blob()
    
    if (blob.size === 0) {
      throw new Error('El archivo descargado está vacío')
    }

    return blob
  } catch (error) {
    if (error instanceof Error) {
      // Handle network errors
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error(
          `Error de conexión: No se pudo conectar al servidor en ${API_URL}.\n\n` +
          `Por favor verifica:\n` +
          `1. Que el backend esté corriendo\n` +
          `2. Que el servidor esté escuchando en el puerto 8000\n` +
          `3. Que no haya un firewall bloqueando la conexión`
        )
      }
      throw error
    }
    throw new Error('Error desconocido al convertir el archivo de audio')
  }
}

// Universal convert function that routes to appropriate converter
export async function convertFile(
  file: File,
  category: FileCategory,
  targetFormat: string,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  if (category === "audio") {
    return convertAudio(file, targetFormat, onProgress)
  } else if (category === "image") {
    return convertImage(file, targetFormat)
  } else if (category === "document") {
    return convertDocument(file, targetFormat)
  } else {
    throw new Error(`Categoría de archivo no soportada: ${category}`)
  }
}
