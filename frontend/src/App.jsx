import { useState, useCallback, useEffect } from 'react'
import FileUploader from './components/FileUploader'
import FormatSelector from './components/FormatSelector'
import ConversionProgress from './components/ConversionProgress'
import DownloadInfoModal from './components/DownloadInfoModal'
import Footer from './components/Footer'
import DonationsPage from './components/DonationsPage'
import TutorialGuide from './components/TutorialGuide'
import FormatCarousel from './components/FormatCarousel'
import axios from 'axios'

// Detectar la URL del API automáticamente
const getApiUrl = () => {
  try {
    // En producción (Vercel, Netlify, Fly.io), usar la variable de entorno
    if (import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL
    }
    
    if (typeof window === 'undefined') {
      return 'http://localhost:8000'
    }
    
    // Si estamos en desarrollo, usar localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:8000'
    }
    
    // Si estamos en producción (HTTPS), detectar automáticamente basado en el dominio
    const hostname = window.location.hostname
    const protocol = window.location.protocol // 'https:' o 'http:'
    
    // Si estamos en todoconvertir.com, el backend está en api.todoconvertir.com
    if (hostname === 'todoconvertir.com' || hostname === 'www.todoconvertir.com') {
      // SIEMPRE usar HTTPS en producción
      return 'https://api.todoconvertir.com'
    }
    
    // Si estamos en HTTPS pero no reconocemos el dominio, usar HTTPS por defecto
    if (protocol === 'https:') {
      // Intentar detectar el backend basado en el dominio actual
      // Si el frontend está en un subdominio, el backend podría estar en 'api.'
      const parts = hostname.split('.')
      if (parts.length >= 2) {
        const domain = parts.slice(-2).join('.') // Obtener dominio principal (ej: todoconvertir.com)
        return `https://api.${domain}`
      }
      // Fallback: usar HTTPS con el dominio actual + /api
      return `${protocol}//api.${hostname}`
    }
    
    // Solo usar HTTP si estamos explícitamente en HTTP (desarrollo local)
    return 'http://localhost:8000'
  } catch (error) {
    // En caso de error, si estamos en HTTPS, usar HTTPS
    if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
      const hostname = window.location.hostname
      if (hostname === 'todoconvertir.com' || hostname === 'www.todoconvertir.com') {
        return 'https://api.todoconvertir.com'
      }
    }
    // Fallback a localhost solo si estamos en desarrollo
    return 'http://localhost:8000'
  }
}

const API_URL = getApiUrl()

