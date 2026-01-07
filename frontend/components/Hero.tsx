"use client"

import { useRef, useState, useEffect } from "react"
import { gsap } from "gsap"
import { FileAudio, FileImage, FileText, ChevronDown } from "lucide-react"
import { FileConverterApp } from "./file-converter-app"
import { DonationsModal } from "./donations-modal"
import { FileTypePopup } from "./file-type-popup"
import type { FileCategory } from "@/lib/file-converter"

const audioFormats = [
  { ext: "MP3", name: "Audio comprimido" },
  { ext: "WAV", name: "Audio sin pérdida" },
  { ext: "AAC", name: "Audio avanzado" },
  { ext: "OGG", name: "Audio Vorbis" },
  { ext: "FLAC", name: "Sin pérdida" },
]

const imageFormats = [
  { ext: "JPG", name: "Imagen comprimida" },
  { ext: "PNG", name: "Con transparencia" },
  { ext: "WEBP", name: "Formato web" },
  { ext: "GIF", name: "Animaciones" },
  { ext: "BMP", name: "Mapa de bits" },
]

const docFormats = [
  { ext: "PDF", name: "Documento portable" },
  { ext: "DOCX", name: "Word" },
  { ext: "TXT", name: "Texto plano" },
  { ext: "HTML", name: "Página web" },
  { ext: "MD", name: "Markdown" },
]

