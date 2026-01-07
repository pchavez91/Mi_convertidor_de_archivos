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
      return (
        <svg className="w-10 h-10 md:w-12 md:h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      )
    } else if (imageFormats.includes(ext)) {
      return (
        <svg className="w-10 h-10 md:w-12 md:h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    } else if (documentFormats.includes(ext)) {
      return (
        <svg className="w-10 h-10 md:w-12 md:h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
    return (
      <svg className="w-10 h-10 md:w-12 md:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
      </svg>
    )
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / 1024 / 1024).toFixed(2) + ' MB'
  }

  if (file) {
    return (
      <div className="backdrop-blur-md bg-white/10 border-2 border-blue-400/50 rounded-xl p-4 md:p-6">
        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="flex-shrink-0">
            {getFileIcon(file.name)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm md:text-base font-semibold text-white mb-1 truncate">{file.name}</h3>
            <p className="text-xs md:text-sm text-gray-300">{formatFileSize(file.size)}</p>
          </div>
          <button
            onClick={() => onFileSelect(null)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
            title="Cambiar archivo"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-300 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-6 md:p-8 text-center transition-all duration-300 ${
        isDragging
          ? 'border-blue-400 bg-blue-500/20 backdrop-blur-md'
          : 'border-white/30 bg-white/5 backdrop-blur-sm hover:border-blue-400/50 hover:bg-white/10'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center">
        <div className={`p-4 rounded-full mb-4 transition-all duration-300 ${
          isDragging ? 'bg-blue-500/20' : 'bg-white/10'
        }`}>
          <svg
            className={`w-10 h-10 md:w-12 md:h-12 transition-colors ${
              isDragging ? 'text-blue-300' : 'text-gray-300'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <p className="text-base md:text-lg font-semibold text-white mb-2">
          Arrastra y suelta tu archivo aquí
        </p>
        <p className="text-xs md:text-sm text-gray-300 mb-4">o</p>
        <label className="cursor-pointer">
          <span className="group inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-2.5 md:py-3 px-5 md:px-6 rounded-lg hover:from-blue-400 hover:to-cyan-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            <span>Seleccionar archivo</span>
          </span>
          <input
            type="file"
            className="hidden"
            onChange={handleFileInput}
            accept="*/*"
          />
        </label>
        <p className="text-xs md:text-sm text-gray-400 mt-4">
          Tamaño máximo: 50 MB
        </p>
      </div>
    </div>
  )
}

export default FileUploader
