import { useState } from 'react'
import './ATSAnalyzerUpload.css'
import { Upload, File, Loader } from 'lucide-react'

export default function ATSAnalyzerUpload({ 
  onFileUpload, 
  onJobDescriptionChange, 
  uploadedFile, 
  jobDescription,
  onAnalyze,
  onAnalyzeBuiltResume,
  loading,
  hasBuiltResume
}) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      const file = files[0]
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        onFileUpload(file)
      } else {
        alert('Please upload a PDF file')
      }
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file)
    }
  }

  return (
    <div className="ats-analyzer-upload-section">
      <div className="ats-upload-wrapper">
        <div className="ats-upload-partition">
          {/* Left Partition - Resume Build Options */}
          <div className="ats-partition-lhs">
            <div className="ats-upload-box">
              <h3>Your Built Resume</h3>
              <div className="ats-resume-preview-placeholder">
                {hasBuiltResume ? (
                  <div className="ats-resume-preview-content">
                    <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>✓ Resume Ready</p>
                    <p>Your built resume is ready for analysis</p>
                  </div>
                ) : (
                  <p>Resume preview will appear here</p>
                )}
              </div>
              {hasBuiltResume && (
                <div className="ats-analyze-section-lhs">
                  <button
                    className={`ats-analyze-btn-lhs ${loading ? 'loading' : ''} ${!jobDescription.trim() ? 'disabled' : ''}`}
                    onClick={onAnalyzeBuiltResume}
                    disabled={loading || !jobDescription.trim()}
                  >
                    {loading ? (
                      <>
                        <Loader size={20} className="ats-spinner" />
                        <span>Analyzing Resume...</span>
                      </>
                    ) : (
                      <>
                        <span>Analyze This Resume</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Partition - 2 Step Process */}
          <div className="ats-partition-rhs">
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.95rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                {hasBuiltResume ? 'Job Description (Required)' : 'Step 1: Upload Resume'}
              </h3>
              {hasBuiltResume && (
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.5rem 0 1rem 0' }}>
                  Enter the job description to analyze your built resume
                </p>
              )}
            </div>

            {!hasBuiltResume && (
              <div className="ats-upload-box">
                <h3>Step 1: Upload Resume</h3>
                <label
                  className={`ats-upload-area ${dragActive ? 'active' : ''} ${uploadedFile ? 'uploaded' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {uploadedFile ? (
                    <div className="ats-upload-success">
                      <File size={48} />
                      <div className="ats-file-info">
                        <p className="ats-file-name">{uploadedFile.name}</p>
                        <p className="ats-file-size">
                          {(uploadedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                    </div>
                  ) : (
                    <>
                      <Upload size={48} />
                      <div className="ats-upload-text">
                        <p className="ats-main-text">Drag and drop your resume here</p>
                        <p className="ats-sub-text">or click to browse</p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                    </>
                  )}
                </label>
              </div>
            )}

            {/* Job Description */}
            <div className="ats-upload-box ats-jd-box">
              <h3>{hasBuiltResume ? 'Job Description' : 'Step 2: Paste Job Description'}</h3>
              <textarea
                className="ats-job-description-input"
                placeholder="Paste the job description here. Include the job title, responsibilities, requirements, and desired qualifications..."
                value={jobDescription}
                onChange={(e) => onJobDescriptionChange(e.target.value)}
              />
              <p className="ats-input-hint">
                The more details you provide, the more accurate the analysis
              </p>
            </div>

            {/* Analyze Button */}
            {!hasBuiltResume && (
              <div className="ats-analyze-section">
                <button
                  className={`ats-analyze-btn ${loading ? 'loading' : ''} ${!uploadedFile || !jobDescription.trim() ? 'disabled' : ''}`}
                  onClick={onAnalyze}
                  disabled={loading || !uploadedFile || !jobDescription.trim()}
                >
                  {loading ? (
                    <>
                      <Loader size={20} className="ats-spinner" />
                      <span>Analyzing Resume...</span>
                    </>
                  ) : (
                    <>
                      <span>Analyze Resume</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
