import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import HowItWorks from './components/HowItWorks'
import FAQ from './components/FAQ'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import BuildResume from './components/BuildResume'

function App() {
  const [showBuilder, setShowBuilder] = useState(false)

  return (
    <div className="app">
      {!showBuilder && <Header />}
      {!showBuilder ? (
        <>
          <HeroSection onStart={() => setShowBuilder(true)} />
          <FeaturesSection />
          <HowItWorks />
          <FAQ />
          <CTASection onStart={() => setShowBuilder(true)} />
          <Footer />
        </>
      ) : (
        <BuildResume onClose={() => setShowBuilder(false)} />
      )}
    </div>
  )
}

export default App
