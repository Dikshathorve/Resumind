import { useState, useEffect } from 'react'
import './ProjectsPage.css'
import { Plus, Upload } from 'lucide-react'
import ResumeCard from '../components/ResumeCard'
import HeaderWithUser from '../components/HeaderWithUser'
import CreateResumeModal from '../components/CreateResumeModal'
import { useAuth } from '../context/AuthContext'

export default function ProjectsPage({ onStart, onClose, onEditResume }) {

  const [resumes, setResumes] = useState([])
  const [projectsCount, setProjectsCount] = useState(0)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const { user, logout } = useAuth()

  // Fetch user's resumes on component mount
  useEffect(() => {
    fetchUserResumes()
  }, [])

  const fetchUserResumes = async () => {
    console.log('[Projects Page] Fetching user resumes')
    setIsFetching(true)
    setError(null)
    try {
      // Step 1: Fetch user's Projects document to get resume IDs
      const projectsResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/projects`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (!projectsResponse.ok) {
        throw new Error(`Failed to fetch projects: ${projectsResponse.status}`)
      }

      const projectsData = await projectsResponse.json()
      console.log('[Projects Page] Projects data received:', projectsData)

      setProjectsCount(projectsData.projectsCount)

      // If no resumes, just set empty array
      if (!projectsData.projects || projectsData.projects.length === 0) {
        console.log('[Projects Page] No resumes found for user')
        setResumes([])
        return
      }

      // Step 2: Fetch full resume details using batch endpoint
      const resumeIds = projectsData.projects.map(p => p._id || p)
      console.log('[Projects Page] Fetching full details for resume IDs:', resumeIds)

      const batchResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/resumes/batch/fetch`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ids: resumeIds })
        }
      )

      if (!batchResponse.ok) {
        throw new Error(`Failed to fetch resume details: ${batchResponse.status}`)
      }

      const batchData = await batchResponse.json()
      console.log('[Projects Page] Resume details fetched:', batchData)

      setResumes(batchData.resumes || [])
    } catch (err) {
      console.error('[Projects Page] Error fetching resumes:', err)
      setError(err.message)
    } finally {
      setIsFetching(false)
    }
  }

  const handleCreateNew = () => {
    setShowCreateModal(true)
  }

  const handleCreateResumeSubmit = async (resumeTitle) => {
    console.log('[Projects Page] Creating resume with title:', resumeTitle)
    setIsCreating(true)
    try {
      onStart(resumeTitle)
      setShowCreateModal(false)
      // Refresh the resumes list after creation
      setTimeout(() => fetchUserResumes(), 500)
    } catch (error) {
      console.error('[Projects Page] Error creating resume:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleEditResume = (resumeId, resumeTitle) => {
    console.log('[Projects Page] Edit button clicked for resume:', resumeId, resumeTitle)
    // Call parent handler to navigate to BuildResume with existing resume
    onEditResume?.(resumeId, resumeTitle)
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
          {isFetching ? (
            <div className="loading-state">
              <p>Loading your resumes...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>Error loading resumes: {error}</p>
              <button 
                className="retry-btn"
                onClick={fetchUserResumes}
              >
                Retry
              </button>
            </div>
          ) : resumes.length === 0 ? (
            <div className="empty-state">
              <p>No resumes yet. Create one to get started!</p>
            </div>
          ) : (
            resumes.map((resume) => (
              <ResumeCard 
                key={resume._id} 
                resume={resume}
                onEdit={handleEditResume}
              />
            ))
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
