import { Check, Copy } from 'lucide-react'
import './SuggestionCard.css'

export default function SuggestionCard({ 
  suggestion, 
  onApply, 
  isApplied 
}) {
  const handleCopyOriginal = () => {
    navigator.clipboard.writeText(suggestion.originalText)
  }

  const handleCopySuggested = () => {
    navigator.clipboard.writeText(suggestion.suggestedText)
  }

  const handleApply = () => {
    if (!isApplied && onApply) {
      onApply(suggestion.id)
    }
  }

  return (
    <div className={`suggestion-card ${isApplied ? 'applied' : ''}`}>
      {/* Header with Section Name and Improvement % */}
      <div className="card-header">
        <h4 className="section-title">{suggestion.section}</h4>
        <div className="improvement-badge">
          <span className="improvement-value">{suggestion.improvement}%</span>
          <span className="improvement-label">improvement</span>
        </div>
      </div>

      {/* Original Text */}
      <div className="text-section">
        <div className="text-label">
          <span>Current</span>
          <button 
            className="copy-btn"
            onClick={handleCopyOriginal}
            title="Copy to clipboard"
          >
            <Copy size={14} />
          </button>
        </div>
        <p className="text-content original">{suggestion.originalText}</p>
      </div>

      {/* Suggested Text */}
      <div className="text-section">
        <div className="text-label">
          <span>Suggested</span>
          <button 
            className="copy-btn"
            onClick={handleCopySuggested}
            title="Copy to clipboard"
          >
            <Copy size={14} />
          </button>
        </div>
        <p className="text-content suggested">{suggestion.suggestedText}</p>
      </div>

      {/* Action Button */}
      <button 
        className={`apply-btn ${isApplied ? 'applied' : ''}`}
        onClick={handleApply}
        disabled={isApplied}
      >
        {isApplied ? (
          <>
            <Check size={16} />
            Applied
          </>
        ) : (
          <>
            <Check size={16} />
            Apply Change
          </>
        )}
      </button>
    </div>
  )
}
