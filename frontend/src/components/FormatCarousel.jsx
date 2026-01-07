import { useState, useEffect } from 'react'

function FormatCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const formatCategories = [
    {
      type: 'audio',
      title: 'Audio',
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      formats: ['MP3', 'WAV', 'AAC', 'OGG', 'FLAC', 'M4A', 'WMA']
    },
    {
      type: 'image',
      title: 'Imágenes',
      color: 'from-cyan-500 via-blue-500 to-indigo-500',
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      formats: ['JPG', 'PNG', 'WEBP', 'GIF', 'BMP', 'ICO', 'TIFF']
    },
    {
      type: 'document',
      title: 'Documentos',
      color: 'from-green-500 via-emerald-500 to-teal-500',
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      formats: ['PDF', 'DOCX', 'TXT', 'HTML', 'MD']
    }
  ]

  // Auto-rotar cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % formatCategories.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentCategory = formatCategories[currentIndex]

  return (
    <div className="relative backdrop-blur-md bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-8 mb-6 border border-white/10 shadow-2xl overflow-hidden">
      {/* Fondo con gradiente animado */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentCategory.color} opacity-10 transition-opacity duration-700`}></div>
      
      <div className="relative z-10">
        <h3 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6 text-center">
          Formatos Soportados
        </h3>

        {/* Carrusel Principal - Optimizado para móvil */}
        <div className="relative overflow-hidden rounded-lg md:rounded-xl mb-4 md:mb-6">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {formatCategories.map((category, index) => (
              <div
                key={category.type}
                className="min-w-full flex-shrink-0"
              >
                <div className={`relative bg-gradient-to-br ${category.color} rounded-lg md:rounded-xl overflow-hidden text-white shadow-2xl min-h-[250px] md:min-h-[350px]`}>
                  {/* Overlay con gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent"></div>
                  
                  {/* Contenido - Optimizado para móvil */}
                  <div className="relative p-4 md:p-8 flex flex-col items-center justify-center h-full">
                    {/* Icono grande */}
                    <div className="mb-4 md:mb-6 text-white/90">
                      {category.icon}
                    </div>
                    
                    <h4 className="text-2xl md:text-5xl font-extrabold mb-4 md:mb-6 drop-shadow-2xl text-center">
                      {category.title}
                    </h4>
                    
                    {/* Grid de formatos - Responsive */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-3 w-full max-w-4xl">
                      {category.formats.map((format, idx) => (
                        <div
                          key={idx}
                          className="backdrop-blur-md bg-white/20 rounded-lg md:rounded-xl p-2 md:p-3 text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110 border border-white/30 shadow-lg"
                        >
                          <div className="font-bold text-xs md:text-base lg:text-lg drop-shadow-md">
                            {format}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores - Más visibles */}
        <div className="flex justify-center space-x-2 mb-4">
          {formatCategories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 md:w-12 bg-white shadow-lg'
                  : 'w-2 md:w-3 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Ir a ${formatCategories[index].title}`}
            />
          ))}
        </div>

        {/* Navegación - Mejorada */}
        <div className="flex justify-center space-x-3 md:space-x-4">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + formatCategories.length) % formatCategories.length)}
            className="group backdrop-blur-md bg-white/10 hover:bg-white/20 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 flex items-center space-x-2 border border-white/20"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline font-medium">Anterior</span>
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % formatCategories.length)}
            className="group backdrop-blur-md bg-white/10 hover:bg-white/20 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 flex items-center space-x-2 border border-white/20"
          >
            <span className="hidden sm:inline font-medium">Siguiente</span>
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormatCarousel
