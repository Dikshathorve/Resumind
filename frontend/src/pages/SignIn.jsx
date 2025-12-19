import { useState } from 'react'
import { X, Mail, Lock } from 'lucide-react'
import './SignIn.css'

export default function SignIn({ onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Login failed')
        setLoading(false)
        return
      }

      setSuccess('Logged in successfully!')
      console.log('User logged in:', data.user)
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('isAuthenticated', 'true')

      // Clear form
      setFormData({
        email: '',
        password: '',
      })

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose()
        // You can dispatch a login action here if using Redux/Context
      }, 2000)
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Signin error:', err)
    } finally {
      setLoading(false)
    }
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

          {error && <div className="signin-error">{error}</div>}
          {success && <div className="signin-success">{success}</div>}

          <form onSubmit={handleSubmit} className="signin-form">
            <div className="signin-form-group">
              <label htmlFor="email">Email Address</label>
              <div className="signin-input-wrapper">
                <Mail size={18} className="signin-input-icon" />
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

            <div className="signin-form-group">
              <label htmlFor="password">Password</label>
              <div className="signin-input-wrapper">
                <Lock size={18} className="signin-input-icon" />
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

            <button type="submit" className="signin-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="signin-footer">
            Don't have an account? <a href="#signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  )
}
