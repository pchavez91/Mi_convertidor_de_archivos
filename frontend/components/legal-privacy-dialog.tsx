"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"

interface LegalPrivacyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LegalPrivacyDialog({ open, onOpenChange }: LegalPrivacyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 sm:max-w-lg sm:max-h-[min(650px,80vh)] bg-zinc-900 border-zinc-800">
        <DialogHeader className="pt-5 pb-3 m-0 border-b border-zinc-800">
          <DialogTitle className="px-6 text-base text-white">Política de Privacidad</DialogTitle>
          <DialogDescription className="px-6 text-zinc-400 text-xs">
            Última actualización: {new Date().getFullYear()}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="text-sm h-[480px] my-3 ps-6 pe-5 me-1">
          <div className="space-y-6 text-zinc-300">
            <section>
              <h3 className="font-semibold text-white mb-2">1. Información que Recopilamos</h3>
              <p className="mb-2">
                Convertidor de Archivos es una herramienta gratuita que respeta tu privacidad. 
                No recopilamos información personal identificable de los usuarios.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>No almacenamos archivos subidos por los usuarios</li>
                <li>No recopilamos nombres, direcciones de correo electrónico u otra información personal</li>
                <li>Los archivos se procesan temporalmente y se eliminan automáticamente después de la conversión</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-white mb-2">2. Uso de Archivos</h3>
              <p className="mb-2">Todos los archivos que subes a nuestro servicio:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Se procesan únicamente para realizar la conversión solicitada</li>
                <li>Se eliminan automáticamente del servidor una vez completada la conversión</li>
                <li>No se comparten con terceros</li>
                <li>No se almacenan permanentemente</li>
                <li>No se utilizan para ningún otro propósito</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-white mb-2">3. Cookies y Tecnologías de Seguimiento</h3>
              <p className="mb-2">Este sitio web puede utilizar cookies y tecnologías similares para:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Mejorar la experiencia del usuario</li>
                <li>Analizar el tráfico del sitio (Google Analytics, si está configurado)</li>
                <li>Mostrar publicidad relevante (Google AdSense, si está configurado)</li>
              </ul>
              <p className="mt-2 text-sm">
                Puedes desactivar las cookies en la configuración de tu navegador, aunque esto puede afectar 
                la funcionalidad del sitio.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-white mb-2">4. Servicios de Terceros</h3>
              <p className="mb-2">Este sitio puede utilizar servicios de terceros como:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Google AdSense:</strong> Para mostrar publicidad relevante</li>
                <li><strong>Google Analytics:</strong> Para analizar el uso del sitio (si está configurado)</li>
              </ul>
              <p className="mt-2 text-sm">
                Estos servicios tienen sus propias políticas de privacidad. Te recomendamos revisarlas.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-white mb-2">5. Seguridad</h3>
              <p className="mb-2">
                Implementamos medidas de seguridad para proteger tus archivos durante el procesamiento:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Conexiones seguras (HTTPS)</li>
                <li>Eliminación automática de archivos después del procesamiento</li>
                <li>No almacenamiento permanente de datos</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-white mb-2">6. Tus Derechos</h3>
              <p className="mb-2">Tienes derecho a:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Usar el servicio de forma anónima</li>
                <li>No proporcionar información personal</li>
                <li>Contactarnos si tienes preguntas sobre esta política</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-white mb-2">7. Cambios a esta Política</h3>
              <p className="text-sm">
                Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. 
                Te notificaremos de cualquier cambio significativo publicando la nueva política en esta página 
                con una fecha de actualización revisada.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-white mb-2">8. Contacto</h3>
              <p className="text-sm">
                Si tienes preguntas sobre esta política de privacidad, puedes contactarnos en:
              </p>
              <p className="text-sm mt-1">
                <strong>Email:</strong> <a href="mailto:pchavez.dev@gmail.com" className="text-indigo-400 hover:underline">pchavez.dev@gmail.com</a>
              </p>
            </section>
          </div>
        </ScrollArea>
        <DialogFooter className="px-6 py-4 border-t border-zinc-800">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

