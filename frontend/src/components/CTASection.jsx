import './CTASection.css'
import { useAuth } from '../context/AuthContext'

export default function CTASection({ onStart, onSignUp }) {
  const { isAuthenticated } = useAuth()

  const handleClick = () => {
    if (isAuthenticated) {
      onStart()
    } else {
      onSignUp()
    }
  }

  return (
    <section className="cta">
      <div className="cta-wrapper">
        <div className="cta-content">
          <h2>Ready to build your <span className="gradient-text">perfect resume?</span></h2>
          <p>Join thousands of professionals who landed their dream jobs with ResumeAI. Start for free today.</p>
          <div className="cta-buttons">
            <button className="cta-primary-button" onClick={handleClick}>
              Start Building Free <span className="arrow">→</span>
            </button>
          </div>
          <p className="cta-footer-text">No credit card required • Free forever plan available</p>
        </div>
      </div>
    </section>
  )
}
