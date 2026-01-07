import { useState, useEffect } from 'react'

function FormatCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const formatCategories = [
    {
      type: 'audio',
      icon: '🎵',
      color: 'from-blue-500 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&q=80',
      imageAlt: 'Auriculares y música',
      formats: [
        { name: 'MP3', desc: 'Más compatible', icon: '🎵' },
        { name: 'WAV', desc: 'Sin compresión', icon: '🎵' },
        { name: 'AAC', desc: 'Alta calidad', icon: '🎵' },
        { name: 'OGG', desc: 'Formato abierto', icon: '🎵' },
        { name: 'FLAC', desc: 'Sin pérdida', icon: '🎵' }
      ]
    },
    {
      type: 'image',
      icon: '🖼️',
      color: 'from-pink-500 to-rose-500',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop&q=80',
      imageAlt: 'Fotografía y edición de imágenes',
      formats: [
        { name: 'JPG', desc: 'Fotografías', icon: '🖼️' },
        { name: 'PNG', desc: 'Con transparencia', icon: '🖼️' },
        { name: 'WEBP', desc: 'Optimizado web', icon: '🖼️' },
        { name: 'GIF', desc: 'Animaciones', icon: '🖼️' },
        { name: 'BMP', desc: 'Sin compresión', icon: '🖼️' }
      ]
    },
    {
      type: 'document',
      icon: '📄',
      color: 'from-green-500 to-emerald-500',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop&q=80',
      imageAlt: 'Documentos y archivos',
      formats: [
        { name: 'PDF', desc: 'Documento portable', icon: '📄' },
        { name: 'DOCX', desc: 'Word', icon: '📄' },
        { name: 'TXT', desc: 'Texto plano', icon: '📄' },
        { name: 'HTML', desc: 'Página web', icon: '📄' },
        { name: 'MD', desc: 'Markdown', icon: '📄' }
      ]
    }
  ]

  // Auto-rotar cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % formatCategories.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const currentCategory = formatCategories[currentIndex]

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl md:rounded-2xl shadow-xl p-3 md:p-8 border-2 border-gray-200 mb-6 md:mb-8 animate-fadeInUp">
      <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-3 md:mb-6 text-center flex items-center justify-center space-x-2">
        <span className="text-xl md:text-3xl">🎨</span>
        <span>Formatos Soportados</span>
      </h3>

      {/* Carrusel Principal - Diseño más compacto para móvil */}
      <div className="relative overflow-hidden rounded-lg md:rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-2 md:p-6 mb-4 md:mb-6">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {formatCategories.map((category, index) => (
            <div
              key={category.type}
              className="min-w-full flex-shrink-0 px-1 md:px-4"
            >
              <div className={`bg-gradient-to-br ${category.color} rounded-lg md:rounded-xl overflow-hidden text-white shadow-lg relative min-h-[280px] md:min-h-[450px]`}>
                {/* Imagen de fondo - oculta en móvil para mejor rendimiento */}
                <div className="hidden md:block absolute inset-0 opacity-20">
                  <img
                    src={category.image}
                    alt={category.imageAlt}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    style={{ objectPosition: 'center center' }}
                  />
                </div>
                
                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/30 md:from-black/40 to-transparent"></div>
                
                {/* Contenido - más compacto en móvil */}
                <div className="relative p-3 md:p-8">
                  <div className="text-center mb-3 md:mb-6">
                    <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full p-2 md:p-4 mb-2 md:mb-4">
                      <span className="text-2xl md:text-5xl block">{category.icon}</span>
                    </div>
                    <h4 className="text-lg md:text-3xl font-bold capitalize mb-1 md:mb-2 drop-shadow-lg">{category.type}</h4>
                    <p className="text-white/90 text-xs md:text-lg drop-shadow-md hidden md:block">Formatos disponibles</p>
                  </div>
                  
                  {/* Grid más compacto en móvil */}
                  <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4">
                    {category.formats.map((format, idx) => (
                      <div
                        key={idx}
                        className="bg-white/20 backdrop-blur-md rounded-md md:rounded-lg p-2 md:p-4 text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/30"
                      >
                        <span className="text-lg md:text-3xl block mb-1 md:mb-2">{format.icon}</span>
                        <div className="font-bold text-xs md:text-lg mb-0.5 md:mb-1 drop-shadow-md">{format.name}</div>
                        <div className="text-[10px] md:text-sm text-white/90 drop-shadow-sm hidden md:block">{format.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores - más pequeños en móvil */}
        <div className="flex justify-center space-x-1.5 md:space-x-2 mt-3 md:mt-4">
          {formatCategories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-6 md:w-8 bg-indigo-600'
                  : 'w-2 md:w-3 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir a ${formatCategories[index].type}`}
            />
          ))}
        </div>
      </div>

      {/* Navegación Manual - más compacta en móvil */}
      <div className="flex justify-center space-x-2 md:space-x-4">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + formatCategories.length) % formatCategories.length)}
          className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-1 md:space-x-2 text-sm md:text-base"
        >
          <svg className="w-4 md:w-5 h-4 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Anterior</span>
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % formatCategories.length)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-1 md:space-x-2 text-sm md:text-base"
        >
          <span className="hidden sm:inline">Siguiente</span>
          <svg className="w-4 md:w-5 h-4 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default FormatCarousel
