import { useState } from 'react'
import './ProjectsPage.css'
import { Plus, Upload } from 'lucide-react'
import ResumeCard from '../components/ResumeCard'
import HeaderWithUser from '../components/HeaderWithUser'
import CreateResumeModal from '../components/CreateResumeModal'
import { useAuth } from '../context/AuthContext'

export default function ProjectsPage({ onStart, onClose }) {

  const [resumes, setResumes] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const { user, logout } = useAuth()

  const handleCreateNew = () => {
    setShowCreateModal(true)
  }

  const handleCreateResumeSubmit = async (resumeTitle) => {
    console.log('[Projects Page] Creating resume with title:', resumeTitle)
    setIsCreating(true)
    try {
      onStart(resumeTitle)
      setShowCreateModal(false)
    } catch (error) {
      console.error('[Projects Page] Error creating resume:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleUpload = () => {
    // TODO: Implement upload functionality
    console.log('Upload functionality')
  }

  const handleLogout = () => {
    logout()
    onClose()
  }

  return (
    <div className="projects-page">
      <HeaderWithUser onLogout={handleLogout} userName={user?.fullName || 'User'} />
      <div className="projects-header">
        <button className="back-btn" onClick={onClose}>
          ← Back to Dashboard
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
            <>
              {/* Sample resume card - only show when there are actual resumes */}
              <div className="resume-card-temp">
                <div className="resume-card-icon">
                  📄
                </div>
                <h3 className="resume-card-title">My Resume</h3>
                <p className="resume-card-date">Updated on 10/9/2025</p>
              </div>
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </>
          )}
        </div>
      </div>

      <CreateResumeModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateResumeSubmit}
        isLoading={isCreating}
      />
    </div>
  )
}
