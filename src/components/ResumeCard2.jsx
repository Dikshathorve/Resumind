import './ResumeCard2.css'
import { MoreVertical, Download, Trash2, Copy } from 'lucide-react'
import { useState } from 'react'

export default function ResumeCard2({ resume, onDelete, onDuplicate, onDownload }) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="resume-card-2">
      <div className="card-menu-2">
        <button
          className="menu-btn-2"
          onClick={() => setShowMenu(!showMenu)}
        >
          <MoreVertical size={18} />
        </button>
        {showMenu && (
          <div className="dropdown-menu-2">
            <button
              className="menu-option-2"
              onClick={() => {
                onDownload?.(resume.id)
                setShowMenu(false)
              }}
            >
              <Download size={16} />
              Download
            </button>
            <button
              className="menu-option-2"
              onClick={() => {
                onDuplicate?.(resume.id)
                setShowMenu(false)
              }}
            >
              <Copy size={16} />
              Duplicate
            </button>
            <button
              className="menu-option-2 delete"
              onClick={() => {
                onDelete?.(resume.id)
                setShowMenu(false)
              }}
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="card-layout-2">
        {/* Left Sidebar */}
        <div className="sidebar-2">
          <div className="profile-section-2">
            <div className="profile-image-2">
              <div className="image-placeholder-2">👤</div>
            </div>
            <div className="profile-name-2">
              <h2>{resume.name || 'Your Name'}</h2>
              <p>Job Title</p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="sidebar-block-2">
            <h3 className="sidebar-heading-2">CONTACT</h3>
            <div className="sidebar-content-2">
              <div className="contact-item-2">
                <span className="contact-icon-2">📍</span>
                <div className="contact-text-2">
                  <p>Address</p>
                  <small>123 Anywhere St., Any City, ST 12345</small>
                </div>
              </div>
              <div className="contact-item-2">
                <span className="contact-icon-2">📞</span>
                <div className="contact-text-2">
                  <p>Phone</p>
                  <small>+123-456-7890</small>
                </div>
              </div>
              <div className="contact-item-2">
                <span className="contact-icon-2">🌐</span>
                <div className="contact-text-2">
                  <p>Web</p>
                  <small>hello@reallygreatsite.com</small>
                </div>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="sidebar-block-2">
            <h3 className="sidebar-heading-2">EDUCATION</h3>
            <div className="sidebar-content-2">
              <div className="education-item-2">
                <span className="year-2">2008</span>
                <p className="degree-2">BORCELLE UNIVERSITY</p>
                <small>Bachelor of Business Management</small>
              </div>
              <div className="education-item-2">
                <span className="year-2">2012</span>
                <p className="degree-2">BORCELLE UNIVERSITY</p>
                <small>Bachelor of Business Management</small>
              </div>
              <div className="education-item-2">
                <span className="year-2">2013</span>
                <p className="degree-2">BORCELLE UNIVERSITY</p>
                <small>Bachelor of Business Management</small>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="sidebar-block-2">
            <h3 className="sidebar-heading-2">PRO.SKILLS</h3>
            <div className="sidebar-content-2">
              <ul className="skills-list-2">
                <li>Management Skills</li>
                <li>Creativity</li>
                <li>Digital Marketing</li>
                <li>Negotiation</li>
                <li>Critical Thinking</li>
                <li>Leadership</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content-2">
          <div className="content-header-2">
            <h1>{resume.name || 'Your Name'}</h1>
            <p>Job Title</p>
            <small className="created-date-2">Created: {new Date(resume.createdAt).toLocaleDateString()}</small>
          </div>

          {/* Profile Section */}
          <div className="content-section-2">
            <h3 className="section-title-2">PROFILE</h3>
            <div className="section-divider-2"></div>
            <p className="section-text-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam phatera in lorem at luctus. Donec hendrerit nec erat, quis tempus arcu elementum uis. Morbi tincidunt et ars augm laoreet cursus. Mauris convidis, mi at matrix maiestalus. Phasellus sed nequer placerat iaculis et du uniquique frugal. Mauris convidis,dis at matrix maiestalus.
            </p>
          </div>

          {/* Experience Section */}
          <div className="content-section-2">
            <h3 className="section-title-2">EXPERIENCE</h3>
            <div className="section-divider-2"></div>
            
            <div className="experience-item-2">
              <div className="exp-header-2">
                <span className="exp-dates-2">2017-Present</span>
                <p className="exp-company-2">Ginyard International Co.| 123 Anywhere St., Any City</p>
              </div>
              <h4 className="exp-title-2">MARKETING MANAGER</h4>
              <p className="exp-description-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam phatera in lorem at luctus. Donec hendrerit nec erat, quis tempus arcu elementum uis. Morbi tincidunt et ars augm laoreet cursus. Mauris convidis, mi at matrix maiestalus.
              </p>
            </div>

            <div className="experience-item-2">
              <div className="exp-header-2">
                <span className="exp-dates-2">2015 - 2017</span>
                <p className="exp-company-2">Ginyard International Co.| 123 Anywhere St., Any City</p>
              </div>
              <h4 className="exp-title-2">INSIDE SALES REPRESENTATIVE</h4>
              <p className="exp-description-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam phatera in lorem at luctus. Donec hendrerit nec erat, quis tempus arcu elementum uis. Morbi tincidunt et ars augm laoreet cursus.
              </p>
            </div>

            <div className="experience-item-2">
              <div className="exp-header-2">
                <span className="exp-dates-2">2013 - 2015</span>
                <p className="exp-company-2">Ginyard International Co.| 123 Anywhere St., Any City</p>
              </div>
              <h4 className="exp-title-2">INSIDE SALES REPRESENTATIVE</h4>
              <p className="exp-description-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam phatera in lorem at luctus. Donec hendrerit nec erat, quis tempus arcu elementum uis.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer-2">
        <button className="edit-btn-2">Edit Resume</button>
      </div>
    </div>
  )
}
