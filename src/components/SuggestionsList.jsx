import { AlertCircle } from 'lucide-react'
import SuggestionCard from './SuggestionCard'
import './SuggestionsList.css'

export default function SuggestionsList({ 
  suggestions, 
  loading, 
  onApplySuggestion,
  resumeData 
}) {
  const handleApplySuggestion = (suggestionId) => {
    // Create updated resume data based on suggestion
    const suggestion = suggestions.find(s => s.id === suggestionId)
    let updatedData = { ...resumeData }

    // Update the appropriate field based on section
    if (suggestion.section === 'Professional Summary') {
      updatedData.summary = suggestion.suggestedText
    } else if (suggestion.section === 'Skills') {
      updatedData.skills = suggestion.suggestedText.split(',').map(s => s.trim())
    } else if (suggestion.section === 'Professional Experience') {
      // Update first experience's description
      if (updatedData.experiences && updatedData.experiences.length > 0) {
        updatedData.experiences[0].description = suggestion.suggestedText
      }
    }

    onApplySuggestion(suggestionId, updatedData)
  }

  return (
    <div className="suggestions-list">
      <h3>Optimization Suggestions</h3>

      {loading && (
        <div className="loading-state">
          <div className="loader"></div>
          <p>Analyzing your resume against the job description...</p>
        </div>
      )}

      {!loading && suggestions.length === 0 && (
        <div className="empty-state">
          <AlertCircle size={40} />
          <p>Paste a job description to get personalized suggestions</p>
        </div>
      )}

      {!loading && suggestions.length > 0 && (
        <div className="cards-container">
          {suggestions.map(suggestion => (
            <SuggestionCard
              key={suggestion.id}
              suggestion={suggestion}
              onApply={() => handleApplySuggestion(suggestion.id)}
              isApplied={suggestion.applied}
            />
          ))}
        </div>
      )}
    </div>
  )
}
