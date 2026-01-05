function Footer({ apiInfo }) {
  const currentYear = new Date().getFullYear()
  
  // Configuración del propietario
  const ownerInfo = {
    email: 'pchavez.dev@gmail.com',
    github: 'https://github.com/pchavez91', 
    linkedin: 'https://linkedin.com/in/patricio-chavez-005b83352', 
  }

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Información de Propiedad */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-blue-300">Convertidor de Archivos</h3>
            <p className="text-gray-300 text-sm mb-2">
              © {currentYear} Convertidor de Archivos. Todos los derechos reservados.
            </p>
            <p className="text-gray-400 text-xs mb-3">
              Este servicio es propiedad privada y está protegido por derechos de autor.
            </p>
            {/* Información del Propietario */}
            <div className="space-y-2 mt-4">
              {ownerInfo.email && ownerInfo.email !== 'tu-email@ejemplo.com' && (
                <a 
                  href={`mailto:${ownerInfo.email}`}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center text-xs"
                >
                  <span className="mr-2">📧</span>
                  {ownerInfo.email}
                </a>
              )}
              {ownerInfo.github && ownerInfo.github !== 'https://github.com/tu-usuario' && (
                <a 
                  href={ownerInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center text-xs"
                >
                  <span className="mr-2">💻</span>
                  GitHub
                </a>
              )}
              {ownerInfo.linkedin && ownerInfo.linkedin !== 'https://linkedin.com/in/tu-perfil' && (
                <a 
                  href={ownerInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center text-xs"
                >
                  <span className="mr-2">💼</span>
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-blue-300">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href={`${apiInfo?.access_url || 'http://localhost:8000'}/docs`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center"
                >
                  <span className="mr-2">📚</span>
                  Documentación API
                </a>
              </li>
            </ul>
          </div>

          {/* Información Legal */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-blue-300">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Propiedad intelectual protegida</li>
              <li>Uso sujeto a términos y condiciones</li>
              <li className="text-xs text-gray-400 mt-3">
                Servicio desarrollado y mantenido por el propietario
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            Servicio de conversión de archivos desarrollado con ❤️
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Convertidor de Archivos - Servicio Privado © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
