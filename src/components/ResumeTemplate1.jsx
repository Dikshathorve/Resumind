import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react'
import './ResumeTemplate1.css'

export default function ResumeTemplate1({ personal, summary, experiences, education, projects, skills, certifications, accentColor = '#3B82F6' }) {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  // Style object with dynamic accent color
  const templateStyle = {
    '--primary-color': accentColor,
    '--accent-blue': accentColor
  }

  return (
    <div className="resume-template-1" style={templateStyle}>
      {/* Header Section */}
      <div className="template-header">
        <h1 className="resume-name">{personal.fullName || 'Your Name'}</h1>
        
        {/* Contact Information */}
        <div className="contact-info">
          {personal.email && (
            <span className="contact-item">
              <Mail size={14} />
              <span>{personal.email}</span>
            </span>
          )}
          
          {personal.phone && (
            <span className="contact-item">
              <Phone size={14} />
              <span>{personal.phone}</span>
            </span>
          )}
          
          {personal.location && (
            <span className="contact-item">
              <MapPin size={14} />
              <span>{personal.location}</span>
            </span>
          )}
          
          {personal.linkedin && (
            <span className="contact-item">
              <Linkedin size={14} />
              <span>{personal.linkedin}</span>
            </span>
          )}
          
          {personal.website && (
            <span className="contact-item">
              <Globe size={14} />
              <span>{personal.website}</span>
            </span>
          )}
        </div>

        {/* Divider Line */}
        <div className="header-divider"></div>
      </div>

      {/* Professional Summary Section */}
      {summary && (
        <div className="resume-section">
          <h2 className="section-title">PROFESSIONAL SUMMARY</h2>
          <p className="section-content">{summary}</p>
        </div>
      )}

      {/* Professional Experience Section */}
      {experiences && experiences.length > 0 && experiences.some(e => e.company || e.role || e.desc) && (
        <div className="resume-section">
          <h2 className="section-title">PROFESSIONAL EXPERIENCE</h2>
          
          {experiences.map((exp, idx) => (
            (exp.company || exp.role || exp.desc) && (
              <div key={idx} className="experience-item">
                <div className="experience-header">
                  <div className="experience-title-block">
                    <h3 className="job-title">{exp.role || 'Job Title'}</h3>
                    <p className="company-name">{exp.company || 'Company Name'}</p>
                  </div>
                  {(exp.startDate || exp.endDate || exp.currentlyWorking) && (
                    <div className="experience-dates">
                      {exp.startDate && formatDate(exp.startDate)}
                      {exp.startDate && (exp.currentlyWorking || exp.endDate) && ' - '}
                      {exp.currentlyWorking ? 'Present' : exp.endDate && formatDate(exp.endDate)}
                    </div>
                  )}
                </div>
                
                {exp.desc && <p className="experience-desc">{exp.desc}</p>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Projects Section */}
      {projects && projects.length > 0 && projects.some(p => p.name || p.type || p.description) && (
        <div className="resume-section">
          <h2 className="section-title">PROJECTS</h2>
          
          {projects.map((proj, idx) => (
            (proj.name || proj.type || proj.description) && (
              <div key={idx} className="project-item">
                <div className="project-header">
                  <h3 className="project-name">{proj.name || 'Project Name'}</h3>
                  {proj.type && <span className="project-type">{proj.type}</span>}
                </div>
                
                {proj.description && <p className="project-desc">{proj.description}</p>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Education Section */}
      {education && education.length > 0 && education.some(e => e.institution || e.degree) && (
        <div className="resume-section">
          <h2 className="section-title">EDUCATION</h2>
          
          {education.map((edu, idx) => (
            (edu.institution || edu.degree) && (
              <div key={idx} className="education-item">
                <div className="education-header">
                  <div className="education-title-block">
                    <h3 className="degree">{edu.degree || 'Degree'}</h3>
                    <p className="school-name">{edu.institution || 'School Name'}</p>
                  </div>
                  {edu.graduationDate && (
                    <div className="education-date">
                      {formatDate(edu.graduationDate)}
                    </div>
                  )}
                </div>
                
                {edu.fieldOfStudy && (
                  <p className="education-field">{edu.fieldOfStudy}</p>
                )}
                
                {edu.gpa && (
                  <p className="education-gpa">GPA: {edu.gpa}</p>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <div className="resume-section">
          <h2 className="section-title">SKILLS</h2>
          
          <div className="skills-container">
            {skills.map((skill, idx) => (
              <span key={idx} className="skill-item">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Section */}
      {certifications && certifications.length > 0 && (
        <div className="resume-section">
          <h2 className="section-title">CERTIFICATIONS</h2>
          
          <div className="certifications-container">
            {certifications.map((cert, idx) => (
              <span key={idx} className="certification-item">{cert}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
