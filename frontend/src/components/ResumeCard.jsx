import './ResumeCard.css'
import { MoreVertical, Download, Trash2, Copy } from 'lucide-react'
import { useState } from 'react'

export default function ResumeCard({ resume, onDelete, onDuplicate, onDownload, onEdit }) {
  const [showMenu, setShowMenu] = useState(false)

  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="project-card">
      <div className="project-card-header">
        <div className="project-info">
          <h3>{resume.name || 'Untitled Resume'}</h3>
          <p className="project-date">
            Last updated: {formatDate(resume.updatedAt || resume.createdAt)}
          </p>
        </div>
        <div className="project-menu-container">
          <button
            className="project-menu-btn"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreVertical size={20} />
          </button>
          {showMenu && (
            <div className="project-dropdown-menu">
              <button
                className="project-menu-item"
                onClick={() => {
                  onDownload?.(resume.id)
                  setShowMenu(false)
                }}
              >
                <Download size={18} />
                Download
              </button>
              <button
                className="project-menu-item"
                onClick={() => {
                  onDuplicate?.(resume.id)
                  setShowMenu(false)
                }}
              >
                <Copy size={18} />
                Duplicate
              </button>
              <button
                className="project-menu-item delete"
                onClick={() => {
                  onDelete?.(resume.id)
                  setShowMenu(false)
                }}
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="project-preview">
        <div className="project-preview-placeholder">
          <span>Preview</span>
        </div>
      </div>

      <div className="project-card-footer">
        <button 
          className="project-edit-btn"
          onClick={() => {
            onEdit?.(resume._id, resume.name)
          }}
        >
          Edit Resume
        </button>
      </div>
    </div>
  )
}
