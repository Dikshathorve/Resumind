import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import ResumePreview from '../components/ResumePreview'
import FeaturesSection from '../components/FeaturesSection'
import HowItWorks from '../components/HowItWorks'
import FAQ from '../components/FAQ'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function LandingPage({ onStart, onSignIn, onSignUp, onLogout }) {
  return (
    <>
      <Header onSignIn={onSignIn} onSignUp={onSignUp} onLogout={onLogout} />
      <HeroSection onStart={onStart} onSignUp={onSignUp} />
      <ResumePreview />
      <FeaturesSection />
      <HowItWorks />
      <FAQ />
      <CTASection onStart={onStart} onSignUp={onSignUp} />
      <Footer />
    </>
  )
}
