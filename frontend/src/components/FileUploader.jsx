import { useCallback, useState } from 'react'

function FileUploader({ onFileSelect, file }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      const selectedFile = files[0]
      const MAX_SIZE = 50 * 1024 * 1024 // 50 MB
      
      if (selectedFile.size > MAX_SIZE) {
        alert(`El archivo es demasiado grande. Tamaño máximo permitido: 50 MB. Tu archivo: ${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`)
        return
      }
      
      onFileSelect(selectedFile)
    }
  }, [onFileSelect])

  const handleFileInput = useCallback((e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      const selectedFile = files[0]
      const MAX_SIZE = 50 * 1024 * 1024 // 50 MB
      
      if (selectedFile.size > MAX_SIZE) {
        alert(`El archivo es demasiado grande. Tamaño máximo permitido: 50 MB. Tu archivo: ${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`)
        e.target.value = '' // Limpiar el input
        return
      }
      
      onFileSelect(selectedFile)
    }
  }, [onFileSelect])

  const getFileIcon = (filename) => {
    if (!filename) return null
    
    const ext = filename.split('.').pop().toLowerCase()
    const audioFormats = ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'wma']
    const imageFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'ico', 'tiff']
    const documentFormats = ['pdf', 'docx', 'txt', 'html', 'md', 'rtf', 'odt']
    
    if (audioFormats.includes(ext)) {
      return '🎵'
    } else if (imageFormats.includes(ext)) {
      return '🖼️'
    } else if (documentFormats.includes(ext)) {
      return '📄'
    }
    return '📎'
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / 1024 / 1024).toFixed(2) + ' MB'
  }

  if (file) {
    return (
      <div className="border-2 border-blue-300 bg-blue-50 rounded-xl p-6">
        <div className="flex items-center space-x-4">
          <div className="text-5xl">{getFileIcon(file.name)}</div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{file.name}</h3>
            <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
          </div>
          <button
            onClick={() => onFileSelect(null)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Cambiar archivo"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
        isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center">
        <svg
          className="w-10 h-10 text-gray-400 mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="text-base font-semibold text-gray-700 mb-2">
          Arrastra y suelta tu archivo aquí
        </p>
        <p className="text-xs text-gray-500 mb-3">o</p>
        <label className="cursor-pointer">
          <span className="inline-block bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg text-sm">
            Seleccionar archivo
          </span>
          <input
            type="file"
            className="hidden"
            onChange={handleFileInput}
            accept="*/*"
          />
        </label>
        <p className="text-xs text-gray-400 mt-3">
          Tamaño máximo: 50 MB
        </p>
      </div>
    </div>
  )
}

export default FileUploader
