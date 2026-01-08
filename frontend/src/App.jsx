import { useState, useCallback, useEffect } from 'react'
import FileUploader from './components/FileUploader'
import FormatSelector from './components/FormatSelector'
import ConversionProgress from './components/ConversionProgress'
import DownloadInfoModal from './components/DownloadInfoModal'
import Footer from './components/Footer'
import DonationsPage from './components/DonationsPage'
import TutorialGuide from './components/TutorialGuide'
import FormatCarousel from './components/FormatCarousel'
import AnimatedBackground from './components/AnimatedBackground'
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
    
    const hostname = window.location.hostname
    const protocol = window.location.protocol // 'https:' o 'http:'
    
    // Si estamos en localhost o 127.0.0.1, usar localhost para el backend
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:8000'
    }
    
    // Si estamos en producción (HTTPS), detectar automáticamente basado en el dominio
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
    
    // Si estamos accediendo desde una IP de red (ej: 192.168.100.150:5173)
    // usar esa misma IP para el backend (ej: 192.168.100.150:8000)
    // Esto es común cuando se accede desde otro dispositivo en la red local
    if (hostname.match(/^\d+\.\d+\.\d+\.\d+$/)) {
      // Es una IP, usar esa misma IP para el backend
      return `http://${hostname}:8000`
    }
    
    // Fallback: usar localhost
    return 'http://localhost:8000'
  } catch (error) {
    // En caso de error, si estamos en HTTPS, usar HTTPS
    if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
      const hostname = window.location.hostname
      if (hostname === 'todoconvertir.com' || hostname === 'www.todoconvertir.com') {
        return 'https://api.todoconvertir.com'
      }
    }
    // Si estamos en una IP, usar esa IP
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname
      if (hostname.match(/^\d+\.\d+\.\d+\.\d+$/)) {
        return `http://${hostname}:8000`
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
  const [showConversionModal, setShowConversionModal] = useState(false)
  const [showDonationsPage, setShowDonationsPage] = useState(false)
  const [pendingConversion, setPendingConversion] = useState(null)

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
        // No mostrar mensajes en consola para no molestar al usuario
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
    const imageFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'ico', 'tiff']
    const documentFormats = ['pdf', 'docx', 'txt', 'html', 'md', 'rtf', 'odt']
    
    if (!selectedFile) {
      setFileType(null)
      return
    }
    
    if (audioFormats.includes(ext)) {
      setFileType('audio')
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

    // Mostrar modal de publicidad antes de convertir
    // DESACTIVADO TEMPORALMENTE - Para reactivar, descomentar las siguientes líneas:
    // setShowConversionModal(true)
    // setError(null)
    // setDownloadUrl(null)
    // setPendingConversion({ file, outputFormat })
    
    // Iniciar conversión directamente sin modal
    setError(null)
    setDownloadUrl(null)
    setPendingConversion({ file, outputFormat })
    // Usar setTimeout para asegurar que el estado se actualice antes de iniciar la conversión
    setTimeout(() => {
      startConversion()
    }, 100)
  }

  const startConversion = async () => {
    if (!pendingConversion) return

    const { file, outputFormat } = pendingConversion
    
    setLoading(true)
    setProgress(0)
    setError(null)
    setDownloadUrl(null)

    let progressInterval = null

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('output_format', outputFormat)

      // Determinar si es audio (conversiones más lentas)
      const isMediaFile = fileType === 'audio'
      
      // Simular progreso más realista
      if (isMediaFile) {
        // Para audio: progreso más lento y gradual
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
      setPendingConversion(null)
    } catch (err) {
      if (progressInterval) {
        clearInterval(progressInterval)
      }
      
      // Manejo específico de errores de red
      if (err.code === 'ERR_BLOCKED_BY_CLIENT' || err.message.includes('ERR_BLOCKED_BY_CLIENT')) {
        const errorMsg = `🚫 BLOQUEO DETECTADO: El navegador o una extensión está bloqueando las peticiones.\n\n` +
          `El backend está corriendo, pero algo está bloqueando la conexión.\n\n` +
          `Soluciones:\n` +
          `1. Desactiva temporalmente las extensiones de bloqueo (uBlock, AdBlock, etc.)\n` +
          `2. Agrega localhost:8000 a la lista blanca de tu bloqueador\n` +
          `3. Prueba en modo incógnito sin extensiones\n` +
          `4. Verifica la configuración de privacidad del navegador`
        setError(errorMsg)
      } else if (err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED' || err.message.includes('Network Error') || err.message.includes('Failed to fetch')) {
        const errorMsg = `Error de conexión: No se pudo conectar al servidor en ${API_URL}.\n\n` +
          `Por favor verifica:\n` +
          `1. Que el backend esté corriendo (ejecuta: cd backend && py main.py)\n` +
          `2. Que el servidor esté escuchando en el puerto 8000\n` +
          `3. Que no haya un firewall bloqueando la conexión\n` +
          `4. Abre la consola del navegador (F12) para más detalles`
        setError(errorMsg)
      } else if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
        setError('La conversión está tomando demasiado tiempo. Por favor intenta con un archivo más pequeño o verifica tu conexión.')
      } else if (err.response?.status === 400) {
        setError(err.response?.data?.detail || 'Error en la solicitud. Verifica el formato del archivo.')
      } else if (err.response?.status === 500) {
        setError(err.response?.data?.detail || 'Error interno del servidor. Por favor intenta de nuevo.')
      } else {
        setError(err.response?.data?.detail || err.message || `Error al convertir el archivo: ${err.message}`)
      }
      setProgress(0)
      setPendingConversion(null)
    } finally {
      setLoading(false)
    }
  }

  const handleContinueConversion = () => {
    setShowConversionModal(false)
    // Iniciar la conversión después de cerrar el modal
    setTimeout(() => {
      startConversion()
    }, 100)
  }

  const handleDownload = async () => {
    if (!downloadUrl) {
      setError('No hay URL de descarga disponible. Por favor, convierte el archivo nuevamente.')
      return
    }

    // Descargar directamente sin modal
    try {
      try {
        // Intentar descargar directamente usando fetch + blob (más confiable que window.open)
        // Esto evita problemas con popup blockers y es más robusto
        const downloadResponse = await fetch(downloadUrl, {
          method: 'GET',
          headers: {
            'Accept': '*/*',
          },
        })
        
        if (!downloadResponse.ok) {
          if (downloadResponse.status === 404) {
            setError('El archivo ya no está disponible. Por favor, convierte el archivo nuevamente.')
            setDownloadUrl(null)
            return
          }
          throw new Error(`Error al descargar: ${downloadResponse.status} ${downloadResponse.statusText}`)
        }

        const blob = await downloadResponse.blob()
        
        // Verificar que el blob no esté vacío
        if (blob.size === 0) {
          throw new Error('El archivo descargado está vacío')
        }

        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.style.display = 'none'
        
        // Extraer el nombre del archivo de la URL
        const urlParts = downloadUrl.split('/')
        const filename = urlParts[urlParts.length - 1] || 'archivo_convertido'
        a.download = filename
        
        document.body.appendChild(a)
        a.click()
        
        // Limpiar después de un pequeño delay
        setTimeout(() => {
          document.body.removeChild(a)
          window.URL.revokeObjectURL(url)
        }, 100)
      } catch (error) {
        // Fallback: intentar descargar directamente con window.location
        // Esto funciona mejor en algunos navegadores
        try {
          const link = document.createElement('a')
          link.href = downloadUrl
          link.download = downloadUrl.split('/').pop() || 'archivo_convertido'
          link.target = '_blank'
          link.style.display = 'none'
          document.body.appendChild(link)
          link.click()
          setTimeout(() => {
            document.body.removeChild(link)
          }, 100)
        } catch (fallbackError) {
          setError('Error al descargar el archivo. Por favor, intenta nuevamente o convierte el archivo otra vez.')
          setDownloadUrl(null)
        }
      }
    } catch (error) {
      setError('Error al descargar el archivo. Por favor, intenta nuevamente o convierte el archivo otra vez.')
      setDownloadUrl(null)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fondo animado */}
      <AnimatedBackground />
      
      {/* Contenido principal con overlay */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <header className="text-center mb-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex-1 hidden md:block"></div>
            <div className="flex-1 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-shimmer mb-3 drop-shadow-2xl tracking-tight">
                Convertidor de Archivos
                <span className="block text-2xl md:text-3xl lg:text-4xl font-semibold mt-2 text-white/90">
                  Online Gratis
                </span>
              </h1>
            </div>
            <div className="flex-1 flex justify-center md:justify-end">
              <button
                onClick={() => setShowDonationsPage(true)}
                className="group relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 transform hover:scale-110 active:scale-95 text-sm md:text-base font-bold flex items-center space-x-3 overflow-hidden animate-pulse-glow"
                title="Apoya el proyecto con una donación"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <svg className="w-5 h-5 md:w-6 md:h-6 animate-float" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                  <span className="relative">Donaciones</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            </div>
          </div>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto font-medium backdrop-blur-md bg-white/10 rounded-xl px-6 py-3 border border-white/20 shadow-lg">
            Convierte tus archivos de <span className="font-semibold text-blue-300">audio</span>, <span className="font-semibold text-cyan-300">imágenes</span> y <span className="font-semibold text-green-300">documentos</span> de forma rápida y fácil
          </p>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Tutorial Guide */}
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 mb-6 border border-white/10 shadow-2xl">
            <TutorialGuide />
          </div>

          {/* Format Carousel */}
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 mb-6 border border-white/10 shadow-2xl">
            <FormatCarousel />
          </div>
          {/* Step 1 - Upload Section */}
          <div className={`rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-8 mb-6 transition-all duration-300 backdrop-blur-md ${
            !file 
              ? 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-2 border-blue-400/50 shadow-lg shadow-blue-500/30'
              : 'bg-white/10 border-2 border-blue-400/50'
          }`}>
            <h2 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center">
              <span className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mr-3 md:mr-4 text-lg md:text-xl font-bold shadow-xl flex-shrink-0">1</span>
              <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Sube tu archivo</span>
            </h2>
            <FileUploader onFileSelect={handleFileSelect} file={file} />
            {fileType === 'unknown' && file && (
              <div className="mt-4 p-4 backdrop-blur-md bg-red-600/20 rounded-xl border-2 border-red-500/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-500/20 rounded-lg flex-shrink-0">
                    <svg className="w-6 h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-red-200 font-semibold">
                    Formato de archivo no soportado. Por favor selecciona un archivo válido.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Step 2 - Format Selection Section */}
          {file && fileType !== 'unknown' && (
            <div className={`rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-8 mb-6 transition-all duration-300 backdrop-blur-md ${
              !outputFormat
                ? 'bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border-2 border-indigo-400/50 shadow-lg shadow-indigo-500/30'
                : 'bg-white/10 border-2 border-indigo-400/50'
            }`}>
              <h2 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <span className="bg-gradient-to-br from-indigo-400 to-indigo-600 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mr-3 md:mr-4 text-lg md:text-xl font-bold shadow-xl flex-shrink-0">2</span>
                <span className="bg-gradient-to-r from-indigo-300 to-blue-300 bg-clip-text text-transparent">Elige el formato de salida</span>
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
            <div className="rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-8 mb-6 backdrop-blur-md bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-2 border-green-400/50 shadow-lg shadow-green-500/30">
              <h2 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <span className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mr-3 md:mr-4 text-lg md:text-xl font-bold shadow-xl flex-shrink-0">3</span>
                <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">Convierte</span>
              </h2>
              <button
                onClick={handleConvert}
                disabled={loading}
                className="group relative w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-bold py-4 md:py-5 px-6 md:px-8 rounded-xl hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-[1.02] active:scale-[0.98] text-base md:text-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {loading ? (
                  <span className="relative z-10 flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 md:h-6 md:w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Convirtiendo...</span>
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Convertir Archivo</span>
                  </span>
                )}
              </button>
              
              {/* Progress */}
              {loading && (
                <div className="mt-6">
                  <ConversionProgress progress={progress} />
                  {fileType === 'audio' && (
                    <div className="flex items-center justify-center space-x-2 mt-4 p-3 backdrop-blur-md bg-blue-600/20 rounded-xl border border-blue-400/50">
                      <svg className="w-5 h-5 text-blue-300 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm md:text-base text-blue-200 font-medium">
                        La conversión de audio puede tardar varios minutos dependiendo del tamaño del archivo. Por favor espera...
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mt-6 p-5 backdrop-blur-md bg-red-600/20 rounded-xl border-2 border-red-500/50 shadow-lg">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-red-500/20 rounded-lg flex-shrink-0">
                      <svg className="w-6 h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <p className="text-red-200 font-semibold flex-1">{error}</p>
                  </div>
                </div>
              )}

              {/* Download */}
              {downloadUrl && (
                <div className="mt-6 p-6 backdrop-blur-md bg-green-600/20 rounded-xl border-2 border-green-500/50 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-green-500/20 rounded-lg">
                      <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-green-200 font-bold text-base md:text-lg">
                      ¡Conversión completada exitosamente!
                    </p>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="group relative bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 transform hover:scale-110 active:scale-95 overflow-hidden flex items-center justify-center space-x-2 mx-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <svg className="relative z-10 w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="relative z-10">Descargar Archivo</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
        </div>
        
        {/* Footer */}
        <Footer apiInfo={apiInfo} />
      </div>

      {/* Modal de Publicidad antes de Convertir */}
      {/* Modal de publicidad - DESACTIVADO TEMPORALMENTE */}
      {/* Para reactivar, descomentar las siguientes líneas: */}
      {/* <DownloadInfoModal
        isOpen={showConversionModal}
        onClose={() => setShowConversionModal(false)}
        onContinue={handleContinueConversion}
      /> */}

      {/* Página de Donaciones */}
      <DonationsPage
        isOpen={showDonationsPage}
        onClose={() => setShowDonationsPage(false)}
      />
    </div>
  )
}

export default App
