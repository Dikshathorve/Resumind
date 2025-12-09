import { useState } from 'react'
import './Header.css'
import { Sparkles } from 'lucide-react'

export default function Header({ onSignIn, onSignUp }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
          <button className="login-button" onClick={onSignIn}>Sign In</button>
          <button className="cta-button" onClick={onSignUp}>Sign Up</button>
        </div>
        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}
