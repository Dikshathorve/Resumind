import { useState } from 'react'
import './ATSUploadSection.css'
import { Upload, File, Loader } from 'lucide-react'

export default function ATSUploadSection({ 
  onFileUpload, 
  onJobDescriptionChange, 
  uploadedFile, 
  jobDescription,
  onAnalyze,
  loading 
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
    <div className="ats-upload-section">
      <div className="upload-container">
        <div className="upload-grid">
          {/* Resume Upload */}
          <div className="upload-box">
            <h3>Step 1: Upload Resume</h3>
            <label
              className={`upload-area ${dragActive ? 'active' : ''} ${uploadedFile ? 'uploaded' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="upload-success">
                  <File size={48} />
                  <div className="file-info">
                    <p className="file-name">{uploadedFile.name}</p>
                    <p className="file-size">
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
                  <div className="upload-text">
                    <p className="main-text">Drag and drop your resume here</p>
                    <p className="sub-text">or click to browse</p>
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

          {/* Job Description */}
          <div className="upload-box">
            <h3>Step 2: Paste Job Description</h3>
            <textarea
              className="job-description-input"
              placeholder="Paste the job description here. Include the job title, responsibilities, requirements, and desired qualifications..."
              value={jobDescription}
              onChange={(e) => onJobDescriptionChange(e.target.value)}
            />
            <p className="input-hint">
              The more details you provide, the more accurate the analysis
            </p>
          </div>
        </div>

        {/* Analyze Button */}
        <div className="analyze-section">
          <button
            className={`analyze-btn ${loading ? 'loading' : ''} ${!uploadedFile || !jobDescription.trim() ? 'disabled' : ''}`}
            onClick={onAnalyze}
            disabled={loading || !uploadedFile || !jobDescription.trim()}
          >
            {loading ? (
              <>
                <Loader size={20} className="spinner" />
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
      </div>
    </div>
  )
}
