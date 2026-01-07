function DonationsPage({ isOpen, onClose }) {
  if (!isOpen) return null
  
  const donationLinks = {
    paypal: 'https://paypal.me/pachavez91',
    mercadopago2000: 'https://mpago.la/2zDTQEH',
    mercadopago5000: 'https://mpago.la/1DkbZv2',
    crypto: '0x5031B4507FA5f8586a9Db673F1a6CAb85B21F7da',
  }

  const copyCryptoAddress = () => {
    navigator.clipboard.writeText(donationLinks.crypto)
    alert('Dirección de criptomoneda copiada al portapapeles')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md animate-fadeIn p-4">
      <div className="backdrop-blur-md bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 rounded-2xl shadow-2xl max-w-2xl w-full transform transition-all animate-scaleIn max-h-[90vh] overflow-y-auto border border-white/20">
        {/* Header del Modal */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-5 md:p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl md:text-2xl">Donaciones</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Cerrar"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6 md:p-8">
          {/* Mensaje de agradecimiento */}
          <div className="text-center mb-6 md:mb-8">
            <h4 className="text-xl md:text-2xl font-bold text-white mb-3">
              ¡Gracias por tu apoyo!
            </h4>
            <p className="text-gray-300 text-sm md:text-base">
              Este servicio es gratuito gracias a usuarios como tú. Tu donación nos ayuda a mantener y mejorar el servicio.
            </p>
          </div>

          {/* Métodos de donación */}
          <div className="space-y-3 md:space-y-4 mb-6">
            {/* PayPal */}
            <a
              href={donationLinks.paypal}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 md:p-5 backdrop-blur-md bg-white/10 hover:bg-white/20 border-2 border-blue-400/50 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                  {/* Icono PayPal oficial */}
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.203zm14.146-14.42a7.504 7.504 0 0 1-.174.396c-.93 2.79-3.157 3.936-6.12 3.936h-2.19c-.26 0-.48.19-.52.45l-.97 6.24-.01.06a.341.341 0 0 0 .337.39h3.61c.26 0 .48-.19.52-.45l.97-6.24c.01-.06.05-.12.1-.15.05-.03.11-.05.17-.05h.46c2.4 0 4.24-.68 5.3-1.98.6-.73.9-1.65.9-2.7 0-.4-.05-.78-.15-1.12z"/>
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-white text-base md:text-lg">PayPal</h5>
                  <p className="text-sm text-gray-300">Donación segura con PayPal</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* MercadoPago $2000 */}
            {donationLinks.mercadopago2000 && (
              <a
                href={donationLinks.mercadopago2000}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 md:p-5 backdrop-blur-md bg-white/10 hover:bg-white/20 border-2 border-cyan-400/50 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg">
                    {/* Icono MercadoPago oficial */}
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 0-.363.006-.363.006v.028c1.252.103 2.636.692 2.636 2.026 0 1.4-1.268 2.117-3.084 2.117h-.896v2.453h-1.68V8.16h3.031zm-2.091.91h-1.35v3.117h1.35c.96 0 1.554-.4 1.554-1.26 0-.84-.554-1.857-1.554-1.857zM6.733 8.16h1.68v7.554H6.733V8.16zm2.453 0h1.68v7.554h-1.68V8.16zm3.12 0h1.68v.91h-1.68v-.91zm0 1.68h1.68v5.964h-1.68V9.84z"/>
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-base md:text-lg">MercadoPago</h5>
                    <p className="text-sm text-gray-300">Donación de $2,000 CLP</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}

            {/* MercadoPago $5000 */}
            {donationLinks.mercadopago5000 && (
              <a
                href={donationLinks.mercadopago5000}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 md:p-5 backdrop-blur-md bg-white/10 hover:bg-white/20 border-2 border-green-400/50 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                    {/* Icono MercadoPago oficial */}
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 0-.363.006-.363.006v.028c1.252.103 2.636.692 2.636 2.026 0 1.4-1.268 2.117-3.084 2.117h-.896v2.453h-1.68V8.16h3.031zm-2.091.91h-1.35v3.117h1.35c.96 0 1.554-.4 1.554-1.26 0-.84-.554-1.857-1.554-1.857zM6.733 8.16h1.68v7.554H6.733V8.16zm2.453 0h1.68v7.554h-1.68V8.16zm3.12 0h1.68v.91h-1.68v-.91zm0 1.68h1.68v5.964h-1.68V9.84z"/>
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-base md:text-lg">MercadoPago</h5>
                    <p className="text-sm text-gray-300">Donación de $5,000 CLP</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}

            {/* Crypto */}
            {donationLinks.crypto && (
              <button
                onClick={copyCryptoAddress}
                className="group w-full flex items-center justify-between p-4 md:p-5 backdrop-blur-md bg-white/10 hover:bg-white/20 border-2 border-yellow-400/50 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-white text-base md:text-lg">Criptomoneda</h5>
                    <p className="text-sm text-gray-300 break-all">{donationLinks.crypto}</p>
                    <p className="text-xs text-gray-400 mt-1">Click para copiar dirección</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            )}
          </div>

          {/* Nota */}
          <div className="backdrop-blur-sm bg-blue-600/20 rounded-xl p-4 border border-blue-400/50 mb-6">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p className="text-sm text-gray-300">
                <strong className="text-white">Nota:</strong> Las donaciones son opcionales. El servicio seguirá siendo gratuito.
              </p>
            </div>
          </div>

          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            className="w-full group bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 md:py-4 px-6 rounded-xl font-bold hover:from-gray-500 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>Cerrar</span>
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DonationsPage
