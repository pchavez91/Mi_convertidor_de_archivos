import { useState, useEffect } from 'react'

function FormatCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const formatCategories = [
    {
      type: 'audio',
      icon: '🎵',
      color: 'from-blue-500 to-cyan-500',
      formats: [
        { name: 'MP3', desc: 'Más compatible', icon: '🎵' },
        { name: 'WAV', desc: 'Sin compresión', icon: '🎵' },
        { name: 'AAC', desc: 'Alta calidad', icon: '🎵' },
        { name: 'OGG', desc: 'Formato abierto', icon: '🎵' },
        { name: 'FLAC', desc: 'Sin pérdida', icon: '🎵' }
      ]
    },
    {
      type: 'video',
      icon: '🎬',
      color: 'from-purple-500 to-pink-500',
      formats: [
        { name: 'MP4', desc: 'Más compatible', icon: '🎬' },
        { name: 'AVI', desc: 'Formato clásico', icon: '🎬' },
        { name: 'MOV', desc: 'Formato Apple', icon: '🎬' },
        { name: 'WEBM', desc: 'Optimizado web', icon: '🎬' },
        { name: 'MKV', desc: 'Contenedor flexible', icon: '🎬' }
      ]
    },
    {
      type: 'image',
      icon: '🖼️',
      color: 'from-pink-500 to-rose-500',
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
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl p-8 border-2 border-gray-200 mb-8 animate-fadeInUp">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center space-x-2">
        <span className="text-3xl">🎨</span>
        <span>Formatos Soportados</span>
      </h3>

      {/* Carrusel Principal */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 mb-6">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {formatCategories.map((category, index) => (
            <div
              key={category.type}
              className="min-w-full flex-shrink-0 px-4"
            >
              <div className={`bg-gradient-to-br ${category.color} rounded-xl p-8 text-white shadow-lg`}>
                <div className="text-center mb-6">
                  <span className="text-6xl mb-4 block">{category.icon}</span>
                  <h4 className="text-3xl font-bold capitalize mb-2">{category.type}</h4>
                  <p className="text-white/90 text-lg">Formatos disponibles</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {category.formats.map((format, idx) => (
                    <div
                      key={idx}
                      className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="text-3xl block mb-2">{format.icon}</span>
                      <div className="font-bold text-lg mb-1">{format.name}</div>
                      <div className="text-sm text-white/80">{format.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores */}
        <div className="flex justify-center space-x-2 mt-4">
          {formatCategories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-indigo-600'
                  : 'w-3 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir a ${formatCategories[index].type}`}
            />
          ))}
        </div>
      </div>

      {/* Navegación Manual */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + formatCategories.length) % formatCategories.length)}
          className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Anterior</span>
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % formatCategories.length)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
        >
          <span>Siguiente</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default FormatCarousel