export function Hero() {
  const tagsRef = useRef<HTMLDivElement>(null)
  const customCursorRef = useRef<HTMLDivElement>(null)
  const [showCustomCursor, setShowCustomCursor] = useState(false)
  const [showDonations, setShowDonations] = useState(false)
  const [activePopup, setActivePopup] = useState<"audio" | "image" | "doc" | null>(null)
  const [preSelectedFormat, setPreSelectedFormat] = useState<string | null>(null)
  const [preSelectedCategory, setPreSelectedCategory] = useState<FileCategory | null>(null)

  useEffect(() => {
    const tagsElement = tagsRef.current
    const cursorElement = customCursorRef.current

    if (!tagsElement || !cursorElement) return

    let cursorX = 0
    let cursorY = 0

    const handleMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX
      cursorY = e.clientY

      gsap.to(cursorElement, {
        x: cursorX - 15,
        y: cursorY - 15,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseEnter = () => {
      setShowCustomCursor(true)
    }

    const handleMouseLeave = () => {
      setShowCustomCursor(false)
    }

    tagsElement.addEventListener("mouseenter", handleMouseEnter)
    tagsElement.addEventListener("mouseleave", handleMouseLeave)
    tagsElement.addEventListener("mousemove", handleMouseMove)

    return () => {
      tagsElement.removeEventListener("mouseenter", handleMouseEnter)
      tagsElement.removeEventListener("mouseleave", handleMouseLeave)
      tagsElement.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleFormatSelect = (format: string, category: FileCategory) => {
    setPreSelectedFormat(format)
    setPreSelectedCategory(category)
  }

  return (
    <section className="p-[3%] bg-zinc-950">
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <mask id="heroMask" maskContentUnits="objectBoundingBox">
            <rect width="1" height="1" fill="black" />
            <path
              d="M0 0.1474 V0.9863 C0 0.9938 0.0038 0.9996 0.0085 0.9996 H0.9912 C0.9958 0.9996 1 0.9863 1 0.9863 V0.0581 C1 0.0506 0.9958 0.0444 0.9912 0.0444 H0.9255 C0.9208 0.0444 0.9165 0.0383 0.9165 0.0307 V0.0149 C0.9165 0.0074 0.9132 0.0013 0.9084 0.0013 L0.2060 0.0000 C0.2012 -0.0000 0.1975 0.0061 0.1975 0.0137 V0.0312 C0.1975 0.0387 0.1936 0.0448 0.1889 0.0448 H0.0915 C0.0868 0.0448 0.0830 0.0510 0.0830 0.0585 V0.1201 C0.0830 0.1276 0.0792 0.1337 0.0745 0.1337 H0.0085 C0.0038 0.1337 0 0.1399 0 0.1474 Z"
              fill="white"
            />
          </mask>
        </defs>
      </svg>

      <div className="relative isolate w-full min-h-[calc(100svh-6vh)] sm:min-h-[calc(100svh-6vh)]">
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            mask: "url(#heroMask)",
            WebkitMask: "url(#heroMask)",
          }}
        >
          <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/liquid-metal-video_yX6NvjdW-6bLYorR3Ihmlwjivg3pjA978qrSKRU.mp4" type="video/mp4" />
          </video>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/25 via-transparent to-zinc-950/45" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/45 via-zinc-950/15 to-transparent" />
            <div className="absolute inset-0 [background:radial-gradient(90%_60%_at_10%_70%,rgba(0,0,0,.55)_0%,transparent_70%)]" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center px-8 py-16 md:px-16 md:py-20 z-10">
            <div className="w-full max-w-2xl">
              <FileConverterApp
                preSelectedFormat={preSelectedFormat}
                preSelectedCategory={preSelectedCategory}
                onClearPreSelection={() => {
                  setPreSelectedFormat(null)
                  setPreSelectedCategory(null)
                }}
              />
            </div>
          </div>
        </div>

        <div ref={tagsRef} className="absolute top-[1.5%] left-1/2 -translate-x-1/2 z-20 cursor-none pb-10">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-white font-normal">Convierte</span>
            <button
              onClick={() => setActivePopup("audio")}
              className={`flex items-center gap-1 rounded-full border px-3 py-1 transition-colors cursor-pointer ${
                preSelectedCategory === "audio"
                  ? "border-indigo-400/50 bg-indigo-600/20"
                  : "border-white/30 bg-white/5 hover:bg-indigo-600/20 hover:border-indigo-400/50"
              }`}
            >
              <FileAudio className="w-3.5 h-3.5 text-indigo-300" />
              <span className="text-xs font-medium text-white">Audio</span>
            </button>
            <button
              onClick={() => setActivePopup("image")}
              className={`flex items-center gap-1 rounded-full border px-3 py-1 transition-colors cursor-pointer ${
                preSelectedCategory === "image"
                  ? "border-emerald-400/50 bg-emerald-600/20"
                  : "border-white/30 bg-white/5 hover:bg-emerald-600/20 hover:border-emerald-400/50"
              }`}
            >
              <FileImage className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-xs font-medium text-white">Imágenes</span>
            </button>
            <button
              onClick={() => setActivePopup("doc")}
              className={`flex items-center gap-1 rounded-full border px-3 py-1 transition-colors cursor-pointer ${
                preSelectedCategory === "document"
                  ? "border-amber-400/50 bg-amber-600/20"
                  : "border-white/30 bg-white/5 hover:bg-amber-600/20 hover:border-amber-400/50"
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-xs font-medium text-white">Documentos</span>
            </button>
          </div>
        </div>

        <div
          ref={customCursorRef}
          className={`fixed w-[30px] h-[30px] rounded-full bg-indigo-600 pointer-events-none z-50 transition-opacity duration-200 ${
            showCustomCursor ? "opacity-100" : "opacity-0"
          }`}
          style={{ left: 0, top: 0 }}
        />

        <div className="absolute right-[1.5%] top-[1.5%] z-20">
          <button
            onClick={() => setShowDonations(true)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 bg-indigo-600 text-white shadow-sm shadow-black/5 hover:bg-indigo-500 h-9 px-4 py-2"
          >
            Donaciones
            <ChevronDown className="-me-1 ms-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>

      <DonationsModal isOpen={showDonations} onClose={() => setShowDonations(false)} />

      <FileTypePopup
        isOpen={activePopup === "audio"}
        onClose={() => setActivePopup(null)}
        title="Formatos de Audio"
        formats={audioFormats}
        color="indigo"
        onSelectFormat={handleFormatSelect}
        category="audio"
        selectedFormat={preSelectedCategory === "audio" ? preSelectedFormat : null}
      />
      <FileTypePopup
        isOpen={activePopup === "image"}
        onClose={() => setActivePopup(null)}
        title="Formatos de Imagen"
        formats={imageFormats}
        color="emerald"
        onSelectFormat={handleFormatSelect}
        category="image"
        selectedFormat={preSelectedCategory === "image" ? preSelectedFormat : null}
      />
      <FileTypePopup
        isOpen={activePopup === "doc"}
        onClose={() => setActivePopup(null)}
        title="Formatos de Documento"
        formats={docFormats}
        color="amber"
        onSelectFormat={handleFormatSelect}
        category="document"
        selectedFormat={preSelectedCategory === "document" ? preSelectedFormat : null}
      />
    </section>
  )
}
