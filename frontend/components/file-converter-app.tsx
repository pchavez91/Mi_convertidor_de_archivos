"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { FileAudio, FileImage, FileText, X } from "lucide-react"
import { FileUpload } from "./file-upload"
import { FormatSelector } from "./format-selector"
import { ConversionProgress } from "./conversion-progress"
import { TutorialDialog } from "./tutorial-dialog"
import {
  type FileCategory,
  formatFileSize,
  convertFile,
  SUPPORTED_FORMATS,
} from "@/lib/file-converter"

interface SelectedFile {
  file: File
  category: FileCategory
}

interface FileConverterAppProps {
  preSelectedFormat?: string | null
  preSelectedCategory?: FileCategory | null
  onClearPreSelection?: () => void
}

export function FileConverterApp({
  preSelectedFormat,
  preSelectedCategory,
  onClearPreSelection,
}: FileConverterAppProps) {
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null)
  const [targetFormat, setTargetFormat] = useState<string | null>(null)
  const [conversionStatus, setConversionStatus] = useState<"idle" | "converting" | "complete" | "error">("idle")
  const [progress, setProgress] = useState(0)
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [showFormatDropdown, setShowFormatDropdown] = useState(false)

  const cardRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (preSelectedFormat && preSelectedCategory && !selectedFile) {
      // Format is pre-selected, will be used when file is uploaded
    }
  }, [preSelectedFormat, preSelectedCategory, selectedFile])

  const handleFileSelect = useCallback(
    (file: File, category: FileCategory) => {
      setSelectedFile({ file, category })
      // If pre-selected format matches category, use it
      if (preSelectedCategory === category && preSelectedFormat) {
        setTargetFormat(preSelectedFormat)
      } else {
        setTargetFormat(null)
      }
      setConversionStatus("idle")
      setConvertedBlob(null)
      setErrorMessage("")
    },
    [preSelectedCategory, preSelectedFormat],
  )

  const handleReset = useCallback(() => {
    setSelectedFile(null)
    setTargetFormat(null)
    setConversionStatus("idle")
    setProgress(0)
    setConvertedBlob(null)
    setErrorMessage("")
    onClearPreSelection?.()
  }, [onClearPreSelection])

  const handleConvert = useCallback(async () => {
    if (!selectedFile || !targetFormat) return

    setConversionStatus("converting")
    setProgress(0)

    let progressInterval: NodeJS.Timeout | null = null

    try {
      // Simular progreso más realista según el tipo de archivo
      const isAudio = selectedFile.category === "audio"
      
      if (isAudio) {
        // Para audio: progreso más lento y gradual (conversiones más largas)
        progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 85) {
              return prev
            }
            return Math.min(prev + 0.5, 85) // Incremento más lento
          })
        }, 500)
      } else {
        // Para otros archivos: progreso más rápido
        progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval!)
              return prev
            }
            return prev + Math.random() * 15
          })
        }, 200)
      }

      // Usar la función universal de conversión
      const result = await convertFile(
        selectedFile.file,
        selectedFile.category,
        targetFormat,
        (progress) => {
          // Si el backend proporciona progreso, usarlo
          if (progress > 0) {
            setProgress(progress)
          }
        }
      )

      if (progressInterval) {
        clearInterval(progressInterval)
      }
      setProgress(100)
      setConvertedBlob(result)
      setConversionStatus("complete")
    } catch (error) {
      if (progressInterval) {
        clearInterval(progressInterval)
      }
      setConversionStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Error desconocido")
    }
  }, [selectedFile, targetFormat])

  const handleDownload = useCallback(() => {
    if (!convertedBlob || !selectedFile) return

    const url = URL.createObjectURL(convertedBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = selectedFile.file.name.replace(/\.[^/.]+$/, `.${targetFormat}`)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [convertedBlob, selectedFile, targetFormat])

  const categoryIcons: Record<FileCategory, typeof FileAudio> = {
    audio: FileAudio,
    image: FileImage,
    document: FileText,
  }

  const categoryColors: Record<FileCategory, string> = {
    audio: "text-indigo-300",
    image: "text-emerald-300",
    document: "text-amber-300",
  }

  const categoryBgColors: Record<FileCategory, { bg: string; border: string; text: string }> = {
    audio: { bg: "bg-indigo-600/20", border: "border-indigo-400/50", text: "text-indigo-300" },
    image: { bg: "bg-emerald-600/20", border: "border-emerald-400/50", text: "text-emerald-300" },
    document: { bg: "bg-amber-600/20", border: "border-amber-400/50", text: "text-amber-300" },
  }

  const currentExtension = selectedFile?.file.name.split(".").pop()?.toLowerCase() || ""

  const allFormats = [
    ...SUPPORTED_FORMATS.audio.map((f) => ({ ...f, category: "audio" as FileCategory })),
    ...SUPPORTED_FORMATS.image.map((f) => ({ ...f, category: "image" as FileCategory })),
    ...SUPPORTED_FORMATS.document.map((f) => ({ ...f, category: "document" as FileCategory })),
  ]

  const handlePreSelectFormat = (format: string, category: FileCategory) => {
    // This is for the internal dropdown, but we now primarily use the Hero popups
    setShowFormatDropdown(false)
  }

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 max-h-[80vh]"
    >
      {/* Header */}
      <div className="mb-4 text-center">
        <h1 className="text-balance text-xl sm:text-2xl md:text-3xl tracking-tight text-indigo-50 font-bold">
          Convertidor de Archivos Online Gratis
        </h1>
        <p className="mt-1.5 text-sm text-indigo-100/70">
          Convierte audio, imágenes y documentos de forma segura y privada.
        </p>
      </div>

      {/* Main content */}
      {!selectedFile ? (
        <div className="space-y-4">
          {preSelectedFormat && preSelectedCategory && (
            <div
              className={`flex items-center justify-between p-3 rounded-xl ${categoryBgColors[preSelectedCategory].bg} border ${categoryBgColors[preSelectedCategory].border}`}
            >
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = categoryIcons[preSelectedCategory]
                  return <Icon className={`w-5 h-5 ${categoryColors[preSelectedCategory]}`} />
                })()}
                <div>
                  <span className="text-white/60 text-sm">Formato de salida: </span>
                  <span className={`font-bold ${categoryBgColors[preSelectedCategory].text}`}>
                    .{preSelectedFormat.toUpperCase()}
                  </span>
                </div>
              </div>
              <button
                onClick={onClearPreSelection}
                className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* File upload - simplified */}
          <div>
            {!preSelectedFormat && (
              <p className="text-sm text-white/70 mb-2">Selecciona un formato arriba o sube tu archivo:</p>
            )}
            <FileUpload onFileSelect={handleFileSelect} />
          </div>

          {/* Tutorial button - centered below file upload */}
          <div className="flex justify-center mt-4">
            <TutorialDialog />
          </div>
        </div>
      ) : conversionStatus === "converting" || conversionStatus === "complete" || conversionStatus === "error" ? (
        <ConversionProgress
          status={conversionStatus}
          progress={progress}
          fileName={selectedFile.file.name}
          targetFormat={targetFormat || ""}
          convertedBlob={convertedBlob}
          onDownload={handleDownload}
          onReset={handleReset}
          errorMessage={errorMessage}
        />
      ) : (
        <div className="space-y-4">
          {/* Selected file info */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-4">
              {(() => {
                const Icon = categoryIcons[selectedFile.category]
                return <Icon className={`w-8 h-8 ${categoryColors[selectedFile.category]}`} />
              })()}
              <div>
                <p className="text-white font-medium truncate max-w-[200px] sm:max-w-none">{selectedFile.file.name}</p>
                <p className="text-sm text-white/50">{formatFileSize(selectedFile.file.size)}</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Format selector */}
          <FormatSelector
            category={selectedFile.category}
            selectedFormat={targetFormat}
            onSelect={setTargetFormat}
            currentExtension={currentExtension}
          />

          {/* Convert button */}
          <button
            onClick={handleConvert}
            disabled={!targetFormat}
            className={`
              w-full py-3 rounded-xl font-semibold text-base transition-all duration-300
              ${
                targetFormat
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25"
                  : "bg-white/10 text-white/40 cursor-not-allowed"
              }
            `}
          >
            {targetFormat ? `Convertir a .${targetFormat.toUpperCase()}` : "Selecciona un formato"}
          </button>
        </div>
      )}
    </div>
  )
}
