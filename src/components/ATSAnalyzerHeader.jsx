import './ATSAnalyzerHeader.css'

export default function ATSAnalyzerHeader() {
  return (
    <div className="ats-analyzer-header-section">
      <div className="ats-analyzer-header-badge">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4"></path>
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
        <span>ATS Compatibility Analyzer</span>
      </div>
      
      <div className="ats-analyzer-header-content">
        <h2>ATS <span className="score-highlight">Score</span><br/>Analyzer</h2>
        <p>Our AI analyzes your resume against 50+ ATS systems to ensure maximum compatibility and help you get past automated screening.</p>
      </div>
    </div>
  )
}
