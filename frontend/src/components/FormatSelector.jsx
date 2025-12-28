function FormatSelector({ fileType, value, onChange }) {
  const formats = {
    audio: [
      { value: 'mp3', label: 'MP3', desc: 'Formato de audio más común' },
      { value: 'wav', label: 'WAV', desc: 'Audio sin compresión' },
      { value: 'aac', label: 'AAC', desc: 'Alta calidad, menor tamaño' },
      { value: 'ogg', label: 'OGG', desc: 'Formato abierto' },
      { value: 'flac', label: 'FLAC', desc: 'Sin pérdida de calidad' },
    ],
    video: [
      { value: 'mp4', label: 'MP4', desc: 'Formato más compatible' },
      { value: 'avi', label: 'AVI', desc: 'Formato clásico' },
      { value: 'mov', label: 'MOV', desc: 'Formato Apple' },
      { value: 'webm', label: 'WEBM', desc: 'Optimizado para web' },
      { value: 'mkv', label: 'MKV', desc: 'Contenedor flexible' },
    ],
    image: [
      { value: 'jpg', label: 'JPG', desc: 'Fotografías' },
      { value: 'png', label: 'PNG', desc: 'Con transparencia' },
      { value: 'webp', label: 'WEBP', desc: 'Optimizado para web' },
      { value: 'gif', label: 'GIF', desc: 'Animaciones' },
      { value: 'bmp', label: 'BMP', desc: 'Sin compresión' },
      { value: 'svg', label: 'SVG', desc: 'Vectorial' },
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {availableFormats.map((format) => (
        <button
          key={format.value}
          onClick={() => onChange(format.value)}
          className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
            value === format.value
              ? 'border-blue-500 bg-blue-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
          }`}
        >
          <div className="font-semibold text-gray-800 mb-1">{format.label}</div>
          <div className="text-xs text-gray-500">{format.desc}</div>
        </button>
      ))}
    </div>
  )
}

export default FormatSelector

