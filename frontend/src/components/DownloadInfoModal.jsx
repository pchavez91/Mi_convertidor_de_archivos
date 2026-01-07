import { useEffect, useState } from 'react'

function DownloadInfoModal({ isOpen, onClose, onContinue }) {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (!isOpen) return

    setCountdown(5)

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
    if (isOpen) {
      const timer = setTimeout(() => {
        try {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md animate-fadeIn p-4">
      <div className="backdrop-blur-md bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-scaleIn border border-white/20">
        {/* Header del Modal */}
        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 p-5 md:p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg md:text-xl">Publicidad</h3>
            </div>
            {countdown > 0 && (
              <div className="backdrop-blur-md bg-white/30 text-white px-4 py-2 rounded-full text-base md:text-lg font-bold shadow-lg animate-pulse flex items-center space-x-2">
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{countdown}s</span>
              </div>
            )}
          </div>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6 md:p-8">
          {/* Área de Publicidad de AdSense */}
          <div className="mb-6 min-h-[200px] flex items-center justify-center backdrop-blur-sm bg-white/5 rounded-xl border-2 border-white/20">
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-9979099334728134"
              data-ad-slot="1234567890"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </div>

          {/* Botón de Cerrar */}
          <button
            onClick={handleClose}
            disabled={countdown > 0}
            className={`group w-full py-3 md:py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
              countdown > 0
                ? 'bg-gray-600/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 shadow-xl hover:shadow-2xl transform hover:scale-105'
            }`}
          >
            {countdown > 0 ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Espera {countdown} segundos...</span>
              </>
            ) : (
              <>
                <span>Cerrar y Continuar</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DownloadInfoModal
