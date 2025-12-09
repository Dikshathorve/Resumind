import { useEffect, useRef, useState } from 'react'
import './BuildResume.css'

export default function BuildResume({ onClose }) {
  const leftRef = useRef(null)
  const proxyRef = useRef(null)
  // form state for live preview
  const [personal, setPersonal] = useState({
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: ''
  })

  const [summary, setSummary] = useState('')

  const [experiences, setExperiences] = useState([
    { company: '', role: '', desc: '' }
  ])

  const [education, setEducation] = useState({ school: '', degree: '' })

  const [skills, setSkills] = useState([])
  const [skillInput, setSkillInput] = useState('')

  const [certifications, setCertifications] = useState([])
  const [certInput, setCertInput] = useState('')

  useEffect(() => {
    const left = leftRef.current
    const proxy = proxyRef.current
    if (!left || !proxy) return

    // set proxy spacer height to match left scrollable height
    const updateProxy = () => {
      const spacer = proxy.querySelector('.proxy-spacer')
      if (spacer) spacer.style.height = left.scrollHeight + 'px'
    }

    updateProxy()
    window.addEventListener('resize', updateProxy)

    const onProxyScroll = () => {
      const ratio = proxy.scrollTop / (proxy.scrollHeight - proxy.clientHeight || 1)
      left.scrollTop = ratio * (left.scrollHeight - left.clientHeight || 0)
    }

    const onLeftScroll = () => {
      const ratio = left.scrollTop / (left.scrollHeight - left.clientHeight || 1)
      proxy.scrollTop = ratio * (proxy.scrollHeight - proxy.clientHeight || 0)
    }

    proxy.addEventListener('scroll', onProxyScroll)
    left.addEventListener('scroll', onLeftScroll)

    return () => {
      proxy.removeEventListener('scroll', onProxyScroll)
      left.removeEventListener('scroll', onLeftScroll)
      window.removeEventListener('resize', updateProxy)
    }
  }, [])

  return (
    <div className="build-page">
      <div className="build-nav-bar">
        <div className="nav-left">
          <button className="back-to-home" onClick={onClose}>← Back to Home</button>
        </div>
        <div className="nav-center">
          <button className="nav-item">
            <span className="nav-icon">◎</span>
            <span className="nav-label">Job Matcher</span>
          </button>
          <button className="nav-item">
            <span className="nav-icon">📄</span>
            <span className="nav-label">ATS Analyzer</span>
          </button>
          <button className="nav-pill">
            <span className="nav-icon">✨</span>
            <span className="nav-label">AI Assist</span>
          </button>
        </div>
        <div className="nav-right">
          <button className="download-button">
            <span className="download-icon">⬇️</span>
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      <div className="build-content">
        <div className="build-title">
          <h1>Build Your Resume</h1>
        </div>

      <div className="build-inner">
        <div className="builder-left" ref={leftRef}>
          <section className="panel">
            <h3>Personal Information</h3>
            <div className="row">
              <input placeholder="Full Name" value={personal.fullName} onChange={e => setPersonal({...personal, fullName: e.target.value})} />
              <input placeholder="Job Title" value={personal.jobTitle} onChange={e => setPersonal({...personal, jobTitle: e.target.value})} />
            </div>
            <div className="row">
              <input placeholder="Email" value={personal.email} onChange={e => setPersonal({...personal, email: e.target.value})} />
              <input placeholder="Phone" value={personal.phone} onChange={e => setPersonal({...personal, phone: e.target.value})} />
            </div>
            <input className="full" placeholder="Location (City, State)" value={personal.location} onChange={e => setPersonal({...personal, location: e.target.value})} />
            <div className="row">
              <input placeholder="LinkedIn URL" value={personal.linkedin} onChange={e => setPersonal({...personal, linkedin: e.target.value})} />
              <input placeholder="Website" value={personal.website} onChange={e => setPersonal({...personal, website: e.target.value})} />
            </div>
          </section>

          <section className="panel">
            <h3>Professional Summary <span className="hint">AI Enhance</span></h3>
            <textarea placeholder="Write a brief professional summary..." rows={6} value={summary} onChange={e => setSummary(e.target.value)} />
          </section>

          <section className="panel">
            <h3>Experience</h3>
            {experiences.map((exp, idx) => (
              <div className="exp-item" key={idx}>
                <input placeholder="Company" value={exp.company} onChange={e => {
                  const copy = [...experiences]; copy[idx].company = e.target.value; setExperiences(copy)
                }} />
                <input placeholder="Role" value={exp.role} onChange={e => {
                  const copy = [...experiences]; copy[idx].role = e.target.value; setExperiences(copy)
                }} />
                <textarea placeholder="Describe your responsibilities..." rows={4} value={exp.desc} onChange={e => {
                  const copy = [...experiences]; copy[idx].desc = e.target.value; setExperiences(copy)
                }} />
              </div>
            ))}
          </section>

          <section className="panel">
            <h3>Education</h3>
            <input placeholder="School" value={education.school} onChange={e => setEducation({...education, school: e.target.value})} />
            <input placeholder="Degree" value={education.degree} onChange={e => setEducation({...education, degree: e.target.value})} />
          </section>

          <section className="panel">
            <h3>Skills</h3>
            <input placeholder="Add a skill (press enter)" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => {
              if(e.key === 'Enter' && skillInput.trim()){
                setSkills(prev => [...prev, skillInput.trim()])
                setSkillInput('')
                e.preventDefault()
              }
            }} />
            <div className="skills-list">
              {skills.map((s, i) => (
                <span key={i} className="skill-badge">{s}</span>
              ))}
            </div>
          </section>

          <section className="panel">
            <h3>Certifications</h3>
            <input placeholder="Add a certification (press enter)" value={certInput} onChange={e => setCertInput(e.target.value)} onKeyDown={e => {
              if(e.key === 'Enter' && certInput.trim()){
                setCertifications(prev => [...prev, certInput.trim()])
                setCertInput('')
                e.preventDefault()
              }
            }} />
            <div className="skills-list">
              {certifications.map((c, i) => (
                <span key={i} className="skill-badge">{c}</span>
              ))}
            </div>
          </section>
        </div>

        <div className="center-gutter">
          <div className="scroll-proxy" ref={proxyRef}>
            <div className="proxy-spacer" />
          </div>
        </div>

        <div className="builder-right">
          <div className="preview-section-header">
            <h3>Live Preview</h3>
            <div className="live-status">
              <span className="status-dot"></span>
              <span className="status-text">Updating in real-time</span>
            </div>
          </div>
          <div className="preview-card">
            <div className="preview-header">
              {(personal.fullName || personal.jobTitle) && (
                <div className="header-left">
                  <div className="name">{personal.fullName}</div>
                  <div className="title">{personal.jobTitle}</div>
                </div>
              )}

              <div className="contact-row">
                <span className="contact-item">
                  <span className="contact-text">{personal.email || ''}</span>
                  <span className="contact-icon">✉️</span>
                </span>

                <span className="contact-item">
                  <span className="contact-text">{personal.phone || ''}</span>
                  <span className="contact-icon">📞</span>
                </span>

                <span className="contact-item">
                  <span className="contact-text">{personal.location || ''}</span>
                  <span className="contact-icon">📍</span>
                </span>
              </div>
            </div>
            <div className="preview-body">

              <div className="section">
                <h4><span className="section-icon">📝</span> Professional Summary</h4>
                <p className="section-text">{summary || 'Write a brief professional summary...'}</p>
              </div>

              <div className="section">
                <h4><span className="section-icon">💼</span> Experience</h4>
                {experiences.every(e => !e.company && !e.role && !e.desc) ? (
                  <p className="section-text">No experience added yet.</p>
                ) : (
                  experiences.map((e, i) => (
                    (e.company || e.role || e.desc) && (
                      <div key={i} className="preview-exp">
                        <div className="two-col">
                          <div className="job-title">{e.role ? `${e.role}` : ''}{e.role && e.company ? ' • ' : ''}{e.company}</div>
                          <div className="job-dates">{/* optional dates */}</div>
                        </div>
                        {e.desc && <div className="preview-exp-desc">{e.desc}</div>}
                      </div>
                    )
                  ))
                )}
              </div>

              <div className="section">
                <h4><span className="section-icon">🎓</span> Education</h4>
                <div className="section-text">{education.school || 'School name'}, {education.degree || 'Degree'}</div>
              </div>

              <div className="section">
                <h4><span className="section-icon">⚙️</span> Skills</h4>
                <div className="skills-list">
                  {skills.length ? skills.map((s, i) => <span key={i} className="skill-badge">{s}</span>) : <div className="section-text">No skills added yet.</div>}
                </div>
              </div>

              <div className="section">
                <h4><span className="section-icon">🏆</span> Certifications</h4>
                <div className="skills-list">
                  {certifications.length ? certifications.map((c, i) => <span key={i} className="skill-badge">{c}</span>) : <div className="section-text">No certifications added yet.</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
