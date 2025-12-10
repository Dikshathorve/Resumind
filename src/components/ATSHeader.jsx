import './ATSHeader.css'

export default function ATSHeader() {
  return (
    <div className="ats-header">
      <div className="ats-header-badge">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4"></path>
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>ATS Compatibility Analyzer</span>
      </div>
      
      <div className="ats-header-content">
        <h2>ATS Score Analyzer</h2>
        <p>Our AI analyzes your resume against 50+ ATS systems to ensure maximum compatibility and help you get past automated screening.</p>
      </div>
    </div>
  )
}
