import { useState } from 'react'
import { X, Mail, Lock } from 'lucide-react'
import './SignIn.css'

export default function SignIn({ onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login:', { email, password })
  }

  return (
    <div className="signin-page">
      {/* Full-screen blur background */}
      <div className="signin-backdrop" onClick={onClose}></div>

      {/* Modal form */}
      <div className="signin-modal">
        <button className="signin-close" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>

        <div className="signin-content">
          <h2 className="signin-title">Welcome Back</h2>
          <p className="signin-subtitle">Login to your account</p>

          <form onSubmit={handleSubmit} className="signin-form">
            <div className="signin-form-group">
              <label htmlFor="email">Email Address</label>
              <div className="signin-input-wrapper">
                <Mail size={18} className="signin-input-icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="signin-form-group">
              <label htmlFor="password">Password</label>
              <div className="signin-input-wrapper">
                <Lock size={18} className="signin-input-icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="signin-button">Login</button>
          </form>

          <p className="signin-footer">
            Don't have an account? <a href="#signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  )
}
