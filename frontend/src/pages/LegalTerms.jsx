function LegalTerms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Términos y Condiciones
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Última actualización:</strong> {new Date().getFullYear()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Aceptación de los Términos</h2>
              <p className="text-gray-700 mb-4">
                Al acceder y utilizar el servicio de Convertidor de Archivos, aceptas cumplir con estos 
                términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, 
                no debes utilizar el servicio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Descripción del Servicio</h2>
              <p className="text-gray-700 mb-4">
                Convertidor de Archivos es una herramienta gratuita en línea que permite a los usuarios 
                convertir archivos entre diferentes formatos de audio, video, imágenes y documentos.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>El servicio se proporciona "tal cual" sin garantías</li>
                <li>No garantizamos la disponibilidad continua del servicio</li>
                <li>Nos reservamos el derecho de modificar o discontinuar el servicio en cualquier momento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Uso Aceptable</h2>
              <p className="text-gray-700 mb-4">
                Al utilizar este servicio, te comprometes a:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>No utilizar el servicio para fines ilegales o no autorizados</li>
                <li>No subir archivos que contengan malware, virus o código malicioso</li>
                <li>No intentar acceder a áreas no autorizadas del servicio</li>
                <li>No utilizar el servicio para violar derechos de autor o propiedad intelectual</li>
                <li>No sobrecargar el servicio con solicitudes excesivas</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Limitación de Responsabilidad</h2>
              <p className="text-gray-700 mb-4">
                El servicio se proporciona sin garantías de ningún tipo, expresas o implícitas. 
                No nos hacemos responsables de:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Pérdida de datos durante la conversión</li>
                <li>Daños resultantes del uso o imposibilidad de uso del servicio</li>
                <li>Interrupciones del servicio</li>
                <li>Errores en las conversiones de archivos</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Recomendamos hacer una copia de seguridad de tus archivos antes de convertirlos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Propiedad Intelectual</h2>
              <p className="text-gray-700 mb-4">
                Los archivos que subes siguen siendo de tu propiedad. Sin embargo:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>No almacenamos tus archivos permanentemente</li>
                <li>Los archivos se eliminan automáticamente después de la conversión</li>
                <li>No reclamamos derechos sobre tus archivos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Limitaciones de Uso</h2>
              <p className="text-gray-700 mb-4">
                Nos reservamos el derecho de:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Limitar el tamaño de los archivos que se pueden convertir</li>
                <li>Limitar el número de conversiones por usuario</li>
                <li>Bloquear o restringir el acceso a usuarios que violen estos términos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Modificaciones del Servicio</h2>
              <p className="text-gray-700">
                Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del 
                servicio en cualquier momento, con o sin previo aviso. No seremos responsables ante 
                ti ni ante ningún tercero por cualquier modificación, suspensión o discontinuación del servicio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Enlaces a Terceros</h2>
              <p className="text-gray-700">
                El servicio puede contener enlaces a sitios web de terceros. No tenemos control sobre 
                el contenido de estos sitios y no asumimos responsabilidad por ellos. La inclusión de 
                cualquier enlace no implica nuestra aprobación del sitio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Cambios a los Términos</h2>
              <p className="text-gray-700">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios 
                entrarán en vigor inmediatamente después de su publicación en esta página. Es tu 
                responsabilidad revisar periódicamente estos términos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Contacto</h2>
              <p className="text-gray-700">
                Si tienes preguntas sobre estos términos y condiciones, puedes contactarnos en:
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Email:</strong> <a href="mailto:pchavez.dev@gmail.com" className="text-blue-600 hover:underline">pchavez.dev@gmail.com</a>
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <a 
              href="/"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              ← Volver al Convertidor
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LegalTerms
