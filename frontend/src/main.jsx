import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import LegalPrivacy from './pages/LegalPrivacy.jsx'
import LegalTerms from './pages/LegalTerms.jsx'
import { initGTM } from './utils/gtm'
import './index.css'

// Inicializar Google Tag Manager
initGTM()

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('No se encontró el elemento root')
}

const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/politica-privacidad" element={<LegalPrivacy />} />
        <Route path="/terminos-condiciones" element={<LegalTerms />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

