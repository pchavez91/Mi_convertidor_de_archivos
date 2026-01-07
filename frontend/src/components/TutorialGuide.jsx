import { useState } from 'react'

function TutorialGuide() {
  const [isOpen, setIsOpen] = useState(false)

  const steps = [
    {
      number: 1,
      title: 'Sube tu archivo',
      description: 'Arrastra y suelta tu archivo en el área indicada o haz clic para seleccionarlo desde tu dispositivo.',
      icon: (
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      color: 'from-blue-400 to-cyan-400'
    },
    {
      number: 2,
      title: 'Elige el formato',
      description: 'Selecciona el formato de salida que necesitas. Puedes convertir entre diferentes formatos del mismo tipo de archivo.',
      icon: (
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      color: 'from-indigo-400 to-blue-400'
    },
    {
      number: 3,
      title: 'Convierte',
      description: 'Haz clic en el botón "Convertir Archivo" y espera a que se complete la conversión. El tiempo varía según el tamaño del archivo.',
      icon: (
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'from-green-400 to-emerald-400'
    },
    {
      number: 4,
      title: 'Descarga',
      description: 'Una vez completada la conversión, descarga tu archivo convertido. Los archivos se eliminan automáticamente del servidor.',
      icon: (
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
      color: 'from-teal-400 to-cyan-400'
    }
  ]

  return (
    <div className="mb-6 md:mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-white font-bold py-4 md:py-5 px-6 md:px-8 rounded-xl hover:from-indigo-600 hover:via-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          )}
        </svg>
        <span className="relative z-10 text-sm md:text-base">{isOpen ? 'Ocultar Tutorial' : '¿Cómo usar el convertidor?'}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-4 md:mt-6 backdrop-blur-md bg-white/10 rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 border-2 border-indigo-400/50 animate-fadeIn">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center flex items-center justify-center space-x-3">
            <svg className="w-7 h-7 md:w-8 md:h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Guía Rápida de Uso</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="backdrop-blur-sm bg-white/10 rounded-xl p-4 md:p-6 border-2 border-white/20 hover:border-indigo-400/50 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className={`bg-gradient-to-br ${step.color} text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl font-bold shadow-lg flex-shrink-0`}>
                      {step.number}
                    </div>
                    <div className={`p-2 md:p-3 bg-gradient-to-br ${step.color} rounded-lg flex-shrink-0`}>
                      <div className="text-white">
                        {step.icon}
                      </div>
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-white flex-1">{step.title}</h4>
                  </div>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed pl-0 md:pl-0">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 md:mt-8 p-4 md:p-6 backdrop-blur-sm bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl border-2 border-blue-400/50">
            <div className="flex items-start space-x-3 md:space-x-4">
              <div className="p-2 md:p-3 bg-yellow-400/20 rounded-lg flex-shrink-0">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-base md:text-lg font-bold text-white mb-3">Consejos importantes:</h4>
                <ul className="text-xs md:text-sm text-gray-200 space-y-2">
                  <li className="flex items-start space-x-2">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Tamaño máximo por archivo: 50 MB</strong> - Los archivos más grandes no pueden ser procesados</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Los archivos grandes pueden tardar más tiempo en convertirse</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <span>No puedes convertir un archivo al mismo formato que ya tiene</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Tus archivos se procesan de forma segura y se eliminan automáticamente</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-teal-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>El servicio es completamente gratuito y sin necesidad de registro</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TutorialGuide
