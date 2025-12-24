import './ResumeTemplate_Minimal.css'

export default function ResumeTemplate_Minimal({ personal, summary, experiences, education, projects, skills, certifications }) {
  return (
    <div className="resume-template-minimal">
      {/* Header Section */}
      <header className="minimal-header">
        <h1 className="resume-title">{personal.fullName || 'YOUR NAME'}</h1>
        <p className="resume-profession">{personal.jobTitle || 'Professional Title'}</p>
        <div className="header-info">
          <span>{personal.email || 'hello@completeresumes.com'}</span>
          <span className="divider">•</span>
          <span>{personal.phone || '(212) 123-4567'}</span>
          <span className="divider">•</span>
          <span>{personal.location || 'City, ST'}</span>
          {personal.linkedin && (
            <>
              <span className="divider">•</span>
              <span>{personal.linkedin}</span>
            </>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {summary && (
        <section className="minimal-section">
          <h2 className="section-title">PROFESSIONAL SUMMARY</h2>
          <div className="section-divider"></div>
          <p className="summary-text">{summary}</p>
        </section>
      )}

      {/* Professional Experience */}
      {experiences && experiences.length > 0 && (
        <section className="minimal-section">
          <h2 className="section-title">PROFESSIONAL EXPERIENCE</h2>
          <div className="section-divider"></div>
          
          {experiences.map((exp, index) => (
            <div key={index} className="experience-entry">
              <div className="experience-header">
                <h3 className="company-name">{exp.company}</h3>
                <span className="location">{exp.location}</span>
              </div>
              
              <div className="job-info">
                <strong className="job-title">{exp.jobTitle}</strong>
                {(exp.startDate || exp.endDate) && (
                  <span className="date-range">
                    {exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''} - {exp.currentlyWorking ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}
                  </span>
                )}
              </div>

              {exp.description && (
                <ul className="job-description">
                  {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                    <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="minimal-section">
          <h2 className="section-title">EDUCATION</h2>
          <div className="section-divider"></div>
          
          {education.map((edu, index) => (
            <div key={index} className="education-entry">
              <div className="education-header">
                {(edu.degree || edu.fieldOfStudy) && <h3 className="degree">{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</h3>}
                {edu.graduationDate && (
                  <span className="graduation-year">
                    Year of {new Date(edu.graduationDate).getFullYear()}
                  </span>
                )}
              </div>
              {edu.institution && <p className="school-name">{edu.institution}</p>}
              {edu.gpa && <p className="gpa">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="minimal-section">
          <h2 className="section-title">PROJECTS</h2>
          <div className="section-divider"></div>
          
          {projects.map((project, index) => (
            (project.name || project.description) && (
              <div key={index} className="project-entry">
                {project.name && <h3 className="project-name">{project.name}</h3>}
                {project.type && <p className="project-type">{project.type}</p>}
                {project.description && <p className="project-description">{project.description}</p>}
                {project.technologies && project.technologies.length > 0 && (
                  <p className="project-tech">
                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                  </p>
                )}
              </div>
            )
          ))}
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="minimal-section">
          <h2 className="section-title">SKILLS</h2>
          <div className="section-divider"></div>
          <ul className="skills-list-minimal">
            {skills.map((skill, index) => (
              <li key={index} className="skill-item-minimal">{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="minimal-section">
          <h2 className="section-title">CERTIFICATIONS</h2>
          <div className="section-divider"></div>
          
          {certifications.map((cert, index) => (
            cert.certName && (
              <div key={index} className="certification-entry">
                <h3 className="cert-name">{cert.certName}</h3>
                {cert.issuer && <p className="cert-issuer">{cert.issuer}</p>}
                <div className="cert-dates">
                  {cert.issueDate && (
                    <span className="cert-date">
                      Issue: {new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </span>
                  )}
                  {cert.expiryDate && (
                    <span className="cert-date">
                      Expires: {new Date(cert.expiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </span>
                  )}
                </div>
              </div>
            )
          ))}
        </section>
      )}
    </div>
  )
}
