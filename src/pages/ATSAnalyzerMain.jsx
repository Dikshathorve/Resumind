import { useState } from 'react'
import './ATSAnalyzerMain.css'
import { ArrowLeft } from 'lucide-react'
import ATSAnalyzerHeader from '../components/ATSAnalyzerHeader'
import ATSAnalyzerUpload from '../components/ATSAnalyzerUpload'
import ATSAnalyzerResults from '../components/ATSAnalyzerResults'

export default function ATSAnalyzerMain({ onClose }) {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [analysisResults, setAnalysisResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [jobDescription, setJobDescription] = useState('')

  const handleFileUpload = (file) => {
    setUploadedFile(file)
  }

  const handleJobDescriptionChange = (description) => {
    setJobDescription(description)
  }

  const handleAnalyze = async () => {
    if (!uploadedFile || !jobDescription.trim()) {
      alert('Please upload a resume and enter a job description')
      return
    }

    setLoading(true)
    
    // Simulate API call - replace with actual API later
    setTimeout(() => {
      const mockResults = {
        atsScore: 78,
        overallFit: 'Good',
        matchedKeywords: ['project management', 'agile', 'leadership', 'communication'],
        missingKeywords: ['machine learning', 'cloud architecture', 'devops'],
        sections: {
          skills: { score: 85, issues: ['Missing technical certifications'] },
          experience: { score: 72, issues: ['Could emphasize quantifiable achievements more'] },
          education: { score: 88, issues: [] },
          format: { score: 76, issues: ['Consider adding more white space between sections'] }
        },
        recommendations: [
          'Add more action verbs to describe your accomplishments',
          'Include specific metrics and numbers to showcase impact',
          'Use industry-standard keywords from the job description',
          'Ensure consistent formatting and spacing',
          'Organize information in reverse chronological order'
        ]
      }
      setAnalysisResults(mockResults)
      setLoading(false)
    }, 2000)
  }

  const handleNewAnalysis = () => {
    setUploadedFile(null)
    setAnalysisResults(null)
    setJobDescription('')
  }

  return (
    <div className="ats-analyzer-main-page">
      <div className="ats-analyzer-nav">
        <button className="ats-back-btn" onClick={onClose}>
          <ArrowLeft size={20} />
          <span>Back to Builder</span>
        </button>
        <div className="ats-nav-title">
          <h1>Job Matcher</h1>
        </div>
      </div>

      {analysisResults ? (
        <ATSAnalyzerResults 
          results={analysisResults} 
          fileName={uploadedFile?.name}
          onNewAnalysis={handleNewAnalysis}
        />
      ) : (
        <>
          <ATSAnalyzerHeader />
          <ATSAnalyzerUpload 
            onFileUpload={handleFileUpload}
            onJobDescriptionChange={handleJobDescriptionChange}
            uploadedFile={uploadedFile}
            jobDescription={jobDescription}
            onAnalyze={handleAnalyze}
            loading={loading}
          />
        </>
      )}
    </div>
  )
}
