import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ResumePreview from './components/ResumePreview'
import FeaturesSection from './components/FeaturesSection'
import HowItWorks from './components/HowItWorks'
import FAQ from './components/FAQ'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Header />
      <HeroSection />
      <ResumePreview />
      <FeaturesSection />
      <HowItWorks />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  )
}

export default App
