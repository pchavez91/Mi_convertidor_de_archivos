"use client"

import { Upload, Settings, Download, Shield, HelpCircle } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const steps = [
  {
    icon: Upload,
    title: "1. Sube tu archivo",
    description:
      "Arrastra y suelta tu archivo en el área indicada o haz clic para seleccionarlo desde tu dispositivo. Soportamos archivos de audio, imágenes y documentos.",
    color: "indigo",
  },
  {
    icon: Settings,
    title: "2. Elige el formato",
    description:
      "Selecciona el formato de salida que necesitas. Puedes convertir entre diferentes formatos del mismo tipo de archivo. Elige desde los botones superiores o después de subir tu archivo.",
    color: "emerald",
  },
  {
    icon: Download,
    title: "3. Convierte y descarga",
    description:
      "Haz clic en el botón 'Convertir' y espera a que se complete la conversión. El tiempo varía según el tamaño del archivo. Una vez completada, descarga tu archivo convertido.",
    color: "amber",
  },
  {
    icon: Shield,
    title: "4. Privacidad garantizada",
    description:
      "Tus archivos se procesan de forma segura y se eliminan automáticamente del servidor una vez completada la conversión. No almacenamos nada permanentemente.",
    color: "cyan",
  },
]

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  indigo: { bg: "bg-indigo-600/20", border: "border-indigo-400/30", text: "text-indigo-300" },
  emerald: { bg: "bg-emerald-600/20", border: "border-emerald-400/30", text: "text-emerald-300" },
  amber: { bg: "bg-amber-600/20", border: "border-amber-400/30", text: "text-amber-300" },
  cyan: { bg: "bg-cyan-600/20", border: "border-cyan-400/30", text: "text-cyan-300" },
}

export function TutorialDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          CÓMO USAR LA APLICACIÓN
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden bg-zinc-900 border-zinc-800">
        <div className="overflow-y-auto">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="px-6 pt-6 text-white">Guía de Uso del Convertidor</DialogTitle>
            <DialogDescription asChild>
              <div className="p-6 space-y-6">
                <p className="text-zinc-300 text-sm">
                  Sigue estos simples pasos para convertir tus archivos de forma rápida y segura.
                </p>

                <div className="space-y-4">
                  {steps.map((step, index) => {
                    const colors = colorClasses[step.color]
                    const Icon = step.icon
                    return (
                      <div
                        key={index}
                        className="relative p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`inline-flex p-2.5 rounded-lg ${colors.bg} ${colors.border} border flex-shrink-0`}>
                            <Icon className={`w-5 h-5 ${colors.text}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base font-semibold text-white mb-1.5">{step.title}</h3>
                            <p className="text-sm text-zinc-300 leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">💡</span>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Consejos importantes:</h4>
                      <ul className="text-xs text-zinc-300 space-y-1.5 list-disc list-inside">
                        <li>
                          <strong>Tamaño máximo por archivo: 50 MB</strong> - Los archivos más grandes no pueden ser procesados
                        </li>
                        <li>Los archivos grandes pueden tardar más tiempo en convertirse, especialmente los de audio</li>
                        <li>No puedes convertir un archivo al mismo formato que ya tiene</li>
                        <li>Tus archivos se procesan de forma segura y se eliminan automáticamente</li>
                        <li>El servicio es completamente gratuito y sin necesidad de registro</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="px-6 pb-6 sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                Entendido
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

