function ConversionProgress({ progress }) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-blue-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="text-sm md:text-base font-semibold text-white">Progreso</span>
        </div>
        <span className="text-sm md:text-base font-bold text-white bg-white/10 px-3 py-1 rounded-full">{progress}%</span>
      </div>
      <div className="w-full backdrop-blur-md bg-white/10 rounded-full h-3 md:h-4 overflow-hidden border border-white/20 shadow-inner">
        <div
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 h-full rounded-full transition-all duration-300 ease-out shadow-lg relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  )
}

export default ConversionProgress
