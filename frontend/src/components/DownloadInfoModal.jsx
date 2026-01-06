import { useEffect, useState } from 'react'

function DownloadInfoModal({ isOpen, onClose, onContinue }) {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (!isOpen) return

    // Resetear countdown cuando se abre
    setCountdown(5)

    // Contador regresivo
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isOpen])

  // Inicializar AdSense cuando el modal se abre
  useEffect(() => {
    if (isOpen) {
      // Esperar un momento para que el DOM se actualice
      const timer = setTimeout(() => {
        try {
          // Inicializar anuncios de AdSense
          if (window.adsbygoogle) {
            (window.adsbygoogle = window.adsbygoogle || []).push({})
          }
        } catch (error) {
          console.log('Error al inicializar AdSense:', error)
        }
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleClose = () => {
    if (countdown === 0) {
      onClose()
      onContinue()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all animate-scaleIn">
        {/* Header del Modal */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-5 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📢</span>
              <h3 className="text-white font-bold text-xl">Publicidad</h3>
            </div>
            {countdown > 0 && (
              <div className="bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-base font-bold shadow-lg animate-pulse">
                {countdown}s
              </div>
            )}
          </div>
        </div>

        {/* Contenido del Modal */}
        <div className="p-8">
          {/* Área de Publicidad de AdSense */}
          <div className="mb-6 min-h-[200px] flex items-center justify-center bg-gray-50 rounded-xl border-2 border-gray-200">
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-9979099334728134"
              data-ad-slot="1234567890"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </div>

          {/* Botón de Cerrar (deshabilitado hasta que termine el countdown) */}
          <button
            onClick={handleClose}
            disabled={countdown > 0}
            className={`w-full py-3 px-6 rounded-xl font-bold text-white transition-all duration-200 ${
              countdown > 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
          >
            {countdown > 0 ? `Espera ${countdown} segundos...` : 'Cerrar y Descargar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DownloadInfoModal
