import './FeaturesSection.css'

const features = [
  {
    id: 1,
    title: 'AI-Powered Writing',
    description: 'Our AI analyzes job descriptions and crafts compelling bullet points that highlight your achievements.',
    icon: '🧠'
  },
  {
    id: 2,
    title: 'ATS Optimization',
    description: 'Get your resume past applicant tracking systems with keyword optimization and proper formatting.',
    icon: '🎯'
  },
  {
    id: 3,
    title: 'Match Score Analysis',
    description: 'See how well your resume matches job requirements with real-time scoring and suggestions.',
    icon: '📊'
  },
  {
    id: 4,
    title: 'Instant Generation',
    description: 'Create professional resumes in minutes with our intelligent template system.',
    icon: '⚡'
  },
  {
    id: 5,
    title: 'Multiple Templates',
    description: 'Choose from beautifully designed templates that work across all industries and experience levels.',
    icon: '📄'
  },
  {
    id: 6,
    title: 'Smart Suggestions',
    description: 'Get personalized recommendations to improve your content, formatting, and overall presentation.',
    icon: '✨'
  }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="features">
      <div className="features-container">
        <h2>Why choose Resumind?</h2>
        <p className="features-subtitle">Everything you need to land your dream job</p>
        <div className="features-grid">
          {features.map(feature => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
