"use client"

import { X, Check } from "lucide-react"
import type { FileCategory } from "@/lib/file-converter"

interface FileTypePopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  formats: { ext: string; name: string }[]
  color: string
  onSelectFormat?: (format: string, category: FileCategory) => void
  category?: FileCategory
  selectedFormat?: string | null
}

const colorClasses: Record<string, { bg: string; border: string; text: string; hover: string; selected: string }> = {
  indigo: {
    bg: "bg-indigo-600/20",
    border: "border-indigo-400/30",
    text: "text-indigo-300",
    hover: "hover:bg-indigo-600/30",
    selected: "ring-2 ring-indigo-400",
  },
  emerald: {
    bg: "bg-emerald-600/20",
    border: "border-emerald-400/30",
    text: "text-emerald-300",
    hover: "hover:bg-emerald-600/30",
    selected: "ring-2 ring-emerald-400",
  },
  amber: {
    bg: "bg-amber-600/20",
    border: "border-amber-400/30",
    text: "text-amber-300",
    hover: "hover:bg-amber-600/30",
    selected: "ring-2 ring-amber-400",
  },
}

export function FileTypePopup({
  isOpen,
  onClose,
  title,
  formats,
  color,
  onSelectFormat,
  category,
  selectedFormat,
}: FileTypePopupProps) {
  if (!isOpen) return null

  const colors = colorClasses[color] || colorClasses.indigo

  const handleFormatClick = (ext: string) => {
    if (onSelectFormat && category) {
      onSelectFormat(ext.toLowerCase(), category)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative bg-zinc-900/95 border border-white/10 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        <h3 className={`text-xl font-bold mb-4 ${colors.text}`}>{title}</h3>
        <p className="text-white/60 text-sm mb-6">
          {onSelectFormat ? "Selecciona el formato de salida:" : "Formatos disponibles para conversión:"}
        </p>

        <div className="grid grid-cols-2 gap-3">
          {formats.map((format) => {
            const isSelected = selectedFormat === format.ext.toLowerCase()
            return (
              <button
                key={format.ext}
                onClick={() => handleFormatClick(format.ext)}
                className={`
                  p-3 rounded-xl ${colors.bg} ${colors.border} border ${colors.hover} 
                  transition-all cursor-pointer text-left relative
                  ${isSelected ? colors.selected : ""}
                  ${onSelectFormat ? "hover:scale-[1.02]" : ""}
                `}
              >
                <span className={`font-mono font-bold ${colors.text}`}>.{format.ext}</span>
                <p className="text-white/50 text-xs mt-1">{format.name}</p>
                {isSelected && <Check className={`absolute top-2 right-2 w-4 h-4 ${colors.text}`} />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
