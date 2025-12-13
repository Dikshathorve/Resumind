import { useEffect, useRef, useState } from 'react'
import { Briefcase, FileText, Sparkles, Download, Mail, Phone, MapPin, FileText as FileDocument, Briefcase as WorkBriefcase, GraduationCap, Settings, Award } from 'lucide-react'
import './BuildResume.css'
import AISuggestions from '../components/AISuggestions'

export default function BuildResume({ onClose, onATSAnalyzer }) {
  const leftRef = useRef(null)
  const proxyRef = useRef(null)
  const [selectedTemplate, setSelectedTemplate] = useState('template1')
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [accentColor, setAccentColor] = useState('#6366f1')
  const [selectorTab, setSelectorTab] = useState('templates')
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

  const [aiFieldType, setAiFieldType] = useState('')
  const [aiFieldValue, setAiFieldValue] = useState('')
  const [aiFieldIndex, setAiFieldIndex] = useState(null)
  const [aiSidebarOpen, setAiSidebarOpen] = useState(false)

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
            <Briefcase size={20} className="nav-icon-svg" />
            <span className="nav-label">Job Matcher</span>
          </button>
          <button className="nav-item" onClick={() => onATSAnalyzer({ personal, summary, experiences, education, skills, certifications })}>
            <FileText size={20} className="nav-icon-svg" />
            <span className="nav-label">ATS Analyzer</span>
          </button>
          <button className="nav-pill" onClick={() => {
            setAiSidebarOpen(true)
            // default to jobTitle context
            setAiFieldType('jobTitle')
            setAiFieldValue(personal.jobTitle || '')
            setAiFieldIndex(null)
          }}>
            <Sparkles size={20} className="nav-icon-svg" />
            <span className="nav-label">AI Assist</span>
          </button>
        </div>
        <div className="nav-right">
          <button className="download-button">
            <Download size={20} className="nav-icon-svg" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      <div className="build-content">
        <div className="build-title">
          <h1>Build Your Resume</h1>
        </div>

        <div className="template-selector">
          {/* Selector Tabs */}
          <div className="selector-tabs">
            <button
              className={`tab-button ${selectorTab === 'templates' ? 'active' : ''}`}
              onClick={() => setSelectorTab('templates')}
            >
              Templates
            </button>
            <button
              className={`tab-button ${selectorTab === 'accent' ? 'active' : ''}`}
              onClick={() => setSelectorTab('accent')}
            >
              Accent Color
            </button>
          </div>

          {/* Templates Tab Content */}
          {selectorTab === 'templates' && (
            <div className="tab-content">
              <label className="template-label">Choose Template:</label>
              <div className="template-options">
                <button 
                  className={`template-option ${selectedTemplate === 'template1' ? 'active' : ''}`}
                  onClick={() => setSelectedTemplate('template1')}
                >
                  <span className="template-option-name">Classic</span>
                  <span className="template-option-desc">Professional & Clean</span>
                </button>
                <button 
                  className={`template-option ${selectedTemplate === 'template2' ? 'active' : ''}`}
                  onClick={() => setSelectedTemplate('template2')}
                >
                  <span className="template-option-name">Modern</span>
                  <span className="template-option-desc">Sidebar Layout</span>
                </button>
                <button 
                  className={`template-option ${selectedTemplate === 'template3' ? 'active' : ''}`}
                  onClick={() => setSelectedTemplate('template3')}
                >
                  <span className="template-option-name">Minimal</span>
                  <span className="template-option-desc">Simple & Elegant</span>
                </button>
              </div>
            </div>
          )}

          {/* Accent Color Tab Content */}
          {selectorTab === 'accent' && (
            <div className="tab-content">
              <label className="template-label">Choose Accent Color:</label>
              <div className="color-palette">
                {[
                  { name: 'Indigo', value: '#6366f1' },
                  { name: 'Purple', value: '#a855f7' },
                  { name: 'Blue', value: '#3b82f6' },
                  { name: 'Cyan', value: '#06b6d4' },
                  { name: 'Green', value: '#10b981' },
                  { name: 'Red', value: '#ef4444' },
                  { name: 'Orange', value: '#f97316' },
                  { name: 'Pink', value: '#ec4899' },
                ].map((color) => (
                  <button
                    key={color.value}
                    className={`color-swatch ${accentColor === color.value ? 'active' : ''}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setAccentColor(color.value)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

      <div className="build-inner">
        <div className="builder-left" ref={leftRef}>
          <section className="panel">
            <h3>Personal Information</h3>
            {selectedTemplate === 'template2' && (
              <div className="photo-upload-section">
                <input 
                  type="file" 
                  id="photo-upload" 
                  accept="image/*" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const reader = new FileReader()
                      reader.onload = (event) => {
                        setProfilePhoto(event.target.result)
                      }
                      reader.readAsDataURL(e.target.files[0])
                    }
                  }}
                  className="photo-input"
                />
                <label htmlFor="photo-upload" className="photo-label">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" className="photo-preview" />
                  ) : (
                    <div className="photo-placeholder">
                      <span>📷</span>
                      <p>Add Photo</p>
                    </div>
                  )}
                </label>
                {profilePhoto && (
                  <button 
                    className="remove-photo-btn"
                    onClick={() => setProfilePhoto(null)}
                  >
                    Remove Photo
                  </button>
                )}
              </div>
            )}
            <div className="row">
              <input placeholder="Full Name" value={personal.fullName} onChange={e => setPersonal({...personal, fullName: e.target.value})} />
              <div className="input-with-ai">
                <input placeholder="Job Title" value={personal.jobTitle} onChange={e => {
                  setPersonal({...personal, jobTitle: e.target.value})
                  setAiFieldType('jobTitle')
                  setAiFieldValue(e.target.value)
                }} />
                <button 
                  className="ai-assist-btn-inline"
                  onClick={() => {
                      setAiFieldType('jobTitle')
                      setAiFieldValue(personal.jobTitle)
                      setAiSidebarOpen(true)
                  }}
                  title="Get AI suggestions"
                >
                  ✨
                </button>
              </div>
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
            <div className="section-header-with-ai">
              <h3>Professional Summary <span className="hint">AI Enhance</span></h3>
              <button 
                className="ai-assist-btn"
                onClick={() => {
                  setAiFieldType('description')
                  setAiFieldValue(summary)
                  setAiSidebarOpen(true)
                }}
                title="Get AI suggestions"
              >
                ✨
              </button>
            </div>
            <textarea placeholder="Write a brief professional summary..." rows={6} value={summary} onChange={e => {
              setSummary(e.target.value)
              setAiFieldType('description')
              setAiFieldValue(e.target.value)
            }} />
          </section>

          <section className="panel">
            <h3>Experience</h3>
            {experiences.map((exp, idx) => (
              <div className="exp-item" key={idx}>
                <div className="input-with-ai">
                  <input placeholder="Company" value={exp.company} onChange={e => {
                    const copy = [...experiences]; copy[idx].company = e.target.value; setExperiences(copy)
                    setAiFieldType('company')
                    setAiFieldValue(e.target.value)
                    setAiFieldIndex(idx)
                  }} />
                  <button 
                    className="ai-assist-btn-inline"
                    onClick={() => {
                      setAiFieldType('company')
                      setAiFieldValue(exp.company)
                      setAiFieldIndex(idx)
                      setAiSidebarOpen(true)
                    }}
                    title="Get AI suggestions"
                  >
                    ✨
                  </button>
                </div>
                <div className="input-with-ai">
                  <input placeholder="Role" value={exp.role} onChange={e => {
                    const copy = [...experiences]; copy[idx].role = e.target.value; setExperiences(copy)
                    setAiFieldType('role')
                    setAiFieldValue(e.target.value)
                    setAiFieldIndex(idx)
                  }} />
                  <button 
                    className="ai-assist-btn-inline"
                    onClick={() => {
                      setAiFieldType('role')
                      setAiFieldValue(exp.role)
                      setAiFieldIndex(idx)
                      setAiSidebarOpen(true)
                    }}
                    title="Get AI suggestions"
                  >
                    ✨
                  </button>
                </div>
                <div className="textarea-with-ai">
                  <textarea placeholder="Describe your responsibilities..." rows={4} value={exp.desc} onChange={e => {
                    const copy = [...experiences]; copy[idx].desc = e.target.value; setExperiences(copy)
                    setAiFieldType('description')
                    setAiFieldValue(e.target.value)
                    setAiFieldIndex(idx)
                  }} />
                  <button 
                    className="ai-assist-btn-textarea"
                    onClick={() => {
                      setAiFieldType('description')
                      setAiFieldValue(exp.desc)
                      setAiFieldIndex(idx)
                      setAiSidebarOpen(true)
                    }}
                    title="Get AI suggestions"
                  >
                    ✨
                  </button>
                </div>
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
          
          {aiSidebarOpen && (
            <AISuggestions
              fieldType={aiFieldType}
              currentValue={aiFieldValue}
              onApply={(suggestion) => {
                if (aiFieldIndex !== null && typeof aiFieldIndex === 'number') {
                  const copy = [...experiences]
                  if (aiFieldType === 'company') copy[aiFieldIndex].company = suggestion
                  if (aiFieldType === 'role') copy[aiFieldIndex].role = suggestion
                  if (aiFieldType === 'description') copy[aiFieldIndex].desc = suggestion
                  setExperiences(copy)
                } else {
                  if (aiFieldType === 'jobTitle') setPersonal(p => ({...p, jobTitle: suggestion}))
                  if (aiFieldType === 'description') setSummary(suggestion)
                  if (aiFieldType === 'school') setEducation(e => ({...e, school: suggestion}))
                  if (aiFieldType === 'degree') setEducation(e => ({...e, degree: suggestion}))
                }
                setAiFieldValue('')
                setAiFieldType('')
                setAiFieldIndex(null)
                setAiSidebarOpen(false)
              }}
              onClose={() => setAiSidebarOpen(false)}
            />
          )}

          <div className="preview-card" style={{
            '--accent-color': accentColor,
            '--accent-color-trans': accentColor + '0a',
            '--accent-color-light': accentColor + '14'
          }}>
            {selectedTemplate === 'template1' && (
              <>
                <div className="preview-header" style={{
                  '--accent-color-start': accentColor,
                  '--accent-color-end': accentColor + 'cc'
                }}>
                  {(personal.fullName || personal.jobTitle) && (
                    <div className="header-left">
                      <div className="name">{personal.fullName}</div>
                      <div className="title">{personal.jobTitle}</div>
                    </div>
                  )}

                  <div className="contact-row">
                    <span className="contact-item">
                      <span className="contact-text">{personal.email || ''}</span>
                      <Mail size={16} className="contact-icon" />
                    </span>

                    <span className="contact-item">
                      <span className="contact-text">{personal.phone || ''}</span>
                      <Phone size={16} className="contact-icon" />
                    </span>

                    <span className="contact-item">
                      <span className="contact-text">{personal.location || ''}</span>
                      <MapPin size={16} className="contact-icon" />
                    </span>
                  </div>
                </div>
            <div className="preview-body">

              <div className="section">
                <h4><FileDocument size={20} className="section-icon" style={{ color: accentColor }} /> Professional Summary</h4>
                <p className="section-text">{summary || 'Write a brief professional summary...'}</p>
              </div>

              <div className="section">
                <h4><WorkBriefcase size={20} className="section-icon" style={{ color: accentColor }} /> Experience</h4>
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
                <h4><GraduationCap size={20} className="section-icon" style={{ color: accentColor }} /> Education</h4>
                <div className="section-text">{education.school || 'School name'}, {education.degree || 'Degree'}</div>
              </div>

              <div className="section">
                <h4><Settings size={20} className="section-icon" style={{ color: accentColor }} /> Skills</h4>
                <div className="skills-list">
                  {skills.length ? skills.map((s, i) => <span key={i} className="skill-badge" style={{ backgroundColor: accentColor + '24', color: accentColor, borderColor: accentColor + '4d' }}>{s}</span>) : <div className="section-text">No skills added yet.</div>}
                </div>
              </div>

              <div className="section">
                <h4><Award size={20} className="section-icon" style={{ color: accentColor }} /> Certifications</h4>
                <div className="skills-list">
                  {certifications.length ? certifications.map((c, i) => <span key={i} className="skill-badge" style={{ backgroundColor: accentColor + '24', color: accentColor, borderColor: accentColor + '4d' }}>{c}</span>) : <div className="section-text">No certifications added yet.</div>}
                </div>
              </div>
            </div>
              </>
            )}

            {selectedTemplate === 'template2' && (
              <div className="preview-template2-layout" style={{
                '--accent-color': accentColor,
                '--accent-color-trans': accentColor + '0d',
                '--accent-color-light': accentColor + '66'
              }}>
                <div className="template2-sidebar">
                  <div className="template2-profile">
                    <div className="template2-photo" style={{ backgroundColor: `${accentColor}20`, borderColor: `${accentColor}40` }}>
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="Profile" className="template2-photo-img" />
                      ) : (
                        '👤'
                      )}
                    </div>
                    <h2 className="template2-name">{personal.fullName || 'Your Name'}</h2>
                    <p className="template2-jobtitle">{personal.jobTitle || 'Job Title'}</p>
                  </div>

                  <div className="template2-section">
                    <h3 className="template2-heading" style={{ color: accentColor }}>CONTACT</h3>
                    <div className="template2-item">
                      <span className="template2-icon">📍</span>
                      <div>
                        <p>Address</p>
                        <small>{personal.location || '123 Anywhere St., Any City'}</small>
                      </div>
                    </div>
                    <div className="template2-item">
                      <span className="template2-icon">📞</span>
                      <div>
                        <p>Phone</p>
                        <small>{personal.phone || '+123-456-7890'}</small>
                      </div>
                    </div>
                    <div className="template2-item">
                      <span className="template2-icon">🌐</span>
                      <div>
                        <p>Web</p>
                        <small>{personal.email || 'hello@email.com'}</small>
                      </div>
                    </div>
                  </div>

                  <div className="template2-section">
                    <h3 className="template2-heading" style={{ color: accentColor }}>EDUCATION</h3>
                    {education.school || education.degree ? (
                      <div>
                        <p className="template2-edu-year">2024</p>
                        <p className="template2-edu-name">{education.school || 'UNIVERSITY'}</p>
                        <small>{education.degree || 'Degree'}</small>
                      </div>
                    ) : (
                      <small className="template2-empty">Add education details</small>
                    )}
                  </div>

                  <div className="template2-section">
                    <h3 className="template2-heading" style={{ color: accentColor }}>PRO.SKILLS</h3>
                    <ul className="template2-skills">
                      {skills.length ? (
                        skills.map((s, i) => <li key={i}>{s}</li>)
                      ) : (
                        <li><small>Add your skills</small></li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="template2-content">
                  <div className="template2-header">
                    <h1>{personal.fullName || 'Your Name'}</h1>
                    <p>{personal.jobTitle || 'Job Title'}</p>
                  </div>

                  <div className="template2-body-section">
                    <h3>PROFILE</h3>
                    <div className="template2-divider"></div>
                    <p>{summary || 'Write your professional summary here...'}</p>
                  </div>

                  <div className="template2-body-section">
                    <h3>EXPERIENCE</h3>
                    <div className="template2-divider"></div>
                    {experiences.every(e => !e.company && !e.role && !e.desc) ? (
                      <p className="template2-empty">Add your experience</p>
                    ) : (
                      <>
                        <div className="template2-exp-container">
                          {experiences.map((e, i) => (
                            (e.company || e.role || e.desc) && (
                              <div key={i} className="template2-exp">
                                <p className="template2-exp-dates">2020-Present</p>
                                <p className="template2-exp-company">{e.company || 'Company Name'} | Location</p>
                                <h4>{e.role || 'Job Title'}</h4>
                                <p className="template2-exp-desc">{e.desc || 'Experience description...'}</p>
                              </div>
                            )
                          ))}
                        </div>
                        {experiences.reduce((total, e) => {
                          const descLines = e.desc ? Math.ceil((e.desc.length / 70)) : 0
                          return total + descLines + 3
                        }, 0) > 15 && (
                          <div className="experience-exceeded-warning">
                            ⚠️ Experience content exceeds 15 lines. Content will be truncated in the final resume.
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {selectedTemplate === 'template3' && (
              <>
                <div className="preview-header template3" style={{
                  '--accent-color': accentColor,
                  '--accent-color-trans': accentColor + '0d',
                  '--accent-color-light': accentColor + '66',
                  '--accent-color-bold': accentColor + '99'
                }}>
                  {(personal.fullName || personal.jobTitle) && (
                    <div className="header-left template3">
                      <div className="name template3">{personal.fullName}</div>
                      <div className="title template3" style={{ color: accentColor }}>{personal.jobTitle}</div>
                    </div>
                  )}

                  <div className="contact-row template3">
                    <span className="contact-item template3">{personal.email || ''}</span>
                    <span className="contact-item template3">{personal.phone || ''}</span>
                    <span className="contact-item template3">{personal.location || ''}</span>
                  </div>
                </div>
                <div className="preview-body template3" style={{
                  '--accent-color': accentColor,
                  '--accent-color-trans': accentColor + '0d',
                  '--accent-color-light': accentColor + '66',
                  '--accent-color-trans-light': accentColor + '33'
                }}>
                  <div className="section template3">
                    <h4 className="template3" style={{ color: accentColor }}><FileDocument size={20} className="section-icon" style={{ color: accentColor }} /> Professional Summary</h4>
                    <p className="section-text template3">{summary || 'Write a brief professional summary...'}</p>
                  </div>

                  <div className="section template3">
                    <h4 className="template3" style={{ color: accentColor }}><WorkBriefcase size={20} className="section-icon" style={{ color: accentColor }} /> Experience</h4>
                    {experiences.every(e => !e.company && !e.role && !e.desc) ? (
                      <p className="section-text template3">No experience added yet.</p>
                    ) : (
                      experiences.map((e, i) => (
                        (e.company || e.role || e.desc) && (
                          <div key={i} className="preview-exp template3">
                            <div className="two-col">
                              <div className="job-title template3">{e.role ? `${e.role}` : ''}{e.role && e.company ? ' • ' : ''}{e.company}</div>
                            </div>
                            {e.desc && <div className="preview-exp-desc template3">{e.desc}</div>}
                          </div>
                        )
                      ))
                    )}
                  </div>

                  <div className="section template3">
                    <h4 className="template3" style={{ color: accentColor }}><GraduationCap size={20} className="section-icon" style={{ color: accentColor }} /> Education</h4>
                    <div className="section-text template3">{education.school || 'School name'}, {education.degree || 'Degree'}</div>
                  </div>

                  <div className="section template3">
                    <h4 className="template3" style={{ color: accentColor }}><Settings size={20} className="section-icon" style={{ color: accentColor }} /> Skills</h4>
                    <div className="skills-list template3">
                      {skills.length ? skills.map((s, i) => <span key={i} className="skill-badge template3" style={{ backgroundColor: accentColor + '24', color: accentColor, borderColor: accentColor + '4d' }}>{s}</span>) : <div className="section-text template3">No skills added yet.</div>}
                    </div>
                  </div>

                  <div className="section template3">
                    <h4 className="template3" style={{ color: accentColor }}><Award size={20} className="section-icon" style={{ color: accentColor }} /> Certifications</h4>
                    <div className="skills-list template3">
                      {certifications.length ? certifications.map((c, i) => <span key={i} className="skill-badge template3" style={{ backgroundColor: accentColor + '24', color: accentColor, borderColor: accentColor + '4d' }}>{c}</span>) : <div className="section-text template3">No certifications added yet.</div>}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
