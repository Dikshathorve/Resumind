import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section footer-main">
          <div className="footer-logo">
            <div className="logo-icon">✨</div>
            <h4>Resumind</h4>
          </div>
          <p>Build professional resumes in minutes with AI-powered tools. Land your dream job faster.</p>
        </div>
        <div className="footer-section">
          <h4>Product</h4>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#templates">Templates</a></li>
            <li><a href="#ai-tools">AI Tools</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#press">Press</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="#help">Help Center</a></li>
            <li><a href="#api">API Docs</a></li>
            <li><a href="#community">Community</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-legal">
        <h4>Legal</h4>
        <ul>
          <li><a href="#privacy">Privacy</a></li>
          <li><a href="#terms">Terms</a></li>
          <li><a href="#cookies">Cookies</a></li>
          <li><a href="#licenses">Licenses</a></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Resumind. All rights reserved.</p>
        <div className="footer-social">
          <a href="#twitter">Twitter</a>
          <a href="#linkedin">LinkedIn</a>
          <a href="#github">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
