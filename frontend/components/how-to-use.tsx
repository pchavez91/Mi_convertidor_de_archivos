"use client"

import { Upload, Settings, Download, Shield, Linkedin } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "1. Sube tu archivo",
    description:
      "Arrastra y suelta o selecciona el archivo que deseas convertir. Soportamos audio, imágenes y documentos.",
    color: "indigo",
  },
  {
    icon: Settings,
    title: "2. Elige el formato",
    description: "Selecciona el formato de salida deseado entre las opciones disponibles para tu tipo de archivo.",
    color: "emerald",
  },
  {
    icon: Download,
    title: "3. Descarga",
    description: "Haz clic en convertir y descarga tu archivo convertido instantáneamente. ¡Así de fácil!",
    color: "amber",
  },
  {
    icon: Shield,
    title: "4. Privacidad total",
    description: "Tus archivos se procesan localmente y se eliminan automáticamente. No almacenamos nada.",
    color: "cyan",
  },
]

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  indigo: { bg: "bg-indigo-600/20", border: "border-indigo-400/30", text: "text-indigo-300" },
  emerald: { bg: "bg-emerald-600/20", border: "border-emerald-400/30", text: "text-emerald-300" },
  amber: { bg: "bg-amber-600/20", border: "border-amber-400/30", text: "text-amber-300" },
  cyan: { bg: "bg-cyan-600/20", border: "border-cyan-400/30", text: "text-cyan-300" },
}

export function HowToUse() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">¿Cómo usar el convertidor?</h2>
          <a
            href="https://www.linkedin.com/in/patricio-chavez-005b83352/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A66C2]/20 border border-[#0A66C2]/30 text-[#0A66C2] hover:bg-[#0A66C2]/30 transition-colors text-sm font-medium"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>
        <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
          Convierte tus archivos en 3 simples pasos. Sin registro, sin complicaciones.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const colors = colorClasses[step.color]
            return (
              <div
                key={index}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl ${colors.bg} ${colors.border} border mb-4`}>
                  <step.icon className={`w-6 h-6 ${colors.text}`} />
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
