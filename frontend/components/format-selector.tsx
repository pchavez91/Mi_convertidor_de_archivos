"use client"

import { useState, useRef, useEffect } from "react"
import { Check, ChevronDown, Music, ImageIcon, FileText } from "lucide-react"
import { SUPPORTED_FORMATS, type FileCategory } from "@/lib/file-converter"

interface FormatSelectorProps {
  category: FileCategory
  selectedFormat: string | null
  onSelect: (format: string) => void
  currentExtension: string
}

export function FormatSelector({ category, selectedFormat, onSelect, currentExtension }: FormatSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const formats = SUPPORTED_FORMATS[category]

  const categoryLabels: Record<FileCategory, string> = {
    audio: "Audio",
    image: "Imagen",
    document: "Documento",
  }

  const categoryIcons: Record<FileCategory, typeof Music> = {
    audio: Music,
    image: ImageIcon,
    document: FileText,
  }

  const categoryColors: Record<FileCategory, { bg: string; border: string; text: string; icon: string }> = {
    audio: { bg: "bg-indigo-600/20", border: "border-indigo-400/50", text: "text-indigo-300", icon: "text-indigo-400" },
    image: {
      bg: "bg-emerald-600/20",
      border: "border-emerald-400/50",
      text: "text-emerald-300",
      icon: "text-emerald-400",
    },
    document: { bg: "bg-amber-600/20", border: "border-amber-400/50", text: "text-amber-300", icon: "text-amber-400" },
  }

  const colors = categoryColors[category]
  const Icon = categoryIcons[category]
  const selectedFormatData = formats.find((f) => f.extension === selectedFormat)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="w-full" ref={dropdownRef}>
      <p className="text-sm text-white/70 mb-3">
        Selecciona el formato de salida para tu {categoryLabels[category].toLowerCase()}:
      </p>

      {/* Dropdown trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200
          ${isOpen ? `${colors.border} ${colors.bg}` : "border-white/20 bg-white/5 hover:border-white/40"}
        `}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${colors.bg}`}>
            <Icon className={`w-5 h-5 ${colors.icon}`} />
          </div>
          {selectedFormat ? (
            <div className="text-left">
              <span className={`font-bold ${colors.text}`}>.{selectedFormat.toUpperCase()}</span>
              <span className="text-white/50 text-sm ml-2">{selectedFormatData?.description}</span>
            </div>
          ) : (
            <span className="text-white/60">Selecciona un formato...</span>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-white/60 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="mt-2 p-2 rounded-xl bg-zinc-900 border border-white/20 shadow-xl max-h-64 overflow-y-auto">
          {formats.map((format) => {
            const isSelected = selectedFormat === format.extension
            const isCurrent = currentExtension === format.extension

            return (
              <button
                key={format.extension}
                onClick={() => {
                  if (!isCurrent) {
                    onSelect(format.extension)
                    setIsOpen(false)
                  }
                }}
                disabled={isCurrent}
                className={`
                  w-full flex items-center justify-between p-3 rounded-lg transition-all
                  ${
                    isCurrent
                      ? "opacity-50 cursor-not-allowed"
                      : isSelected
                        ? `${colors.bg} ${colors.border} border`
                        : "hover:bg-white/10"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-bold ${isSelected ? colors.text : "text-white"}`}>
                    .{format.extension.toUpperCase()}
                  </span>
                  <span className="text-sm text-white/50">{format.description}</span>
                  {isCurrent && <span className="text-xs text-white/40">(actual)</span>}
                </div>
                {isSelected && <Check className={`w-4 h-4 ${colors.text}`} />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
