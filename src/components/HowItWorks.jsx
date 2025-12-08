import './HowItWorks.css'

const steps = [
  {
    id: 1,
    title: 'Upload Your Info',
    description: 'Paste your LinkedIn profile or upload an existing resume. Our AI will extract and organize your information.',
    icon: '📤'
  },
  {
    id: 2,
    title: 'AI Enhancement',
    description: 'Our AI rewrites your experience with powerful action verbs and quantifiable achievements.',
    icon: '🛠️'
  },
  {
    id: 3,
    title: 'Match & Optimize',
    description: 'Paste any job description and watch your resume adapt with relevant keywords and skills.',
    icon: '✓'
  },
  {
    id: 4,
    title: 'Download & Apply',
    description: 'Export your polished resume in multiple formats ready to impress recruiters.',
    icon: '📥'
  }
]

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-it-works-container">
        <h2>How it <span className="gradient-text">works</span></h2>
        <p className="how-it-works-subtitle">Four simple steps to your perfect resume</p>
        
        <div className="steps-wrapper">
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={step.id} className="step-item">
                <div className="step-number-badge">{String(step.id).padStart(2, '0')}</div>
                {index < steps.length - 1 && <div className="step-connector"></div>}
                <div className="step-card">
                  <div className="step-icon">{step.icon}</div>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
