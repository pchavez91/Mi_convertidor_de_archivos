"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Upload, AlertCircle } from "lucide-react"
import { getFileCategory, formatFileSize, MAX_FILE_SIZE, type FileCategory } from "@/lib/file-converter"

interface FileUploadProps {
  onFileSelect: (file: File, category: FileCategory) => void
  disabled?: boolean
}

export function FileUpload({ onFileSelect, disabled }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateAndProcessFile = useCallback(
    (file: File) => {
      setError(null)

      if (file.size > MAX_FILE_SIZE) {
        setError(`El archivo excede el límite de 50 MB. Tamaño actual: ${formatFileSize(file.size)}`)
        return
      }

      const category = getFileCategory(file)
      if (!category) {
        setError("Formato de archivo no soportado. Por favor, sube un archivo de audio, imagen o documento válido.")
        return
      }

      onFileSelect(file, category)
    },
    [onFileSelect],
  )

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) setIsDragging(true)
    },
    [disabled],
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      if (disabled) return

      const files = e.dataTransfer.files
      if (files.length > 0) {
        validateAndProcessFile(files[0])
      }
    },
    [disabled, validateAndProcessFile],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        validateAndProcessFile(files[0])
      }
      e.target.value = ""
    },
    [validateAndProcessFile],
  )

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative flex flex-col items-center justify-center
          w-full py-8 px-6
          border-2 border-dashed rounded-xl
          transition-all duration-300 ease-out
          ${
            isDragging
              ? "border-indigo-400 bg-indigo-600/20 scale-[1.01]"
              : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <input
          type="file"
          onChange={handleFileInput}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          accept=".mp3,.wav,.aac,.ogg,.flac,.jpg,.jpeg,.png,.webp,.gif,.bmp,.pdf,.docx,.txt,.html,.md"
        />

        <div
          className={`
          p-3 rounded-full mb-3
          ${isDragging ? "bg-indigo-600/30" : "bg-white/10"}
          transition-colors duration-300
        `}
        >
          <Upload className={`w-6 h-6 ${isDragging ? "text-indigo-300" : "text-white/70"}`} />
        </div>

        <p className="text-base font-medium text-white mb-1">
          {isDragging ? "Suelta el archivo aquí" : "Arrastra y suelta tu archivo"}
        </p>
        <p className="text-sm text-white/60">o haz clic para seleccionar</p>

        <p className="mt-3 text-xs text-white/40">Máximo 50 MB por archivo</p>
      </div>

      {error && (
        <div className="mt-3 flex items-start gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-red-300">{error}</p>
            <button onClick={() => setError(null)} className="mt-2 text-xs text-red-400 hover:text-red-300 underline">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
