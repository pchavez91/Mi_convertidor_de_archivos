import { useState, useCallback, useEffect } from 'react'
import FileUploader from './components/FileUploader'
import FormatSelector from './components/FormatSelector'
import ConversionProgress from './components/ConversionProgress'
import axios from 'axios'

// Detectar la URL del API automáticamente
const getApiUrl = () => {
  // Si estamos en desarrollo, usar localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8000'
  }
  // Si estamos accediendo desde la red local, usar la misma IP pero puerto 8000
  const hostname = window.location.hostname
  return `http://${hostname}:8000`
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

  // Obtener información del servidor al cargar
  useEffect(() => {
    axios.get(`${API_URL}/`)
      .then(response => {
        setApiInfo(response.data)
      })
      .catch(() => {
        // Silenciar errores de conexión
      })
  }, [])

  const handleFileSelect = useCallback((selectedFile) => {
    setFile(selectedFile)
    setDownloadUrl(null)
    setError(null)
    setOutputFormat('')
    
    // Determinar tipo de archivo
    const ext = selectedFile.name.split('.').pop().toLowerCase()
    const audioFormats = ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'wma']
    const videoFormats = ['mp4', 'avi', 'mov', 'mkv', 'webm', 'flv', 'wmv', 'm4v']
    const imageFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'ico', 'tiff']
    const documentFormats = ['pdf', 'docx', 'txt', 'html', 'md', 'rtf', 'odt']
    
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
      window.open(downloadUrl, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Convertidor de Archivos
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Convierte tus archivos de audio, video, imágenes y documentos de forma rápida y fácil
          </p>
          {apiInfo && apiInfo.local_ip && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && (
            <p className="text-sm text-blue-600 mt-2">
              🌐 Accediendo desde la red local - IP del servidor: {apiInfo.local_ip}
            </p>
          )}
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            {/* Step 1: Upload */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Paso 1: Sube tu archivo
              </h2>
              <FileUploader onFileSelect={handleFileSelect} />
              {file && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Archivo seleccionado:</span> {file.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Tamaño: {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>

            {/* Step 2: Format Selection */}
            {file && fileType !== 'unknown' && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Paso 2: Elige el formato de salida
                </h2>
                <FormatSelector
                  fileType={fileType}
                  value={outputFormat}
                  onChange={setOutputFormat}
                />
              </div>
            )}

            {fileType === 'unknown' && (
              <div className="mb-8 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-700">
                  Formato de archivo no soportado. Por favor selecciona un archivo válido.
                </p>
              </div>
            )}

            {/* Step 3: Convert */}
            {file && outputFormat && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Paso 3: Convierte
                </h2>
                <button
                  onClick={handleConvert}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  {loading ? 'Convirtiendo...' : 'Convertir Archivo'}
                </button>
              </div>
            )}

            {/* Progress */}
            {loading && (
              <div>
                <ConversionProgress progress={progress} />
                {(fileType === 'audio' || fileType === 'video') && (
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    ⏳ La conversión de {fileType === 'audio' ? 'audio' : 'video'} puede tardar varios minutos dependiendo del tamaño del archivo. Por favor espera...
                  </p>
                )}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Download */}
            {downloadUrl && (
              <div className="mt-6 p-6 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-700 font-semibold mb-4">
                  ¡Conversión completada exitosamente!
                </p>
                <button
                  onClick={handleDownload}
                  className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Descargar Archivo
                </button>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Formatos Soportados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">🎵 Audio</h3>
                <p className="text-sm text-gray-600">MP3, WAV, AAC, OGG, FLAC, M4A</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">🎬 Video</h3>
                <p className="text-sm text-gray-600">MP4, AVI, MOV, MKV, WEBM</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg">
                <h3 className="font-semibold text-pink-800 mb-2">🖼️ Imágenes</h3>
                <p className="text-sm text-gray-600">JPG, PNG, WEBP, GIF, BMP, ICO, TIFF</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">📄 Documentos</h3>
                <p className="text-sm text-gray-600">PDF, DOCX, TXT, HTML, MD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

