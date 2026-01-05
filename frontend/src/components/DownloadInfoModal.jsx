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

  useEffect(() => {
    if (countdown === 0 && isOpen) {
      // Auto-cerrar después de 5 segundos
      const timer = setTimeout(() => {
        onContinue()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [countdown, isOpen, onContinue])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all animate-scaleIn">
        {/* Header del Modal */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-5 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💝</span>
              <h3 className="text-white font-bold text-xl">Información</h3>
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
          {/* Icono */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full p-5 shadow-xl transform hover:scale-110 transition-transform">
              <span className="text-6xl">📥</span>
            </div>
          </div>

          {/* Mensaje */}
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold text-gray-800 mb-3">
              Gracias por usar nuestro servicio
            </h4>
            <p className="text-gray-600 mb-5 text-base">
              Este servicio es gratuito y se mantiene gracias al apoyo de nuestros usuarios.
            </p>
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl p-5 border-2 border-blue-300 shadow-md">
              <p className="text-base text-gray-800 font-semibold mb-2">
                🎯 Tu archivo está listo para descargar
              </p>
              <p className="text-sm text-gray-600">
                Puedes apoyar el proyecto con una donación si lo deseas
              </p>
            </div>
          </div>

          {/* Botón de Continuar (deshabilitado hasta que termine el countdown) */}
          <button
            onClick={onContinue}
            disabled={countdown > 0}
            className={`w-full py-3 px-6 rounded-xl font-bold text-white transition-all duration-200 ${
              countdown > 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
          >
            {countdown > 0 ? `Espera ${countdown} segundos...` : 'Continuar con la descarga'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DownloadInfoModal
