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

interface LegalTermsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LegalTermsDialog({ open, onOpenChange }: LegalTermsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 sm:max-w-lg sm:max-h-[min(650px,80vh)] bg-zinc-900 border-zinc-800">
        <DialogHeader className="pt-5 pb-3 m-0 border-b border-zinc-800">
          <DialogTitle className="px-6 text-base text-white">Términos y Condiciones</DialogTitle>
          <DialogDescription className="px-6 text-zinc-400 text-xs">
            Última actualización: {new Date().getFullYear()}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="text-sm h-[480px] my-3 ps-6 pe-5 me-1">
          <div className="space-y-6 text-zinc-300">
            <section>
              <h3 className="font-semibold text-white mb-2">1. Aceptación de los Términos</h3>
              <p className="text-sm">
                Al acceder y utilizar el servicio de Convertidor de Archivos, aceptas cumplir con estos 
                términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, 
                no debes utilizar el servicio.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-white mb-2">2. Descripción del Servicio</h3>
              <p className="mb-2 text-sm">
                Convertidor de Archivos es una herramienta gratuita en línea que permite a los usuarios 
                convertir archivos entre diferentes formatos de audio, imágenes y documentos.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>El servicio se proporciona "tal cual" sin garantías</li>
                <li>No garantizamos la disponibilidad continua del servicio</li>
                <li>Nos reservamos el derecho de modificar o discontinuar el servicio en cualquier momento</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-white mb-2">3. Uso Aceptable</h3>
              <p className="mb-2 text-sm">Al utilizar este servicio, te comprometes a:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>No utilizar el servicio para fines ilegales o no autorizados</li>
                <li>No subir archivos que contengan malware, virus o código malicioso</li>
                <li>No intentar acceder a áreas no autorizadas del servicio</li>
                <li>No utilizar el servicio para violar derechos de autor o propiedad intelectual</li>
                <li>No sobrecargar el servicio con solicitudes excesivas</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-white mb-2">4. Limitación de Responsabilidad</h3>
              <p className="mb-2 text-sm">
                El servicio se proporciona sin garantías de ningún tipo, expresas o implícitas. 
                No nos hacemos responsables de:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Pérdida de datos durante la conversión</li>
                <li>Daños resultantes del uso o imposibilidad de uso del servicio</li>
                <li>Interrupciones del servicio</li>
                <li>Errores en las conversiones de archivos</li>
              </ul>
              <p className="mt-2 text-sm">
                Recomendamos hacer una copia de seguridad de tus archivos antes de convertirlos.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-white mb-2">5. Propiedad Intelectual</h3>
              <p className="mb-2 text-sm">Los archivos que subes siguen siendo de tu propiedad. Sin embargo:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>No almacenamos tus archivos permanentemente</li>
                <li>Los archivos se eliminan automáticamente después de la conversión</li>
                <li>No reclamamos derechos sobre tus archivos</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-white mb-2">6. Limitaciones de Uso</h3>
              <p className="mb-2 text-sm">Nos reservamos el derecho de:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Limitar el tamaño de los archivos que se pueden convertir</li>
                <li>Limitar el número de conversiones por usuario</li>
                <li>Bloquear o restringir el acceso a usuarios que violen estos términos</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-white mb-2">7. Modificaciones del Servicio</h3>
              <p className="text-sm">
                Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del 
                servicio en cualquier momento, con o sin previo aviso. No seremos responsables ante 
                ti ni ante ningún tercero por cualquier modificación, suspensión o discontinuación del servicio.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-white mb-2">8. Enlaces a Terceros</h3>
              <p className="text-sm">
                El servicio puede contener enlaces a sitios web de terceros. No tenemos control sobre 
                el contenido de estos sitios y no asumimos responsabilidad por ellos. La inclusión de 
                cualquier enlace no implica nuestra aprobación del sitio.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-white mb-2">9. Cambios a los Términos</h3>
              <p className="text-sm">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios 
                entrarán en vigor inmediatamente después de su publicación en esta página. Es tu 
                responsabilidad revisar periódicamente estos términos.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-white mb-2">10. Contacto</h3>
              <p className="text-sm">
                Si tienes preguntas sobre estos términos y condiciones, puedes contactarnos en:
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

