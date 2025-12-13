import { useState, useRef } from 'react'
import { ChevronLeft } from 'lucide-react'
import './JobMatcher.css'
import HeaderWithUser from '../components/HeaderWithUser'
import ResumeTemplate1 from '../components/ResumeTemplate1'
import ResumeSelector from '../components/ResumeSelector'
import JDInput from '../components/JDInput'
import SuggestionsList from '../components/SuggestionsList'

export default function JobMatcher({ onClose, resumeData }) {
  // Resume data state
  const [selectedResumeType, setSelectedResumeType] = useState('current')
  const [currentResumeData, setCurrentResumeData] = useState(resumeData || {
    personal: {},
    summary: '',
    experiences: [],
    education: [],
    projects: [],
    skills: [],
    certifications: []
  })

  // Job Matcher specific state
  const [jd, setJd] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [accentColor] = useState('#3B82F6')
  const templateRef = useRef(null)

  // Handle JD submission
  const handleJDSubmit = async (jobDescription) => {
    setJd(jobDescription)
    setLoading(true)

    // Simulate API call to analyze resume against JD
    setTimeout(() => {
      const newSuggestions = generateSuggestions(currentResumeData, jobDescription)
      setSuggestions(newSuggestions)
      setLoading(false)
    }, 1500)
  }

  // Mock suggestion generation - would be replaced by actual API
  const generateSuggestions = (resume, jobDescription) => {
    // This is a placeholder that generates mock suggestions
    // In real implementation, this would call backend API
    const mockSuggestions = [
      {
        id: 1,
        section: 'Professional Summary',
        originalText: resume.summary || 'No summary provided',
        suggestedText: 'Experienced professional with proven track record in delivering high-impact solutions aligned with your job requirements.',
        improvement: 23,
        applied: false
      },
      {
        id: 2,
        section: 'Skills',
        originalText: resume.skills?.join(', ') || 'No skills provided',
        suggestedText: 'JavaScript, React, Node.js, SQL, Cloud Computing, Team Leadership',
        improvement: 18,
        applied: false
      },
      {
        id: 3,
        section: 'Professional Experience',
        originalText: 'Current work experience',
        suggestedText: 'Enhanced description emphasizing relevant achievements and metrics',
        improvement: 31,
        applied: false
      }
    ]
    return mockSuggestions
  }

  // Apply a suggestion to the resume
  const handleApplySuggestion = (suggestionId, updatedData) => {
    setCurrentResumeData(updatedData)
    setSuggestions(suggestions.map(s => 
      s.id === suggestionId ? { ...s, applied: true } : s
    ))
  }

  return (
    <div className="job-matcher-page">
      <HeaderWithUser 
        onLogout={onClose} 
        userName="User"
        navActions={<></>}
      />

      <div className="job-matcher-content">
        <div className="job-matcher-header">
          <button className="back-button" onClick={onClose}>
            <ChevronLeft size={20} />
            Back
          </button>
          <h1>Job Matcher</h1>
        </div>

        <div className="job-matcher-inner">
          {/* Left Panel - Controls & Suggestions */}
          <div className="matcher-left">
            {/* Resume Selector */}
            <ResumeSelector 
              selectedType={selectedResumeType}
              onTypeChange={setSelectedResumeType}
            />

            {/* JD Input */}
            <JDInput 
              onSubmit={handleJDSubmit}
              loading={loading}
            />

            {/* Suggestions List */}
            <SuggestionsList 
              suggestions={suggestions}
              loading={loading}
              onApplySuggestion={handleApplySuggestion}
              resumeData={currentResumeData}
            />
          </div>

          {/* Right Panel - Resume Preview */}
          <div className="matcher-right">
            <div className="resume-preview-container" ref={templateRef}>
              <ResumeTemplate1
                personal={currentResumeData.personal}
                summary={currentResumeData.summary}
                experiences={currentResumeData.experiences}
                education={currentResumeData.education}
                projects={currentResumeData.projects}
                skills={currentResumeData.skills}
                certifications={currentResumeData.certifications}
                accentColor={accentColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
