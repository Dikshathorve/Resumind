import { useState } from 'react'
import './FAQ.css'

const faqs = [
  {
    id: 1,
    question: 'How does the AI resume builder work?',
    answer: 'Our AI analyzes your input and uses advanced natural language processing to enhance your resume content, optimize it for ATS systems, and match it with job descriptions. It learns from millions of successful resumes to provide intelligent suggestions.'
  },
  {
    id: 2,
    question: 'Will my resume pass ATS systems?',
    answer: 'Yes! Our resume builder is specifically designed to optimize your resume for Applicant Tracking Systems. We ensure proper formatting, keyword placement, and structure that ATS systems can easily parse and understand.'
  },
  {
    id: 3,
    question: 'Can I use Resumind for free?',
    answer: 'We offer a free tier that includes basic resume building and one export. Premium features like unlimited exports, advanced AI suggestions, and match score analysis require a paid subscription.'
  },
  {
    id: 4,
    question: 'How accurate is the match score?',
    answer: 'Our match score algorithm uses AI to compare your resume against job descriptions with 95%+ accuracy. It analyzes keywords, skills, experience level, and other factors to give you a comprehensive score.'
  },
  {
    id: 5,
    question: 'Is my data secure?',
    answer: 'Yes! We use enterprise-grade encryption to protect all your personal information. Your data is stored securely on encrypted servers and we never share your information with third parties. We comply with GDPR and other privacy regulations.'
  }
  
]

export default function FAQ() {
  const [openId, setOpenId] = useState(null)

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <h2>Frequently asked <span className="gradient-text">questions</span></h2>
        <p className="faq-subtitle">Everything you need to know about Resumind</p>
        
        <div className="faq-items">
          {faqs.map(faq => (
            <div key={faq.id} className={`faq-item ${openId === faq.id ? 'active' : ''}`}>
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(faq.id)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              {openId === faq.id && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
