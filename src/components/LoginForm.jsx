import { useState } from 'react'
import './LoginForm.css'

export default function LoginForm({ onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login:', { email, password })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="form-container">
          <h2>Sign In to Resumind</h2>
          <p className="form-subtitle">Welcome back! Sign in to your account</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-btn">Sign In</button>
          </form>

          <p className="form-footer">
            Don't have an account? <a href="#signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  )
}
