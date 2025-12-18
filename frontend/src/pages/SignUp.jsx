import { useState } from 'react'
import { X, User, Mail, Lock } from 'lucide-react'
import './SignUp.css'

export default function SignUp({ onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Signup:', formData)
  }

  return (
    <div className="signup-page">
      {/* Full-screen blur background */}
      <div className="signup-backdrop" onClick={onClose}></div>

      {/* Modal form */}
      <div className="signup-modal">
        <button className="signup-close" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>

        <div className="signup-content">
          <h2 className="signup-title">Create Account</h2>
          <p className="signup-subtitle">Join Resumind to build your perfect resume</p>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="signup-form-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="signup-input-wrapper">
                <User size={18} className="signup-input-icon" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="signup-form-group">
              <label htmlFor="email">Email Address</label>
              <div className="signup-input-wrapper">
                <Mail size={18} className="signup-input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="signup-form-group">
              <label htmlFor="password">Password</label>
              <div className="signup-input-wrapper">
                <Lock size={18} className="signup-input-icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="signup-form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="signup-input-wrapper">
                <Lock size={18} className="signup-input-icon" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="signup-button">Create Account</button>
          </form>

          <p className="signup-footer">
            Already have an account? <a href="#signin">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  )
}
