import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react'
import './ResumeTemplate2.css'

export default function ResumeTemplate2({ personal, summary, experiences, education, projects, skills, certifications, accentColor = '#3B82F6' }) {
  const templateStyle = {
    '--primary-color': accentColor,
    '--accent-blue': accentColor
  }

  return (
    <div className="resume-template-2" style={templateStyle}>
      {/* Sidebar */}
      <div className="sidebar-t2">
        {/* Profile Section */}
        <div className="profile-section-t2">
          <h2 className="sidebar-name-t2">{personal.fullName || 'Your Name'}</h2>
          <p className="sidebar-title-t2">{personal.jobTitle || 'Job Title'}</p>
        </div>

        {/* Contact Section */}
        {(personal.email || personal.phone || personal.location || personal.website || personal.linkedin) && (
          <div className="contact-section-t2">
            <h3>CONTACT</h3>
            {personal.email && (
              <div className="contact-item-t2">
                <Mail size={14} />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="contact-item-t2">
                <Phone size={14} />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="contact-item-t2">
                <MapPin size={14} />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.website && (
              <div className="contact-item-t2">
                <Globe size={14} />
                <span>{personal.website}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="contact-item-t2">
                <Linkedin size={14} />
                <span>{personal.linkedin}</span>
              </div>
            )}
          </div>
        )}

        {/* Skills Section in Sidebar */}
        {skills && skills.length > 0 && (
          <div className="skills-section-t2">
            <h3>SKILLS</h3>
            {skills.map((skill, idx) => (
              <div key={idx} className="skill-item-t2">
                <span>{skill}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content-t2">
        {/* Header */}
        <div className="content-header-t2">
          <h1 className="content-name-t2">{personal.fullName || 'Your Name'}</h1>
          <p className="content-title-t2">{personal.jobTitle || 'Job Title'}</p>
        </div>

        {/* Professional Summary */}
        {summary && (
          <div className="content-section-t2">
            <h2 className="section-heading-t2">PROFESSIONAL SUMMARY</h2>
            <p className="section-text-t2">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && (
          <div className="content-section-t2">
            <h2 className="section-heading-t2">EXPERIENCE</h2>
            {experiences.map((exp, idx) => (
              (exp.company || exp.role || exp.position) && (
                <div key={idx} className="exp-item-t2">
                  <div className="exp-header-t2">
                    <h3 className="exp-role-t2">{exp.role || exp.position || 'Position'}</h3>
                    {exp.endDate && <span className="exp-date-t2">{exp.endDate}</span>}
                  </div>
                  <p className="exp-company-t2">{exp.company || 'Company'}</p>
                  {exp.desc && <p className="exp-desc-t2">{exp.desc}</p>}
                </div>
              )
            ))}
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="content-section-t2">
            <h2 className="section-heading-t2">EDUCATION</h2>
            {education.map((edu, idx) => (
              (edu.school || edu.degree) && (
                <div key={idx} className="edu-item-t2">
                  <h3 className="edu-school-t2">{edu.school || 'Institution'}</h3>
                  <p className="edu-degree-t2">{edu.degree || 'Degree'}</p>
                </div>
              )
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div className="content-section-t2">
            <h2 className="section-heading-t2">CERTIFICATIONS</h2>
            <ul className="certs-list-t2">
              {certifications.map((cert, idx) => (
                <li key={idx} className="cert-item-t2">{cert}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
