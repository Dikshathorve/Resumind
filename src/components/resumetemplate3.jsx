import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react'
import './ResumeTemplate3.css'

export default function ResumeTemplate3({ personal, summary, experiences, education, projects, skills, certifications, accentColor = '#3B82F6', profileImage = null }) {
  const templateStyle = {
    '--primary-color': accentColor,
    '--accent-blue': accentColor
  }

  return (
    <div className="resume-template-3" style={templateStyle}>
      <div className="template3-container">
        {/* LEFT SIDEBAR */}
        <aside className="template3-sidebar">
          {/* Profile Image */}
          {profileImage && (
            <div className="profile-image-container">
              <img src={profileImage} alt={personal.fullName} className="profile-image" />
            </div>
          )}

          {/* CONTACT SECTION */}
          <section className="sidebar-section">
            <h3 className="sidebar-title">CONTACT</h3>
            <div className="sidebar-content">
              {personal.phone && (
                <div className="sidebar-item">
                  <Phone size={14} className="sidebar-icon" />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.email && (
                <div className="sidebar-item">
                  <Mail size={14} className="sidebar-icon" />
                  <span>{personal.email}</span>
                </div>
              )}
              {personal.location && (
                <div className="sidebar-item">
                  <MapPin size={14} className="sidebar-icon" />
                  <span>{personal.location}</span>
                </div>
              )}
              {personal.website && (
                <div className="sidebar-item">
                  <Globe size={14} className="sidebar-icon" />
                  <span>{personal.website}</span>
                </div>
              )}
              {personal.linkedin && (
                <div className="sidebar-item">
                  <Linkedin size={14} className="sidebar-icon" />
                  <span>{personal.linkedin}</span>
                </div>
              )}
            </div>
          </section>

          {/* EDUCATION SECTION */}
          {education && education.length > 0 && (
            <section className="sidebar-section">
              <h3 className="sidebar-title">EDUCATION</h3>
              <div className="sidebar-content">
                {education.map((edu, idx) => (
                  (edu.school || edu.degree) && (
                    <div key={idx} className="education-item-sidebar">
                      <h4 className="edu-title-sidebar">{edu.degree || 'Degree'}</h4>
                      <p className="edu-school-sidebar">{edu.school || 'Institution'}</p>
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {/* SKILLS SECTION */}
          {skills && skills.length > 0 && (
            <section className="sidebar-section">
              <h3 className="sidebar-title">SKILLS</h3>
              <div className="skills-sidebar">
                {skills.map((skill, idx) => (
                  <span key={idx} className="skill-badge">{skill}</span>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* RIGHT CONTENT AREA */}
        <main className="template3-content">
          {/* Header */}
          <div className="template3-header">
            <h1 className="resume-name-t3">{personal.fullName || 'Your Name'}</h1>
            <p className="job-title-t3">{personal.jobTitle || 'Job Title'}</p>
          </div>

          {/* SUMMARY */}
          {summary && (
            <section className="content-section">
              <h3 className="section-title-t3">SUMMARY</h3>
              <p className="section-text-t3">{summary}</p>
            </section>
          )}

          {/* EXPERIENCE */}
          {experiences && experiences.length > 0 && (
            <section className="content-section">
              <h3 className="section-title-t3">EXPERIENCE</h3>
              {experiences.map((exp, idx) => (
                (exp.company || exp.role || exp.position) && (
                  <div key={idx} className="exp-item-t3">
                    <div className="exp-header">
                      <h4 className="exp-title-t3">{exp.role || exp.position || 'Position'}</h4>
                      {exp.startDate && <span className="exp-date">{exp.startDate}{exp.endDate ? ` - ${exp.endDate}` : ''}</span>}
                    </div>
                    <p className="exp-company-t3">{exp.company || 'Company'}</p>
                    {exp.desc && <p className="exp-desc-t3">{exp.desc}</p>}
                  </div>
                )
              ))}
            </section>
          )}

          {/* PROJECTS */}
          {projects && projects.length > 0 && (
            <section className="content-section">
              <h3 className="section-title-t3">PROJECTS</h3>
              {projects.map((proj, idx) => (
                (proj.name || proj.title) && (
                  <div key={idx} className="project-item-t3">
                    <h4 className="project-title-t3">{proj.name || proj.title || 'Project'}</h4>
                    {proj.description && <p className="project-desc-t3">{proj.description}</p>}
                  </div>
                )
              ))}
            </section>
          )}

          {/* CERTIFICATIONS */}
          {certifications && certifications.length > 0 && (
            <section className="content-section">
              <h3 className="section-title-t3">CERTIFICATIONS</h3>
              <ul className="certs-list-t3">
                {certifications.map((cert, idx) => (
                  <li key={idx}>{cert}</li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
