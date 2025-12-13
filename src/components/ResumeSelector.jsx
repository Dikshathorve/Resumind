import { UploadCloud, FileText } from 'lucide-react'
import './ResumeSelector.css'

export default function ResumeSelector({ selectedType, onTypeChange }) {
  return (
    <div className="resume-selector">
      <h3>Select Resume</h3>
      
      <div className="selector-buttons">
        {/* Current Resume Option */}
        <button 
          className={`selector-btn ${selectedType === 'current' ? 'active' : ''}`}
          onClick={() => onTypeChange('current')}
        >
          <FileText size={20} />
          <span>Current Resume</span>
        </button>

        {/* Upload New Option */}
        <button 
          className={`selector-btn ${selectedType === 'upload' ? 'active' : ''}`}
          onClick={() => onTypeChange('upload')}
        >
          <UploadCloud size={20} />
          <span>Upload New</span>
        </button>
      </div>

      {/* Upload Area (shown when upload option is selected) */}
      {selectedType === 'upload' && (
        <div className="upload-area">
          <input 
            type="file" 
            accept=".pdf,.doc,.docx" 
            className="file-input"
            id="resume-upload"
          />
          <label htmlFor="resume-upload" className="upload-label">
            <UploadCloud size={32} />
            <p>Drag & drop your resume or click to select</p>
            <span className="upload-hint">PDF, DOC, or DOCX</span>
          </label>
        </div>
      )}
    </div>
  )
}
