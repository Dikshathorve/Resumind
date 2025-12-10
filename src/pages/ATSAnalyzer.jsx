import { useState } from 'react'
import './ATSAnalyzer.css'
import { ArrowLeft } from 'lucide-react'

export default function ATSAnalyzer({ onClose, resumeData }) {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [analysisResults, setAnalysisResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [useBuiltResume, setUseBuiltResume] = useState(!!resumeData)

  const handleFileUpload = (file) => {
    setUploadedFile(file)
  }

  const handleAnalyze = () => {
    if (!useBuiltResume && !uploadedFile) {
      alert('Please select a resume to analyze (built or uploaded)')
      return
    }
    if (!jobDescription.trim()) {
      alert('Please enter a job description')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setAnalysisResults({
        atsScore: 78,
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
      })
      setLoading(false)
    }, 2000)
  }

  const handleNewAnalysis = () => {
    setUploadedFile(null)
    setAnalysisResults(null)
    setJobDescription('')
  }

  const handleDownloadReport = () => {
    if (!analysisResults) return

    const resumeName = useBuiltResume ? 'Built Resume' : uploadedFile?.name

    const reportContent = `
ATS COMPATIBILITY ANALYSIS REPORT
================================

Generated: ${new Date().toLocaleDateString()}
Resume File: ${resumeName}

OVERALL ATS SCORE: ${analysisResults.atsScore}/100

SCORE BREAKDOWN:
${Object.entries(analysisResults.sections)
  .map(([name, data]) => `${name.charAt(0).toUpperCase() + name.slice(1)}: ${data.score}/100`)
  .join('\n')}

MATCHED KEYWORDS (${analysisResults.matchedKeywords.length}):
${analysisResults.matchedKeywords.map((kw) => `✓ ${kw}`).join('\n')}

MISSING KEYWORDS (${analysisResults.missingKeywords.length}):
${analysisResults.missingKeywords.map((kw) => `✗ ${kw}`).join('\n')}

SECTION ANALYSIS:
${Object.entries(analysisResults.sections)
  .map(([name, data]) => {
    const issues = data.issues.length > 0 ? `\nIssues:\n${data.issues.map((issue) => `  - ${issue}`).join('\n')}` : ''
    return `${name.charAt(0).toUpperCase() + name.slice(1)} (${data.score}/100)${issues}`
  })
  .join('\n\n')}

RECOMMENDATIONS:
${analysisResults.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

================================
This report was generated automatically. Review and implement the recommendations above to improve your ATS score.
    `

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ATS-Report-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'excellent'
    if (score >= 60) return 'good'
    if (score >= 40) return 'fair'
    return 'poor'
  }

  return (
    <div className="ats-page">
      <div className="ats-nav">
        <button className="ats-back-btn" onClick={onClose}>
          <ArrowLeft size={20} />
          <span>Back to Builder</span>
        </button>
        <h1 className="ats-nav-title">Job Matcher</h1>
      </div>

      {analysisResults ? (
        <div className="ats-results-container">
          <div className="ats-results-hero">
            <div>
              <h2>Analysis Results</h2>
              <p>Resume: {useBuiltResume ? 'Built Resume' : uploadedFile?.name}</p>
            </div>
            <div className={`ats-score-circle ${getScoreColor(analysisResults.atsScore)}`}>
              <div className="ats-score-value">{analysisResults.atsScore}</div>
              <div className="ats-score-text">ATS Score</div>
            </div>
          </div>

          {useBuiltResume && resumeData && (
            <div className="ats-resume-preview">
              <h3>Resume Preview</h3>
              <div className="ats-resume-card">
                {resumeData.personal?.fullName && (
                  <div className="ats-preview-section">
                    <h4>{resumeData.personal.fullName}</h4>
                    <p className="ats-preview-subtitle">{resumeData.personal.jobTitle}</p>
                    {(resumeData.personal.email || resumeData.personal.phone || resumeData.personal.location) && (
                      <p className="ats-preview-contact">
                        {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                        {resumeData.personal.phone && <span>•</span>}
                        {resumeData.personal.phone && <span>{resumeData.personal.phone}</span>}
                        {resumeData.personal.location && <span>•</span>}
                        {resumeData.personal.location && <span>{resumeData.personal.location}</span>}
                      </p>
                    )}
                  </div>
                )}

                {resumeData.summary && (
                  <div className="ats-preview-section">
                    <h5>Professional Summary</h5>
                    <p className="ats-preview-text">{resumeData.summary}</p>
                  </div>
                )}

                {resumeData.experiences?.length > 0 && (
                  <div className="ats-preview-section">
                    <h5>Experience</h5>
                    {resumeData.experiences.map((exp, i) => (
                      exp.company && (
                        <div key={i} className="ats-preview-item">
                          <p className="ats-preview-bold">{exp.role} at {exp.company}</p>
                          {exp.desc && <p className="ats-preview-text">{exp.desc}</p>}
                        </div>
                      )
                    ))}
                  </div>
                )}

                {resumeData.education?.school && (
                  <div className="ats-preview-section">
                    <h5>Education</h5>
                    <p className="ats-preview-bold">{resumeData.education.degree} from {resumeData.education.school}</p>
                  </div>
                )}

                {resumeData.skills?.length > 0 && (
                  <div className="ats-preview-section">
                    <h5>Skills</h5>
                    <div className="ats-preview-tags">
                      {resumeData.skills.map((skill, i) => (
                        <span key={i} className="ats-preview-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}

                {resumeData.certifications?.length > 0 && (
                  <div className="ats-preview-section">
                    <h5>Certifications</h5>
                    <ul className="ats-preview-list">
                      {resumeData.certifications.map((cert, i) => (
                        <li key={i}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="ats-results-grid">
            <div className="ats-result-card">
              <h3>Matched Keywords ({analysisResults.matchedKeywords.length})</h3>
              <div className="ats-keywords">
                {analysisResults.matchedKeywords.map((kw, i) => (
                  <span key={i} className="ats-kw-matched">{kw}</span>
                ))}
              </div>
            </div>

            <div className="ats-result-card">
              <h3>Missing Keywords ({analysisResults.missingKeywords.length})</h3>
              <div className="ats-keywords">
                {analysisResults.missingKeywords.map((kw, i) => (
                  <span key={i} className="ats-kw-missing">{kw}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="ats-sections">
            <h3>Section Analysis</h3>
            <div className="ats-section-grid">
              {Object.entries(analysisResults.sections).map(([name, data]) => (
                <div key={name} className="ats-section-item">
                  <div className="ats-section-header">
                    <h4>{name}</h4>
                    <span className={`ats-section-score ${getScoreColor(data.score)}`}>{data.score}</span>
                  </div>
                  <div className="ats-progress-bar">
                    <div className="ats-progress-fill" style={{ width: `${data.score}%` }}></div>
                  </div>
                  {data.issues.length > 0 && (
                    <ul className="ats-issues">
                      {data.issues.map((issue, i) => (
                        <li key={i}>{issue}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="ats-recommendations">
            <h3>Recommendations</h3>
            <ol className="ats-rec-list">
              {analysisResults.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ol>
          </div>

          <div className="ats-actions">
            <button className="ats-btn ats-secondary" onClick={handleNewAnalysis}>Analyze Another</button>
            <button className="ats-btn ats-primary" onClick={handleDownloadReport}>Download Report</button>
          </div>
        </div>
      ) : (
        <div className="ats-container">
          <div className="ats-header">
            <div className="ats-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4"></path>
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              <span>ATS Compatibility Analyzer</span>
            </div>
            <h2>ATS <span className="ats-highlight">Score</span><br/>Analyzer</h2>
            <p>Our AI analyzes your resume against 50+ ATS systems to ensure maximum compatibility and help you get past automated screening.</p>
          </div>

          <div className="ats-content">
            {resumeData && (
              <div className="ats-built-resume-section">
                <h3>Your Built Resume</h3>
                <div className="ats-built-resume-card">
                  {resumeData.personal?.fullName && (
                    <div className="ats-resume-item">
                      <h4>{resumeData.personal.fullName}</h4>
                      <p className="ats-resume-subtitle">{resumeData.personal.jobTitle}</p>
                      {(resumeData.personal.email || resumeData.personal.phone || resumeData.personal.location) && (
                        <p className="ats-resume-contact">
                          {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                          {resumeData.personal.phone && <span>•</span>}
                          {resumeData.personal.phone && <span>{resumeData.personal.phone}</span>}
                          {resumeData.personal.location && <span>•</span>}
                          {resumeData.personal.location && <span>{resumeData.personal.location}</span>}
                        </p>
                      )}
                    </div>
                  )}

                  {resumeData.summary && (
                    <div className="ats-resume-item">
                      <h5>Summary</h5>
                      <p className="ats-resume-text">{resumeData.summary.substring(0, 150)}...</p>
                    </div>
                  )}

                  {resumeData.experiences?.length > 0 && (
                    <div className="ats-resume-item">
                      <h5>Experience</h5>
                      {resumeData.experiences.slice(0, 2).map((exp, i) => (
                        exp.company && (
                          <p key={i} className="ats-resume-text">
                            <strong>{exp.role}</strong> at {exp.company}
                          </p>
                        )
                      ))}
                    </div>
                  )}

                  {resumeData.skills?.length > 0 && (
                    <div className="ats-resume-item">
                      <h5>Skills</h5>
                      <div className="ats-resume-skills">
                        {resumeData.skills.slice(0, 5).map((skill, i) => (
                          <span key={i} className="ats-skill-tag">{skill}</span>
                        ))}
                        {resumeData.skills.length > 5 && <span className="ats-skill-tag">+{resumeData.skills.length - 5} more</span>}
                      </div>
                    </div>
                  )}

                  <button className="ats-use-built-btn" onClick={() => {
                    setUseBuiltResume(true)
                    setUploadedFile(null)
                  }}>
                    Analyze This Resume
                  </button>
                </div>
              </div>
            )}

            <div className="ats-upload-box">
              <h3>Step 1: Upload Resume</h3>
              <label className={`ats-upload-area ${uploadedFile ? 'uploaded' : ''}`}>
                {uploadedFile ? (
                  <div className="ats-file-info">
                    <span className="ats-file-icon">📄</span>
                    <div>
                      <p>{uploadedFile.name}</p>
                      <p className="ats-file-size">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                ) : (
                  <div className="ats-upload-content">
                    <span className="ats-upload-icon">📤</span>
                    <p className="ats-upload-text">Drag and drop your resume here</p>
                    <p className="ats-upload-sub">or click to browse</p>
                  </div>
                )}
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            <div className="ats-upload-box">
              <h3>Step 2: Paste Job Description</h3>
              <textarea
                className="ats-textarea"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <p className="ats-hint">The more details you provide, the more accurate the analysis</p>
            </div>
          </div>

          <div className="ats-analyze-btn-container">
            <button
              className={`ats-analyze-btn ${(!useBuiltResume && !uploadedFile) || !jobDescription.trim() ? 'disabled' : ''} ${loading ? 'loading' : ''}`}
              onClick={handleAnalyze}
              disabled={loading || (!useBuiltResume && !uploadedFile) || !jobDescription.trim()}
            >
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
