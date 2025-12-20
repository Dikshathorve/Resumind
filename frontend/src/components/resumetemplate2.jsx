import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react'
import './ResumeTemplate2.css'

export default function ResumeTemplate2({ personal, summary, experiences, education, projects, skills, certifications, accentColor = '#3B82F6' }) {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const templateStyle = {
    '--primary-color': accentColor,
    '--accent-blue': accentColor
  }

  return (
    <div className="resume-template-2" style={templateStyle}>
      {/* Colored Header Bar */}
      <div className="header-bar-t2">
        <div className="header-content-t2">
          <h1 className="resume-name-t2">{personal.fullName || 'Your Name'}</h1>
          
          {/* Contact Information */}
          <div className="contact-info-header-t2">
            {personal.email && (
              <span className="contact-item-header-t2">
                <Mail size={16} />
                <span>{personal.email}</span>
              </span>
            )}
            
            {personal.phone && (
              <span className="contact-item-header-t2">
                <Phone size={16} />
                <span>{personal.phone}</span>
              </span>
            )}
            
            {personal.location && (
              <span className="contact-item-header-t2">
                <MapPin size={16} />
                <span>{personal.location}</span>
              </span>
            )}
            
            {personal.website && (
              <span className="contact-item-header-t2">
                <Globe size={16} />
                <span>{personal.website}</span>
              </span>
            )}
            
            {personal.linkedin && (
              <span className="contact-item-header-t2">
                <Linkedin size={16} />
                <span>{personal.linkedin}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-wrapper-t2">
        {/* Professional Summary */}
        {summary && (
          <div className="resume-section-t2">
            <h2 className="section-title-t2">Professional Summary</h2>
            <p className="section-content-t2">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && (
          <div className="resume-section-t2">
            <h2 className="section-title-t2">Experience</h2>
            {experiences.map((exp, idx) => (
              (exp.company || exp.role || exp.position) && (
                <div key={idx} className="experience-item-t2">
                  <div className="experience-header-t2">
                    <div className="experience-title-block-t2">
                      <h3 className="job-title-t2">{exp.role || exp.position || 'Position'}</h3>
                      <p className="company-name-t2">{exp.company || 'Company'}</p>
                    </div>
                    {(exp.startDate || exp.endDate) && (
                      <div className="experience-dates-t2">
                        {exp.startDate && formatDate(exp.startDate)}
                        {exp.startDate && exp.endDate && ' - '}
                        {exp.endDate && formatDate(exp.endDate)}
                      </div>
                    )}
                  </div>
                  {exp.desc && <p className="experience-desc-t2">{exp.desc}</p>}
                </div>
              )
            ))}
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="resume-section-t2">
            <h2 className="section-title-t2">Education</h2>
            {education.map((edu, idx) => (
              (edu.school || edu.degree) && (
                <div key={idx} className="education-item-t2">
                  <div className="education-header-t2">
                    <div className="education-title-block-t2">
                      <h3 className="degree-t2">{edu.degree || 'Degree'}</h3>
                      <p className="school-name-t2">{edu.school || 'Institution'}</p>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="resume-section-t2">
            <h2 className="section-title-t2">Skills</h2>
            <div className="skills-container-t2">
              {skills.map((skill, idx) => (
                <span key={idx} className="skill-item-t2">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div className="resume-section-t2">
            <h2 className="section-title-t2">Certifications</h2>
            <div className="certifications-container-t2">
              {certifications.map((cert, idx) => (
                <span key={idx} className="certification-item-t2">{typeof cert === 'string' ? cert : cert.certName}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
