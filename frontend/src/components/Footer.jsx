function Footer({ apiInfo }) {
  const currentYear = new Date().getFullYear()
  
  const ownerInfo = {
    email: 'pchavez.dev@gmail.com',
    github: 'https://github.com/pchavez91', 
    linkedin: 'https://linkedin.com/in/patricio-chavez-005b83352', 
  }

  return (
    <footer className="backdrop-blur-md bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 border-t border-white/20 text-white mt-16 relative z-10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Columna 1: Contacto */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Contacto
            </h3>
            <a 
              href={`mailto:${ownerInfo.email}`}
              className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
            >
              <div className="p-2 bg-white/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-medium">{ownerInfo.email}</span>
            </a>
            <div className="flex items-center space-x-4 mt-6">
              {ownerInfo.github && (
                <a 
                  href={ownerInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:rotate-6"
                  title="GitHub"
                >
                  <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              )}
              {ownerInfo.linkedin && (
                <a 
                  href={ownerInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:rotate-6"
                  title="LinkedIn"
                >
                  <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Columna 2: Recursos y Legal */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
              Recursos y Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href={`${apiInfo?.access_url || (typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'https://api.todoconvertir.com' : 'http://localhost:8000')}/docs`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="font-medium">Documentación API</span>
                </a>
              </li>
              <li>
                <a 
                  href="/politica-privacidad" 
                  className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span className="font-medium">Política de Privacidad</span>
                </a>
              </li>
              <li>
                <a 
                  href="/terminos-condiciones" 
                  className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="font-medium">Términos y Condiciones</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información del Servicio */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Información del Servicio
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Propiedad intelectual protegida</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Servicio desarrollado y mantenido por el propietario</span>
              </li>
              <li className="text-sm text-gray-400 mt-6 pt-4 border-t border-white/10">
                © {currentYear} Convertidor de Archivos
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-gray-300">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-sm font-medium">
              <strong className="text-white">Privacidad garantizada:</strong> Los archivos se procesan y eliminan automáticamente. 
              No almacenamos ningún archivo en nuestros servidores.
            </p>
          </div>
          <p className="text-gray-400 text-sm flex items-center justify-center space-x-2">
            <span>Servicio de conversión de archivos desarrollado con</span>
            <svg className="w-5 h-5 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
