function FormatSelector({ fileType, value, onChange }) {
  const getFormatIcon = (format) => {
    const icons = {
      // Audio
      mp3: '🎵', wav: '🎵', aac: '🎵', ogg: '🎵', flac: '🎵', m4a: '🎵', wma: '🎵',
      // Image
      jpg: '🖼️', png: '🖼️', webp: '🖼️', gif: '🖼️', bmp: '🖼️', ico: '🖼️', tiff: '🖼️',
      // Document
      txt: '📄', html: '🌐', pdf: '📕', docx: '📘', md: '📝'
    }
    return icons[format] || '📎'
  }

  const formats = {
    audio: [
      { value: 'mp3', label: 'MP3', desc: 'Formato más común' },
      { value: 'wav', label: 'WAV', desc: 'Sin compresión' },
      { value: 'aac', label: 'AAC', desc: 'Alta calidad' },
      { value: 'ogg', label: 'OGG', desc: 'Formato abierto' },
      { value: 'flac', label: 'FLAC', desc: 'Sin pérdida' },
      { value: 'm4a', label: 'M4A', desc: 'Formato Apple' },
      { value: 'wma', label: 'WMA', desc: 'Windows Media' },
    ],
    image: [
      { value: 'jpg', label: 'JPG', desc: 'Fotografías' },
      { value: 'png', label: 'PNG', desc: 'Con transparencia' },
      { value: 'webp', label: 'WEBP', desc: 'Optimizado web' },
      { value: 'gif', label: 'GIF', desc: 'Animaciones' },
      { value: 'bmp', label: 'BMP', desc: 'Sin compresión' },
      { value: 'ico', label: 'ICO', desc: 'Iconos Windows' },
      { value: 'tiff', label: 'TIFF', desc: 'Alta calidad' },
    ],
    document: [
      { value: 'txt', label: 'TXT', desc: 'Texto plano' },
      { value: 'html', label: 'HTML', desc: 'Página web' },
      { value: 'pdf', label: 'PDF', desc: 'Documento portable' },
      { value: 'docx', label: 'DOCX', desc: 'Word' },
      { value: 'md', label: 'Markdown', desc: 'Markdown' },
    ],
  }

  const availableFormats = formats[fileType] || []

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {availableFormats.map((format) => (
        <button
          key={format.value}
          onClick={() => onChange(format.value)}
          className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:scale-105 ${
            value === format.value
              ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg transform scale-105'
              : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
          }`}
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getFormatIcon(format.value)}</span>
            <div className="flex-1">
              <div className="font-bold text-gray-800 text-lg mb-1">{format.label}</div>
              <div className="text-xs text-gray-500">{format.desc}</div>
            </div>
            {value === format.value && (
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}

export default FormatSelector
