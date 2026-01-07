import { Hero } from "@/components/Hero"
import { HowToUse } from "@/components/how-to-use"
import { SupportedFormats } from "@/components/supported-formats"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Hero />
      <HowToUse />
      <SupportedFormats />
      <Footer />
    </div>
  )
}