function App() {
  const [file, setFile] = useState(null)
  const [fileType, setFileType] = useState(null)
  const [outputFormat, setOutputFormat] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [error, setError] = useState(null)
  const [apiInfo, setApiInfo] = useState(null)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [showDonationsPage, setShowDonationsPage] = useState(false)

  // Obtener información del servidor al cargar
  useEffect(() => {
    // Intentar obtener información del servidor, pero no fallar si no está disponible
    const fetchApiInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/`, {
          timeout: 5000, // Timeout de 5 segundos
          // Agregar headers para evitar bloqueos
          headers: {
            'Accept': 'application/json',
          },
        })
        setApiInfo(response.data)
      } catch (error) {
        // Silenciar errores de conexión - el backend puede no estar disponible
        // o puede ser bloqueado por el navegador
        if (error.code !== 'ERR_BLOCKED_BY_CLIENT' && error.code !== 'ERR_NETWORK') {
          console.log('Backend no disponible, continuando sin información del servidor')
        }
      }
    }
    
    // Solo intentar si window está disponible (evitar errores en SSR)
    if (typeof window !== 'undefined') {
      fetchApiInfo()
    }
  }, [])

  const handleFileSelect = useCallback((selectedFile) => {
    setFile(selectedFile || null)
    setDownloadUrl(null)
    setError(null)
    setOutputFormat('')
    
    // Determinar tipo de archivo
    const ext = selectedFile?.name.split('.').pop().toLowerCase()
    const audioFormats = ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'wma']
    const videoFormats = ['mp4', 'avi', 'mov', 'mkv', 'webm', 'flv', 'wmv', 'm4v']
    const imageFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'ico', 'tiff']
    const documentFormats = ['pdf', 'docx', 'txt', 'html', 'md', 'rtf', 'odt']
    
    if (!selectedFile) {
      setFileType(null)
      return
    }
    
    if (audioFormats.includes(ext)) {
      setFileType('audio')
    } else if (videoFormats.includes(ext)) {
      setFileType('video')
    } else if (imageFormats.includes(ext)) {
      setFileType('image')
    } else if (documentFormats.includes(ext)) {
      setFileType('document')
    } else {
      setFileType('unknown')
    }
  }, [])

  const handleConvert = async () => {
    if (!file || !outputFormat) {
      setError('Por favor selecciona un archivo y un formato de salida')
      return
    }

    // Validar que no se intente convertir al mismo formato
    const inputExt = file.name.split('.').pop().toLowerCase()
    let normalizedInputExt = inputExt === 'jpeg' ? 'jpg' : inputExt
    let normalizedOutputFormat = outputFormat === 'jpeg' ? 'jpg' : outputFormat
    
    if (normalizedInputExt === normalizedOutputFormat) {
      setError(`El archivo ya está en formato ${outputFormat.toUpperCase()}. Por favor elige un formato de salida diferente.`)
      return
    }

    setLoading(true)
    setProgress(0)
    setError(null)
    setDownloadUrl(null)

    let progressInterval = null

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('output_format', outputFormat)

      // Determinar si es audio/video (conversiones más lentas)
      const isMediaFile = fileType === 'audio' || fileType === 'video'
      
      // Simular progreso más realista
      if (isMediaFile) {
        // Para audio/video: progreso más lento y gradual
        progressInterval = setInterval(() => {
          setProgress(prev => {
            // Llegar a 85% gradualmente, luego esperar respuesta real
            if (prev < 85) {
              return Math.min(prev + 0.5, 85) // Incremento más lento
            }
            return prev
          })
        }, 500) // Actualizar cada 500ms
      } else {
        // Para otros archivos: progreso más rápido
        progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev < 90) {
              return prev + 5
            }
            return prev
          })
        }, 200)
      }

      const response = await axios.post(
        `${API_URL}/convert`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 1800000, // 30 minutos de timeout (mismo que backend)
          onUploadProgress: (progressEvent) => {
            // Progreso de subida del archivo
            if (progressEvent.total) {
              const uploadProgress = Math.round((progressEvent.loaded * 20) / progressEvent.total) // 0-20%
              setProgress(uploadProgress)
            }
          },
        }
      )

      if (progressInterval) {
        clearInterval(progressInterval)
      }
      setProgress(100)
      setDownloadUrl(`${API_URL}${response.data.download_url}`)
    } catch (err) {
      if (progressInterval) {
        clearInterval(progressInterval)
      }
      
      if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
        setError('La conversión está tomando demasiado tiempo. Por favor intenta con un archivo más pequeño o verifica tu conexión.')
      } else {
        setError(err.response?.data?.detail || err.message || 'Error al convertir el archivo')
      }
      setProgress(0)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (downloadUrl) {
      // Mostrar modal de publicidad
      setShowDownloadModal(true)
    }
  }

  const handleContinueDownload = () => {
    setShowDownloadModal(false)
    // Pequeño delay para que el modal se cierre suavemente
    setTimeout(() => {
      if (downloadUrl) {
        try {
          // Intentar abrir en nueva pestaña
          const newWindow = window.open(downloadUrl, '_blank')
          // Si window.open fue bloqueado, usar location.href como fallback
          if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            // Fallback: descargar en la misma ventana
            window.location.href = downloadUrl
          }
        } catch (error) {
          // Si hay un error, intentar descargar directamente
          window.location.href = downloadUrl
        }
      }
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex-1 hidden md:block"></div>
            <div className="flex-1 text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 drop-shadow-sm">
                Convertidor de Archivos Online Gratis
              </h1>
            </div>
            <div className="flex-1 flex justify-center md:justify-end">
              <button
                onClick={() => setShowDonationsPage(true)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base font-semibold flex items-center space-x-2"
                title="Apoya el proyecto con una donación"
              >
                <span className="text-lg md:text-xl">💝</span>
                <span>Donaciones</span>
              </button>
            </div>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            Convierte tus archivos de audio, video, imágenes y documentos de forma rápida y fácil
          </p>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Tutorial Guide */}
          <TutorialGuide />

          {/* Format Carousel */}
          <FormatCarousel />
          {/* Step 1 - Upload Section */}
          <div className={`rounded-2xl shadow-2xl p-8 mb-6 transition-all duration-300 ${
            !file 
              ? 'bg-gradient-to-br from-blue-100 to-cyan-100 border-4 border-blue-400 shadow-lg shadow-blue-300/50' 
              : 'bg-white border-2 border-blue-200'
          }`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 text-lg font-bold shadow-lg">1</span>
              Sube tu archivo
            </h2>
            <FileUploader onFileSelect={handleFileSelect} file={file} />
            {fileType === 'unknown' && file && (
              <div className="mt-4 p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border-2 border-red-200">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">⚠️</span>
                  <p className="text-red-800 font-semibold">
                    Formato de archivo no soportado. Por favor selecciona un archivo válido.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Step 2 - Format Selection Section */}
          {file && fileType !== 'unknown' && (
            <div className={`rounded-2xl shadow-2xl p-8 mb-6 transition-all duration-300 ${
              !outputFormat
                ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-purple-400 shadow-lg shadow-purple-300/50'
                : 'bg-white border-2 border-purple-200'
            }`}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 text-lg font-bold shadow-lg">2</span>
                Elige el formato de salida
              </h2>
              <FormatSelector
                fileType={fileType}
                value={outputFormat}
                onChange={setOutputFormat}
              />
            </div>
          )}

          {/* Step 3 - Convert Section */}
          {file && outputFormat && (
            <div className="rounded-2xl shadow-2xl p-8 mb-6 bg-gradient-to-br from-green-100 to-emerald-100 border-4 border-green-400 shadow-lg shadow-green-300/50">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 text-lg font-bold shadow-lg">3</span>
                Convierte
              </h2>
              <button
                onClick={handleConvert}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] text-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Convirtiendo...
                  </span>
                ) : (
                  '✨ Convertir Archivo'
                )}
              </button>
              
              {/* Progress */}
              {loading && (
                <div className="mt-6">
                  <ConversionProgress progress={progress} />
                  {(fileType === 'audio' || fileType === 'video') && (
                    <p className="text-sm text-gray-700 mt-3 text-center font-medium">
                      ⏳ La conversión de {fileType === 'audio' ? 'audio' : 'video'} puede tardar varios minutos dependiendo del tamaño del archivo. Por favor espera...
                    </p>
                  )}
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mt-6 p-5 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border-2 border-red-300 shadow-lg">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">❌</span>
                    <p className="text-red-800 font-semibold flex-1">{error}</p>
                  </div>
                </div>
              )}

              {/* Download */}
              {downloadUrl && (
                <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-4xl">✅</span>
                    <p className="text-green-800 font-bold text-lg">
                      ¡Conversión completada exitosamente!
                    </p>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-8 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  >
                    📥 Descargar Archivo
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Footer */}
      <Footer apiInfo={apiInfo} />

      {/* Modal de Información de Descarga */}
      <DownloadInfoModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        onContinue={handleContinueDownload}
      />

      {/* Página de Donaciones */}
      <DonationsPage
        isOpen={showDonationsPage}
        onClose={() => setShowDonationsPage(false)}
      />
    </div>
  )
}

export default App
