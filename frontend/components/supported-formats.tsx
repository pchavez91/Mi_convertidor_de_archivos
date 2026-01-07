"use client"

import { FileAudio, FileImage, FileText } from "lucide-react"

const formatCategories = [
  {
    icon: FileAudio,
    title: "Audio",
    description: "Convierte entre formatos de audio populares",
    formats: [
      { name: "MP3", desc: "Formato universal de audio comprimido" },
      { name: "WAV", desc: "Audio sin comprimir, alta calidad" },
      { name: "AAC", desc: "Audio avanzado, mejor que MP3" },
      { name: "OGG", desc: "Formato libre y abierto" },
      { name: "FLAC", desc: "Sin pérdida, calidad perfecta" },
    ],
    color: "indigo",
  },
  {
    icon: FileImage,
    title: "Imágenes",
    description: "Transforma imágenes entre diferentes formatos",
    formats: [
      { name: "JPG", desc: "Ideal para fotografías" },
      { name: "PNG", desc: "Soporta transparencia" },
      { name: "WEBP", desc: "Moderno, muy comprimido" },
      { name: "GIF", desc: "Animaciones e imágenes simples" },
      { name: "BMP", desc: "Formato sin comprimir" },
    ],
    color: "emerald",
  },
  {
    icon: FileText,
    title: "Documentos",
    description: "Convierte documentos de texto",
    formats: [
      { name: "PDF", desc: "Documento portátil (solo lectura)" },
      { name: "DOCX", desc: "Microsoft Word (solo lectura)" },
      { name: "TXT", desc: "Texto plano universal" },
      { name: "HTML", desc: "Páginas web" },
      { name: "MD", desc: "Markdown para documentación" },
    ],
    color: "amber",
  },
]

const colorClasses: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  indigo: {
    bg: "bg-indigo-600/20",
    border: "border-indigo-400/30",
    text: "text-indigo-300",
    badge: "bg-indigo-600/30",
  },
  emerald: {
    bg: "bg-emerald-600/20",
    border: "border-emerald-400/30",
    text: "text-emerald-300",
    badge: "bg-emerald-600/30",
  },
  amber: { bg: "bg-amber-600/20", border: "border-amber-400/30", text: "text-amber-300", badge: "bg-amber-600/30" },
}

export function SupportedFormats() {
  return (
    <section id="formatos" className="py-16 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">Formatos Soportados</h2>
        <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
          Soportamos una amplia variedad de formatos para audio, imágenes y documentos.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {formatCategories.map((category, index) => {
            const colors = colorClasses[category.color]
            return (
              <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl ${colors.bg} ${colors.border} border`}>
                    <category.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                    <p className="text-xs text-white/50">{category.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {category.formats.map((format, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${colors.badge} ${colors.text}`}>
                        .{format.name}
                      </span>
                      <span className="text-sm text-white/60">{format.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
