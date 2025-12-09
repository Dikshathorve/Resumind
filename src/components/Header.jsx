import { useState } from 'react'
import './Header.css'
import { Sparkles } from 'lucide-react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showSignUpForm, setShowSignUpForm] = useState(false)

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <div className="logo-icon">
            <Sparkles size={20} color="#ffffff" />
          </div>
          <h1>Resumind</h1>
        </div>
        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="header-actions">
          <button className="login-button" onClick={() => setShowLoginForm(true)}>Sign In</button>
          <button className="cta-button" onClick={() => setShowSignUpForm(true)}>Sign Up</button>
        </div>
        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
      {showSignUpForm && <SignUpForm onClose={() => setShowSignUpForm(false)} />}
    </header>
  )
}
