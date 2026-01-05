function DonationsPage({ isOpen, onClose }) {
  if (!isOpen) return null
  // Configuración de enlaces de donación
  const donationLinks = {
    paypal: 'https://paypal.me/pachavez91',
    mercadopago2000: 'https://mpago.la/2zDTQEH',
    mercadopago5000: 'https://mpago.la/1DkbZv2',
    crypto: '0x5031B4507FA5f8586a9Db673F1a6CAb85B21F7da',
  }

  // Función para copiar la dirección de criptomoneda
  const copyCryptoAddress = () => {
    navigator.clipboard.writeText(donationLinks.crypto)
    alert('Dirección de criptomoneda copiada al portapapeles')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 transform transition-all animate-scaleIn max-h-[90vh] overflow-y-auto">
        {/* Header del Modal */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">💝</span>
              <h3 className="text-white font-bold text-2xl">Donaciones</h3>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors text-2xl font-bold"
              title="Cerrar"
            >
              ×
            </button>
          </div>
        </div>

        {/* Contenido del Modal */}
        <div className="p-8">
          {/* Mensaje de agradecimiento */}
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-gray-800 mb-3">
              ¡Gracias por tu apoyo!
            </h4>
            <p className="text-gray-600 text-base">
              Este servicio es gratuito gracias a usuarios como tú. Tu donación nos ayuda a mantener y mejorar el servicio.
            </p>
          </div>

          {/* Métodos de donación */}
          <div className="space-y-4 mb-6">
            {/* PayPal */}
            <a
              href={donationLinks.paypal}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl hover:shadow-lg transition-all transform hover:scale-[1.02]"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <span className="text-2xl">💳</span>
                </div>
                <div>
                  <h5 className="font-bold text-gray-800 text-lg">PayPal</h5>
                  <p className="text-sm text-gray-600">Donación segura con PayPal</p>
                </div>
              </div>
              <span className="text-blue-600 font-semibold">→</span>
            </a>

            {/* MercadoPago $2000 */}
            {donationLinks.mercadopago2000 && (
              <a
                href={donationLinks.mercadopago2000}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-cyan-100 border-2 border-blue-300 rounded-xl hover:shadow-lg transition-all transform hover:scale-[1.02]"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <span className="text-2xl">💳</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800 text-lg">MercadoPago</h5>
                    <p className="text-sm text-gray-600">Donación de $2,000 ARS</p>
                  </div>
                </div>
                <span className="text-blue-600 font-semibold">→</span>
              </a>
            )}

            {/* MercadoPago $5000 */}
            {donationLinks.mercadopago5000 && (
              <a
                href={donationLinks.mercadopago5000}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 bg-gradient-to-r from-green-50 to-emerald-100 border-2 border-green-300 rounded-xl hover:shadow-lg transition-all transform hover:scale-[1.02]"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-green-600 p-3 rounded-lg">
                    <span className="text-2xl">💳</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800 text-lg">MercadoPago</h5>
                    <p className="text-sm text-gray-600">Donación de $5,000 ARS</p>
                  </div>
                </div>
                <span className="text-green-600 font-semibold">→</span>
              </a>
            )}

            {/* Crypto (Opcional) */}
            {donationLinks.crypto && (
              <button
                onClick={copyCryptoAddress}
                className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl hover:shadow-lg transition-all transform hover:scale-[1.02] text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-600 p-3 rounded-lg">
                    <span className="text-2xl">₿</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-gray-800 text-lg">Criptomoneda</h5>
                    <p className="text-sm text-gray-600 break-all">{donationLinks.crypto}</p>
                    <p className="text-xs text-gray-500 mt-1">Click para copiar dirección</p>
                  </div>
                </div>
                <span className="text-yellow-600 font-semibold">📋</span>
              </button>
            )}
          </div>

          {/* Nota */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              💡 <strong>Nota:</strong> Las donaciones son opcionales. El servicio seguirá siendo gratuito.
            </p>
          </div>

          {/* Botón de cerrar */}
          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonationsPage
