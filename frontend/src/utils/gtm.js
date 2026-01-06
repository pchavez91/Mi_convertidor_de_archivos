// Inicializar Google Tag Manager
export const initGTM = () => {
  const gtmId = import.meta.env.VITE_GTM_ID
  
  // Si no hay ID configurado, no inicializar GTM
  if (!gtmId) {
    console.log('Google Tag Manager no configurado')
    return
  }
  
  // Inicializar dataLayer
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  })
  
  // Crear y agregar el script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
  document.head.appendChild(script)
  
  // Agregar el iframe noscript al body
  const noscript = document.createElement('noscript')
  const iframe = document.createElement('iframe')
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`
  iframe.height = '0'
  iframe.width = '0'
  iframe.style.display = 'none'
  iframe.style.visibility = 'hidden'
  noscript.appendChild(iframe)
  document.body.insertBefore(noscript, document.body.firstChild)
}
