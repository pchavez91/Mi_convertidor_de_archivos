function LegalPrivacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Política de Privacidad
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Última actualización:</strong> {new Date().getFullYear()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Información que Recopilamos</h2>
              <p className="text-gray-700 mb-4">
                Convertidor de Archivos es una herramienta gratuita que respeta tu privacidad. 
                No recopilamos información personal identificable de los usuarios.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>No almacenamos archivos subidos por los usuarios</li>
                <li>No recopilamos nombres, direcciones de correo electrónico u otra información personal</li>
                <li>Los archivos se procesan temporalmente y se eliminan automáticamente después de la conversión</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Uso de Archivos</h2>
              <p className="text-gray-700 mb-4">
                Todos los archivos que subes a nuestro servicio:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Se procesan únicamente para realizar la conversión solicitada</li>
                <li>Se eliminan automáticamente del servidor una vez completada la conversión</li>
                <li>No se comparten con terceros</li>
                <li>No se almacenan permanentemente</li>
                <li>No se utilizan para ningún otro propósito</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Cookies y Tecnologías de Seguimiento</h2>
              <p className="text-gray-700 mb-4">
                Este sitio web puede utilizar cookies y tecnologías similares para:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Mejorar la experiencia del usuario</li>
                <li>Analizar el tráfico del sitio (Google Analytics, si está configurado)</li>
                <li>Mostrar publicidad relevante (Google AdSense, si está configurado)</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Puedes desactivar las cookies en la configuración de tu navegador, aunque esto puede afectar 
                la funcionalidad del sitio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Servicios de Terceros</h2>
              <p className="text-gray-700 mb-4">
                Este sitio puede utilizar servicios de terceros como:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Google AdSense:</strong> Para mostrar publicidad relevante</li>
                <li><strong>Google Analytics:</strong> Para analizar el uso del sitio (si está configurado)</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Estos servicios tienen sus propias políticas de privacidad. Te recomendamos revisarlas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Seguridad</h2>
              <p className="text-gray-700 mb-4">
                Implementamos medidas de seguridad para proteger tus archivos durante el procesamiento:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Conexiones seguras (HTTPS)</li>
                <li>Eliminación automática de archivos después del procesamiento</li>
                <li>No almacenamiento permanente de datos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Tus Derechos</h2>
              <p className="text-gray-700 mb-4">
                Tienes derecho a:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Usar el servicio de forma anónima</li>
                <li>No proporcionar información personal</li>
                <li>Contactarnos si tienes preguntas sobre esta política</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Cambios a esta Política</h2>
              <p className="text-gray-700">
                Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. 
                Te notificaremos de cualquier cambio significativo publicando la nueva política en esta página 
                con una fecha de actualización revisada.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Contacto</h2>
              <p className="text-gray-700">
                Si tienes preguntas sobre esta política de privacidad, puedes contactarnos en:
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

export default LegalPrivacy
