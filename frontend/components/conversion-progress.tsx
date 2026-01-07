"use client"

import { useEffect, useState } from "react"
import { Loader2, CheckCircle2, Download, RotateCcw } from "lucide-react"

interface ConversionProgressProps {
  status: "idle" | "converting" | "complete" | "error"
  progress: number
  fileName: string
  targetFormat: string
  convertedBlob: Blob | null
  onDownload: () => void
  onReset: () => void
  errorMessage?: string
}

export function ConversionProgress({
  status,
  progress,
  fileName,
  targetFormat,
  convertedBlob,
  onDownload,
  onReset,
  errorMessage,
}: ConversionProgressProps) {
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(progress)
    }, 50)
    return () => clearTimeout(timer)
  }, [progress])

  const newFileName = fileName.replace(/\.[^/.]+$/, `.${targetFormat}`)

  return (
    <div className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
      {status === "converting" && (
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <Loader2 className="w-12 h-12 text-indigo-400 animate-spin" />
          </div>

          <p className="text-lg font-medium text-white mb-2">Convirtiendo archivo...</p>
          <p className="text-sm text-white/60 mb-4">
            {fileName} → {newFileName}
          </p>

          <div className="w-full max-w-md">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${displayProgress}%` }}
              />
            </div>
            <p className="text-center text-sm text-white/50 mt-2">{Math.round(displayProgress)}%</p>
          </div>
        </div>
      )}

      {status === "complete" && (
        <div className="flex flex-col items-center">
          <div className="p-3 rounded-full bg-emerald-600/20 border border-emerald-400/30 mb-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>

          <p className="text-lg font-medium text-white mb-2">¡Conversión completada!</p>
          <p className="text-sm text-white/60 mb-6">Tu archivo está listo para descargar</p>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <button
              onClick={onDownload}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-dashed border-indigo-400 bg-transparent hover:bg-indigo-600/10 text-indigo-300 font-medium transition-colors"
            >
              <Download className="w-5 h-5" />
              Descargar
            </button>

            <button
              onClick={onReset}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 text-white/80 font-medium transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              Nuevo archivo
            </button>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center">
          <div className="p-3 rounded-full bg-red-600/20 border border-red-400/30 mb-4">
            <span className="text-3xl">⚠️</span>
          </div>

          <p className="text-lg font-medium text-white mb-2">Error en la conversión</p>
          <p className="text-sm text-red-300/80 mb-6 text-center">
            {errorMessage || "Ocurrió un error al convertir el archivo. Por favor, intenta de nuevo."}
          </p>

          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Intentar de nuevo
          </button>
        </div>
      )}
    </div>
  )
}
