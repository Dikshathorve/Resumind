import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react'
import './ResumeTemplate4.css'

export default function ResumeTemplate4({ personal, summary, experiences, education, projects, skills, certifications, accentColor = '#3B82F6' }) {
  const templateStyle = {
    '--primary-color': accentColor,
    '--accent-blue': accentColor
  }

  return (
    <div className="resume-template-4" style={templateStyle}>
      {/* Header */}
      <div className="template4-header">
        <h1 className="resume-name-t4">{personal.fullName || 'Your Name'}</h1>
        <p className="job-title-t4">{personal.jobTitle || 'Job Title'}</p>
        
        {/* Contact Info */}
        <div className="contact-info-t4">
          {personal.email && (
            <span className="contact-link">
              <Mail size={12} />
              {personal.email}
            </span>
          )}
          {personal.phone && (
            <span className="contact-link">
              <Phone size={12} />
              {personal.phone}
            </span>
          )}
          {personal.location && (
            <span className="contact-link">
              <MapPin size={12} />
              {personal.location}
            </span>
          )}
          {personal.website && (
            <span className="contact-link">
              <Globe size={12} />
              {personal.website}
            </span>
          )}
          {personal.linkedin && (
            <span className="contact-link">
              <Linkedin size={12} />
              {personal.linkedin}
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="template4-content">
        {/* Professional Summary */}
        {summary && (
          <section className="template4-section">
            <h2 className="section-heading-t4">PROFESSIONAL SUMMARY</h2>
            <p className="section-text-t4">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && (
          <section className="template4-section">
            <h2 className="section-heading-t4">EXPERIENCE</h2>
            {experiences.map((exp, idx) => (
              (exp.company || exp.role || exp.position) && (
                <div key={idx} className="exp-item-t4">
                  <div className="exp-header-t4">
                    <h3 className="exp-role-t4">{exp.role || exp.position || 'Position'}</h3>
                    {exp.endDate && <span className="exp-date-t4">{exp.endDate}</span>}
                  </div>
                  <p className="exp-company-t4">{exp.company || 'Company'}</p>
                  {exp.desc && <p className="exp-desc-t4">{exp.desc}</p>}
                </div>
              )
            ))}
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="template4-section">
            <h2 className="section-heading-t4">EDUCATION</h2>
            {education.map((edu, idx) => (
              (edu.institution || edu.degree) && (
                <div key={idx} className="edu-item-t4">
                  <h3 className="edu-school-t4">{edu.institution || 'Institution'}</h3>
                  <p className="edu-degree-t4">{edu.degree || 'Degree'}</p>
                  {edu.fieldOfStudy && <p className="edu-field-t4">{edu.fieldOfStudy}</p>}
                  {edu.gpa && <p className="edu-gpa-t4">GPA: {edu.gpa}</p>}
                </div>
              )
            ))}
          </section>
        )}}

        {/* Projects */}
        {projects && projects.length > 0 && projects.some(p => p.name || p.description) && (
          <section className="template4-section">
            <h2 className="section-heading-t4">PROJECTS</h2>
            {projects.map((proj, idx) => (
              (proj.name || proj.description) && (
                <div key={idx} className="proj-item-t4">
                  <h3 className="proj-name-t4">{proj.name || 'Project'}</h3>
                  {proj.type && <p className="proj-type-t4">{proj.type}</p>}
                  {proj.description && <p className="proj-desc-t4">{proj.description}</p>}
                </div>
              )
            ))}
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="template4-section">
            <h2 className="section-heading-t4">SKILLS</h2>
            <ul className="skills-list-t4">
              <li className="skill-item-t4">{skills.join(', ')}</li>
            </ul>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="template4-section">
            <h2 className="section-heading-t4">CERTIFICATIONS</h2>
            <ul className="certs-list-t4">
              {certifications.map((cert, idx) => (
                cert.certName && (
                  <li key={idx} className="cert-item-t4">
                    <strong>{typeof cert === 'string' ? cert : cert.certName}</strong>
                    {cert.issuer && <p className="cert-issuer-t4">{cert.issuer}</p>}
                    <div className="cert-dates-t4">
                      {cert.issueDate && (
                        <span className="cert-date-t4">
                          Issue: {new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                        </span>
                      )}
                      {cert.expiryDate && (
                        <span className="cert-date-t4">
                          Expires: {new Date(cert.expiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                        </span>
                      )}
                    </div>
                  </li>
                )
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
