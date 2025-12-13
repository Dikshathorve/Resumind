import { useState, useEffect } from 'react'
import './AISuggestions.css'
import { X, Lightbulb } from 'lucide-react'

export default function AISuggestions({ fieldType, currentValue, onApply, onClose }) {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState(null)

  useEffect(() => {
    if (currentValue && currentValue.trim()) {
      generateSuggestions()
    } else {
      setSuggestions([])
    }
  }, [currentValue, fieldType])

  const generateSuggestions = async () => {
    setLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      const newSuggestions = getAISuggestions(fieldType, currentValue)
      setSuggestions(newSuggestions)
      setLoading(false)
    }, 600)
  }

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
        "Reduced costs by 30% by implementing " + value,
        "Improved user experience with " + value,
        "Scaled infrastructure supporting " + value,
        "Led adoption of best practices in " + value,
        "Mentored 5+ team members in " + value
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
      skill: [
        value + " (Expert)",
        value + " - Advanced",
        value + " (Certified)",
        value + " - Professional"
      ]
    }

    return suggestionMap[type] || []
  }

  return (
    <div className="ai-suggestions-sidebar">
      <div className="ai-suggestions-header-sidebar">
        <div className="ai-title-sidebar">
          <span className="ai-icon-sidebar">✨</span>
          <h3>AI Suggestions</h3>
        </div>
        <div>
          <button className="ai-close-btn-sidebar" onClick={onClose} aria-label="Close">✕</button>
        </div>
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
