import { useState } from 'react'
import { Send } from 'lucide-react'
import './JDInput.css'

export default function JDInput({ onSubmit, loading }) {
  const [jdText, setJdText] = useState('')
  const [charCount, setCharCount] = useState(0)

  const handleChange = (e) => {
    const text = e.target.value
    setJdText(text)
    setCharCount(text.length)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (jdText.trim()) {
      onSubmit(jdText)
      setJdText('')
      setCharCount(0)
    }
  }

  return (
    <div className="jd-input">
      <h3>Paste Job Description</h3>
      <p className="jd-helper">Paste the job description to analyze compatibility with your resume</p>
      
      <form onSubmit={handleSubmit} className="jd-form">
        <div className="textarea-wrapper">
          <textarea
            value={jdText}
            onChange={handleChange}
            placeholder="Paste the complete job description here..."
            className="jd-textarea"
            rows={8}
            disabled={loading}
          />
          <div className="char-count">{charCount} / 10000</div>
        </div>

        <button 
          type="submit"
          className="submit-btn"
          disabled={!jdText.trim() || loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Analyzing...
            </>
          ) : (
            <>
              <Send size={18} />
              Analyze Resume
            </>
          )}
        </button>
      </form>
    </div>
  )
}
