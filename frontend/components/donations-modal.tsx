"use client"

import { useState } from "react"
import { X, Copy, Check, ChevronRight } from "lucide-react"

interface DonationsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DonationsModal({ isOpen, onClose }: DonationsModalProps) {
  const [copied, setCopied] = useState(false)
  const cryptoAddress = "0x5031B4507FA5f8586a9Db673F1a6CAb85B21F7da"

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cryptoAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white mb-2">Donaciones</h2>
          <p className="text-sm text-white/60">
            ¡Gracias por tu apoyo! Este servicio es gratuito gracias a usuarios como tú. Tu donación nos ayuda a
            mantener y mejorar el servicio.
          </p>
        </div>

        {/* Donation options */}
        <div className="space-y-3">
          {/* PayPal */}
          <a
            href="https://www.paypal.com/paypalme/pachavez91"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                <span className="text-xl">💳</span>
              </div>
              <div>
                <p className="font-medium text-white">PayPal</p>
                <p className="text-xs text-white/50">Donación segura con PayPal</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors" />
          </a>

          {/* MercadoPago $2,000 CLP */}
          <a
            href="https://www.mercadopago.cl/checkout/v1/payment/redirect/04f63ff0-58aa-42dd-adc3-3be520f64170/review/?source=link&preference-id=137425546-e9c4ca08-0759-472b-aef4-8377e3cd54f1&router-request-id=d7bf63b3-c111-47bf-98ca-0bbfeacdc10f&p=2ca962575a15d6437170435cbcc70f34"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-600/20 flex items-center justify-center">
                <span className="text-xl">💳</span>
              </div>
              <div>
                <p className="font-medium text-white">MercadoPago</p>
                <p className="text-xs text-white/50">Donación de $2,000 CLP</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors" />
          </a>

          {/* MercadoPago $5,000 CLP */}
          <a
            href="https://www.mercadopago.cl/payment-link/v1/redirect?link-id=2f72a8f7-5482-45da-ba6e-810e12b9d5a8&source=link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-600/20 flex items-center justify-center">
                <span className="text-xl">💳</span>
              </div>
              <div>
                <p className="font-medium text-white">MercadoPago</p>
                <p className="text-xs text-white/50">Donación de $5,000 CLP</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors" />
          </a>

          {/* Crypto */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-600/20 flex items-center justify-center">
                <span className="text-xl">₿</span>
              </div>
              <div>
                <p className="font-medium text-white">Criptomoneda</p>
                <p className="text-xs text-white/50">ETH/BNB/Polygon</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs text-white/70 bg-black/30 rounded-lg px-3 py-2 overflow-x-auto">
                {cryptoAddress}
              </code>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="mt-4 text-xs text-white/40 text-center">
          💡 Nota: Las donaciones son opcionales. El servicio seguirá siendo gratuito.
        </p>
      </div>
    </div>
  )
}
