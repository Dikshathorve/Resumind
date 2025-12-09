import { useState } from 'react'
import './ProjectsPage.css'
import { Plus, Upload } from 'lucide-react'
import ResumeCard from '../components/ResumeCard'

export default function ProjectsPage({ onStart, onClose }) {
  const [resumes, setResumes] = useState([])

  const handleCreateNew = () => {
    onStart()
  }

  const handleUpload = () => {
    // TODO: Implement upload functionality
    console.log('Upload functionality')
  }

  return (
    <div className="projects-page">
      <div className="projects-header">
        <button className="close-btn" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="header-content">
          <h1>My Resumes</h1>
          <p>Create or upload your resume and let AI enhance it</p>
        </div>
      </div>

      <div className="projects-container">
        <div className="action-cards">
          <div className="action-card create-card" onClick={handleCreateNew}>
            <div className="projects-card-icon create-icon">
              <Plus size={40} />
            </div>
            <h3>Create Resume</h3>
            <p>Start fresh with our AI-powered builder</p>
          </div>

          <div className="action-card upload-card" onClick={handleUpload}>
            <div className="projects-card-icon upload-icon">
              <Upload size={40} />
            </div>
            <h3>Upload Existing</h3>
            <p>Upload your existing resume and enhance it</p>
          </div>
        </div>

        <div className="resumes-grid">
          {resumes.length === 0 ? (
            <div className="empty-state">
              <p>No resumes yet. Create one to get started!</p>
            </div>
          ) : (
            resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
