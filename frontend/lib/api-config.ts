// Detectar la URL del API automáticamente
export const getApiUrl = (): string => {
  try {
    // En producción, usar la variable de entorno
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_URL) {
      return process.env.NEXT_PUBLIC_API_URL
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
    
    // Si estamos accediendo desde una IP de red (ej: 192.168.100.150:3000)
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

export const API_URL = getApiUrl()

