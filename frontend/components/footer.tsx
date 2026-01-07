"use client"

import { useState } from "react"
import { Linkedin, FileText, Shield, Github } from "lucide-react"
import AnimatedFooter from "./ui/animated-footer"
import { LegalPrivacyDialog } from "./legal-privacy-dialog"
import { LegalTermsDialog } from "./legal-terms-dialog"

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)

  return (
    <>
      <AnimatedFooter
        links={[
          {
            href: "https://github.com/pchavez91",
            label: "GitHub",
            icon: <Github className="w-4 h-4" />,
          },
          {
            href: "https://www.linkedin.com/in/patricio-chavez-005b83352/",
            label: "LinkedIn",
            icon: <Linkedin className="w-4 h-4" />,
          },
          {
            href: "#",
            label: "Política de Privacidad",
            icon: <Shield className="w-4 h-4" />,
            onClick: (e: React.MouseEvent) => {
              e.preventDefault()
              setPrivacyOpen(true)
            },
          },
          {
            href: "#",
            label: "Términos y Condiciones",
            icon: <FileText className="w-4 h-4" />,
            onClick: (e: React.MouseEvent) => {
              e.preventDefault()
              setTermsOpen(true)
            },
          },
        ]}
        copyrightText="Patricio Chavez, todos los derechos reservados."
        barCount={23}
      />
      <LegalPrivacyDialog open={privacyOpen} onOpenChange={setPrivacyOpen} />
      <LegalTermsDialog open={termsOpen} onOpenChange={setTermsOpen} />
    </>
  )
}
