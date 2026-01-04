import { useEffect, useState } from 'react'

function AdModal({ isOpen, onClose, onContinue }) {
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
              <span className="text-2xl">📢</span>
              <h3 className="text-white font-bold text-xl">Publicidad de Google</h3>
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
          {/* Logo de Google Ads */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-500 via-green-500 to-red-500 rounded-full p-5 shadow-xl transform hover:scale-110 transition-transform">
              <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
          </div>

          {/* Mensaje de Publicidad */}
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold text-gray-800 mb-3">
              Gracias por usar nuestro servicio
            </h4>
            <p className="text-gray-600 mb-5 text-base">
              Este servicio es gratuito gracias a nuestros patrocinadores de Google.
            </p>
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl p-5 border-2 border-blue-300 shadow-md">
              <p className="text-base text-gray-800 font-semibold mb-2">
                🎯 Descubre productos y servicios que podrían interesarte
              </p>
              <p className="text-sm text-gray-600">
                Apoya a nuestros patrocinadores mientras esperas
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

export default AdModal
