import { useState } from 'react'

function TutorialGuide() {
  const [isOpen, setIsOpen] = useState(false)

  const steps = [
    {
      number: 1,
      title: 'Sube tu archivo',
      description: 'Arrastra y suelta tu archivo en el área indicada o haz clic para seleccionarlo desde tu dispositivo.',
      icon: '📤'
    },
    {
      number: 2,
      title: 'Elige el formato',
      description: 'Selecciona el formato de salida que necesitas. Puedes convertir entre diferentes formatos del mismo tipo de archivo.',
      icon: '🎯'
    },
    {
      number: 3,
      title: 'Convierte',
      description: 'Haz clic en el botón "Convertir Archivo" y espera a que se complete la conversión. El tiempo varía según el tamaño del archivo.',
      icon: '✨'
    },
    {
      number: 4,
      title: 'Descarga',
      description: 'Una vez completada la conversión, descarga tu archivo convertido. Los archivos se eliminan automáticamente del servidor.',
      icon: '📥'
    }
  ]

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3"
      >
        <span className="text-2xl">{isOpen ? '📖' : '❓'}</span>
        <span>{isOpen ? 'Ocultar Tutorial' : '¿Cómo usar el convertidor?'}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-6 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl p-8 border-2 border-indigo-200 animate-fadeIn">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center space-x-2">
            <span className="text-3xl">🎓</span>
            <span>Guía Rápida de Uso</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">{step.icon}</span>
                      <h4 className="text-lg font-bold text-gray-800">{step.title}</h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Consejos importantes:</h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Los archivos grandes pueden tardar más tiempo en convertirse</li>
                  <li>No puedes convertir un archivo al mismo formato que ya tiene</li>
                  <li>Tus archivos se procesan de forma segura y se eliminan automáticamente</li>
                  <li>El servicio es completamente gratuito y sin necesidad de registro</li>
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
