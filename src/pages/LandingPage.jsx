import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import ResumePreview from '../components/ResumePreview'
import FeaturesSection from '../components/FeaturesSection'
import HowItWorks from '../components/HowItWorks'
import FAQ from '../components/FAQ'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function LandingPage({ onStart, onSignIn, onSignUp }) {
  return (
    <>
      <Header onSignIn={onSignIn} onSignUp={onSignUp} />
      <HeroSection onStart={onStart} />
      <ResumePreview />
      <FeaturesSection />
      <HowItWorks />
      <FAQ />
      <CTASection onStart={onStart} />
      <Footer />
    </>
  )
}
