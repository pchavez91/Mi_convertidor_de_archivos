// Inicializar Google Analytics (gtag.js)
export const initGoogleAnalytics = () => {
  const gaId = import.meta.env.VITE_GA_ID
  
  // Si no hay ID configurado, no inicializar Google Analytics
  if (!gaId) {
    console.log('Google Analytics no configurado')
    return
  }
  
  // Inicializar dataLayer
  window.dataLayer = window.dataLayer || []
  
  // Función gtag
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  
  // Crear y agregar el script de gtag.js
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.appendChild(script)
  
  // Configurar Google Analytics
  gtag('js', new Date())
  gtag('config', gaId)
}
