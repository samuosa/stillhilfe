import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './components/Header'
import Hero from './components/Hero'
import BrochureGrid from './components/BrochureGrid'
import Footer from './components/Footer'

function App() {
  const { i18n } = useTranslation()
  const [brochures, setBrochures] = useState([])
  const [availableLanguages, setAvailableLanguages] = useState(['en', 'de'])

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/brochures.json`)
      .then(res => res.json())
      .then(data => {
        setBrochures(data.brochures || [])
        if (data.languages && data.languages.length > 0) {
          setAvailableLanguages(data.languages)
        }
      })
      .catch(() => {
        // Fallback: no brochures yet
        setBrochures([])
      })
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Background glow orbs */}
      <div className="glow-orb w-[600px] h-[600px] bg-brand-500 -top-40 -left-40 fixed" />
      <div className="glow-orb w-[500px] h-[500px] bg-warm-500 top-1/3 -right-60 fixed" />
      <div className="glow-orb w-[400px] h-[400px] bg-sage-500 bottom-0 left-1/4 fixed" />

      <Header languages={availableLanguages} />
      <main>
        <Hero />
        <div className="section-divider" />
        <BrochureGrid brochures={brochures} />
      </main>
      <Footer />
    </div>
  )
}

export default App
