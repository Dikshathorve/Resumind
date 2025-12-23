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
    } else if (suggestion.section?.includes('Professional Experience')) {
      // Extract experience index from section name like "Professional Experience (1)"
      const match = suggestion.section.match(/\((\d+)\)/)
      const expIndex = match ? parseInt(match[1]) - 1 : 0
      
      if (updatedData.experiences && updatedData.experiences.length > expIndex) {
        updatedData.experiences[expIndex].desc = suggestion.suggestedText
      }
    } else if (suggestion.section?.includes('Project')) {
      // Extract project index from section name like "Project (1)"
      const match = suggestion.section.match(/\((\d+)\)/)
      const projIndex = match ? parseInt(match[1]) - 1 : 0
      
      if (updatedData.projects && updatedData.projects.length > projIndex) {
        updatedData.projects[projIndex].description = suggestion.suggestedText
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
