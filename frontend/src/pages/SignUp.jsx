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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Signup failed')
        setLoading(false)
        return
      }

      setSuccess('Account created successfully!')
      console.log('User created:', data.user)
      
      // Clear form
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Signup error:', err)
    } finally {
      setLoading(false)
    }
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

          {error && <div className="signup-error">{error}</div>}
          {success && <div className="signup-success">{success}</div>}

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

            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="signup-footer">
            Already have an account? <a href="#signin">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  )
}
