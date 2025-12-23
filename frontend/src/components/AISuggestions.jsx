import { useState, useEffect, useRef } from 'react'
import './AISuggestions.css'
import { X, Lightbulb } from 'lucide-react'

export default function AISuggestions({ isOpen, fieldType, currentValue, onApply, onClose }) {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState(null)
  const modalRef = useRef(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  // Define generateSuggestions function FIRST
  const generateSuggestions = async () => {
    setLoading(true)
    
    // Check if this is a profession field that needs API call
    if (fieldType === 'jobTitle' && currentValue && currentValue.trim()) {
      try {
        // Call backend API for profession recommendations
        const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        const response = await fetch(`${apiBaseUrl}/api/ai/suggest/profession`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ profession: currentValue.trim() })
        })

        if (!response.ok) {
          throw new Error('Failed to get profession recommendations')
        }

        const data = await response.json()
        
        if (data.success && data.data?.recommendations) {
          setSuggestions(data.data.recommendations)
          setLoading(false)
          return
        }
      } catch (error) {
        console.error('Error fetching profession recommendations:', error)
      }
    }

    // Check if this is professional summary field that needs API call
    if (fieldType === 'description' && currentValue && currentValue.trim()) {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        
        // Determine if this is professional summary or experience description
        // Professional summary: no aiFieldIndex, Experience: has aiFieldIndex
        // We'll try summary first, and if it fails, try experience
        
        let response = await fetch(`${apiBaseUrl}/api/ai/enhance/professional-summary`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            summary: currentValue.trim()
          })
        })

        // If professional summary API fails, try experience API
        if (!response.ok) {
          response = await fetch(`${apiBaseUrl}/api/ai/enhance/experience`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              description: currentValue.trim()
            })
          })
        }

        if (!response.ok) {
          throw new Error('Failed to enhance description')
        }

        const data = await response.json()
        
        if (data.success && data.enhanced) {
          setSuggestions([data.enhanced])
          setLoading(false)
          return
        }
      } catch (error) {
        console.error('Error enhancing description:', error)
      }
    }
    
    // Fallback to local suggestions for other field types
    setTimeout(() => {
      const newSuggestions = getAISuggestions(fieldType, currentValue)
      setSuggestions(newSuggestions)
      setLoading(false)
    }, 600)
  }

  // Define getAISuggestions function BEFORE it's used
  const getAISuggestions = (type, value) => {
    const suggestionMap = {
      jobTitle: [
        "Senior " + value,
        value + " Specialist",
        "Lead " + value,
        value + " Manager",
        "Principal " + value
      ],
      company: [
        value + " - Fortune 500 Tech Company",
        value + " - Global Enterprise",
        value + " - Innovation Leader"
      ],
      role: [
        "Led development of " + value,
        "Architected and implemented " + value,
        "Directed strategic initiatives for " + value,
        "Managed cross-functional teams on " + value,
        "Optimized and enhanced " + value
      ],
      description: [
        "Increased efficiency by 40% through " + value,
        "Spearheaded implementation of " + value,
        "Developed innovative solutions using " + value,
        "Improved team productivity with " + value,
        "Successfully deployed " + value
      ],
      school: [
        value + " - Top Tier Institution",
        value + " - Prestigious University"
      ],
      degree: [
        "Bachelor of Science in " + value,
        "Master of Science in " + value,
        "Bachelor of Engineering in " + value,
        "Master of Business Administration - " + value
      ],
      skills: [
        value + " - Advanced Level",
        value + " - Expert Level",
        value + " - Professional"
      ]
    }

    return suggestionMap[type] || []
  }

  useEffect(() => {
    // Only generate suggestions when the sidebar is opened, not on every keystroke
    if (isOpen && currentValue && currentValue.trim()) {
      generateSuggestions()
    } else {
      setSuggestions([])
    }
  }, [isOpen])

  // Position modal at top of builder-right section
  useEffect(() => {
    if (isOpen) {
      const builderRight = document.querySelector('.builder-right')
      
      if (builderRight) {
        const rect = builderRight.getBoundingClientRect()
        const newPos = {
          top: rect.top + window.scrollY + 16,
          left: rect.left + 16
        }
        setPosition(newPos)
      }
    }

    const handleClickOutside = (e) => {
      if (modalRef?.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div 
      ref={modalRef}
      className="ai-suggestions-sidebar"
      style={{ 
        position: 'fixed',
        top: `${position.top}px`, 
        left: `${position.left}px`,
        zIndex: 1000
      }}
    >
      <div className="ai-suggestions-header-sidebar">
        <div className="ai-title-sidebar">
          <span className="ai-icon-sidebar">✨</span>
          <h3>AI Suggestions</h3>
        </div>
        <button className="ai-close-btn-sidebar" onClick={onClose} aria-label="Close">✕</button>
      </div>

      <div className="ai-content-sidebar">
        <p className="ai-subtitle-sidebar">ATS-optimized suggestions for your {fieldType || 'Content'}</p>

        {loading ? (
          <div className="ai-loading-sidebar">
            <div className="ai-spinner-sidebar"></div>
            <p>Generating suggestions...</p>
          </div>
        ) : (
          <>
            {suggestions.length ? (
              <div className="ai-suggestions-list-sidebar">
                {suggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    className={`ai-suggestion-item-sidebar ${selectedSuggestion === idx ? 'selected' : ''}`}
                    onClick={() => setSelectedSuggestion(idx)}
                  >
                    <div className="suggestion-radio-sidebar">
                      {selectedSuggestion === idx && <div className="suggestion-dot-sidebar"></div>}
                    </div>
                    <div className="suggestion-text-sidebar">{suggestion}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="ai-no-suggestions-sidebar">
                <Lightbulb size={48} />
                <p>Click on a field to get AI suggestions</p>
              </div>
            )}
          </>
        )}

        <div className="ai-tip-section-sidebar">
          <div className="tip-icon-sidebar">💡</div>
          <div className="tip-content-sidebar">
            <h4>ATS Tip</h4>
            <p>Use action verbs and quantifiable achievements to make your resume stand out to ATS systems.</p>
          </div>
        </div>
      </div>

      <div className="ai-footer-sidebar">
        {selectedSuggestion !== null && (
          <button 
            className="ai-btn-apply-sidebar"
            onClick={() => {
              onApply(suggestions[selectedSuggestion])
              setSelectedSuggestion(null)
            }}
          >
            Apply Suggestion
          </button>
        )}
      </div>
    </div>
  )
}
