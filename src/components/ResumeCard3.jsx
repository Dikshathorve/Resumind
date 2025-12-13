import './ResumeCard3.css'
import { MoreVertical, Download, Trash2, Copy } from 'lucide-react'
import { useState } from 'react'

export default function ResumeCard3({ resume, onDelete, onDuplicate, onDownload }) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="resume-card-3">
      <div className="card-header-3">
        <div className="header-top">
          <h3>{resume.name || 'Untitled Resume'}</h3>
          <button
            className="menu-btn-3"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreVertical size={20} />
          </button>
        </div>
        <p className="card-date-3">
          {new Date(resume.createdAt).toLocaleDateString()}
        </p>
        {showMenu && (
          <div className="dropdown-menu-3">
            <button
              className="menu-option-3"
              onClick={() => {
                onDownload?.(resume.id)
                setShowMenu(false)
              }}
            >
              <Download size={18} />
              Download
            </button>
            <button
              className="menu-option-3"
              onClick={() => {
                onDuplicate?.(resume.id)
                setShowMenu(false)
              }}
            >
              <Copy size={18} />
              Duplicate
            </button>
            <button
              className="menu-option-3 delete"
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

      <div className="card-body-3">
        <div className="template-badge-3">Template 3</div>
        <div className="accent-bar"></div>
        <div className="template-preview-3">
          <div className="preview-dot"></div>
          <div className="preview-text-line"></div>
        </div>
      </div>

      <div className="card-footer-3">
        <button className="edit-btn-3">Edit Resume</button>
      </div>
    </div>
  )
}
