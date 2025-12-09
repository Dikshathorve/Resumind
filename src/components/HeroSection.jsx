import './HeroSection.css'

export default function HeroSection({ onStart }) {
  return (
    <section className="hero" id="home">
      <div className="hero-badge">
        <span className="badge-icon">👥</span>
        <span>Trusted by 100,000+ professionals worldwide</span>
      </div>

      <div className="hero-content">
        <h2>
          Build your CV <br />
          <span className="gradient-text">smarter, faster, better</span>
        </h2>
        <p className="hero-subtitle">
          AI-powered resume builder tailored to your dream job.<br />
          Get matched with the right keywords, tone, and layout — in minutes.
        </p>
        <div className="hero-buttons">
          <button className="primary-button" onClick={onStart}>Build my CV</button>
          <button className="secondary-button">Request demo</button>
        </div>
      </div>
    </section>
  )
}
