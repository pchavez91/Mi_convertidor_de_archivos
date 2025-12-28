import { useCallback, useState } from 'react'

function FileUploader({ onFileSelect }) {
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
      onFileSelect(files[0])
    }
  }, [onFileSelect])

  const handleFileInput = useCallback((e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      onFileSelect(files[0])
    }
  }, [onFileSelect])

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
        isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center">
        <svg
          className="w-16 h-16 text-gray-400 mb-4"
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
        <p className="text-lg font-semibold text-gray-700 mb-2">
          Arrastra y suelta tu archivo aquí
        </p>
        <p className="text-sm text-gray-500 mb-4">o</p>
        <label className="cursor-pointer">
          <span className="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
            Seleccionar archivo
          </span>
          <input
            type="file"
            className="hidden"
            onChange={handleFileInput}
            accept="*/*"
          />
        </label>
        <p className="text-xs text-gray-400 mt-4">
          Tamaño máximo: 100 MB
        </p>
      </div>
    </div>
  )
}

export default FileUploader

