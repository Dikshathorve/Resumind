import './ResumePreview.css'
import { Sparkles, Zap, Check } from 'lucide-react'

export default function ResumePreview() {
  return (
    <section className="resume-preview-section">
      <div className="resume-preview-wrapper">
        {/* Background gradient blur */}
        <div className="resume-background-blur"></div>

        {/* Floating cards around the main resume */}
        <div className="floating-card floating-card-1">
          <div className="card-content">
            <Sparkles size={16} className="card-icon accent" />
            <span className="card-text">Spelling: Received</span>
          </div>
        </div>

        <div className="floating-card floating-card-2">
          <div className="card-content">
            <Zap size={16} className="card-icon primary" />
            <span className="card-text">Rate: 9 of 5</span>
          </div>
        </div>

        <div className="floating-card floating-card-3">
          <div className="card-content">
            <Check size={16} className="card-icon success" />
            <span className="card-text">"Improved website UI, increasing conversion by 24%"</span>
          </div>
        </div>

        <div className="floating-card floating-card-4">
          <div className="card-content">
            <Sparkles size={16} className="card-icon accent" />
            <span className="card-text">"Managed projects..." for a stronger tone</span>
          </div>
        </div>

        {/* Main Resume Card */}
        <div className="resume-card-wrapper">
          <div className="resume-card-glow"></div>
          <div className="resume-card">
            <div className="resume-top">
              <div className="resume-left">
                <div className="tag-group">
                  <span className="tag tag-primary">activities</span>
                  <span className="tag tag-secondary">public</span>
                </div>
                <h3 className="contact-title">contact</h3>
                <div className="contact-info">
                  <p>+91 1234 56 4545</p>
                  <p>username@email.com</p>
                </div>
              </div>

              <div className="resume-right">
                <div className="date">June 2016 - May 2017</div>
                <h4 className="job-title">Senior Visualizer</h4>
                <p className="company">Communications Media Pvt. Ltd., New Delhi</p>
              </div>
            </div>

            <div className="resume-responsibilities">
              <p>• Designed Youtube Mards and Thumbnails for In House brands.</p>
              <p>• Designing Infographic for Academic Videos.</p>
              <p>• Minimalist UI Designing.</p>
              <p>• Designing Program tiles like Scripts/Nitro Roaster, Roastathon, etc.</p>
              <p>• Explicit design as per the brand guidelines.</p>
              <p>• Managed social media creatives for e-commerce giants like Flipkart and Myntra.</p>
            </div>
          </div>
        </div>

        {/* Match Score */}
        <div className="match-score">
          <span className="score-text">67% match</span>
        </div>
      </div>
    </section>
  )
}
