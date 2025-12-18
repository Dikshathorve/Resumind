import './ATSAnalyzerResults.css'
import { CheckCircle, AlertCircle, TrendingUp, Zap } from 'lucide-react'

export default function ATSAnalyzerResults({ results, fileName, onNewAnalysis }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'excellent'
    if (score >= 60) return 'good'
    if (score >= 40) return 'fair'
    return 'poor'
  }

  const ScoreCircle = ({ score, label }) => (
    <div className={`ats-score-circle ${getScoreColor(score)}`}>
      <div className="ats-circle-content">
        <div className="ats-score-number">{score}</div>
        <div className="ats-score-label">{label}</div>
      </div>
    </div>
  )

  return (
    <div className="ats-results-page">
      {/* Main Score Section */}
      <div className="ats-results-hero">
        <div className="ats-results-hero-content">
          <h2>Analysis Results</h2>
          <p className="ats-results-file-name">Resume: {fileName}</p>
        </div>
        <div className="ats-main-score-container">
          <ScoreCircle score={results.atsScore} label="ATS Score" />
        </div>
      </div>

      {/* Results Container */}
      <div className="ats-results-container">
        {/* Quick Summary */}
        <div className="ats-results-section ats-quick-summary">
          <div className="ats-section-header">
            <h3>Quick Summary</h3>
          </div>
          <div className="ats-summary-grid">
            <div className="ats-summary-card ats-matched">
              <div className="ats-summary-icon">
                <CheckCircle size={24} />
              </div>
              <div className="ats-summary-content">
                <h4>Matched Keywords</h4>
                <p className="ats-count">{results.matchedKeywords.length}</p>
                <div className="ats-keywords-list">
                  {results.matchedKeywords.map((keyword, idx) => (
                    <span key={idx} className="ats-keyword ats-matched-keyword">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="ats-summary-card ats-missing">
              <div className="ats-summary-icon">
                <AlertCircle size={24} />
              </div>
              <div className="ats-summary-content">
                <h4>Missing Keywords</h4>
                <p className="ats-count">{results.missingKeywords.length}</p>
                <div className="ats-keywords-list">
                  {results.missingKeywords.map((keyword, idx) => (
                    <span key={idx} className="ats-keyword ats-missing-keyword">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Scores */}
        <div className="ats-results-section ats-section-scores">
          <div className="ats-section-header">
            <h3>Section Analysis</h3>
          </div>
          <div className="ats-sections-grid">
            {Object.entries(results.sections).map(([sectionName, sectionData]) => (
              <div key={sectionName} className="ats-section-card">
                <div className="ats-section-card-header">
                  <h4 className="ats-capitalize">{sectionName}</h4>
                  <div className={`ats-mini-score ${getScoreColor(sectionData.score)}`}>
                    {sectionData.score}
                  </div>
                </div>
                <div className="ats-score-bar">
                  <div
                    className={`ats-score-fill ${getScoreColor(sectionData.score)}`}
                    style={{ width: `${sectionData.score}%` }}
                  ></div>
                </div>
                {sectionData.issues.length > 0 ? (
                  <div className="ats-issues-list">
                    {sectionData.issues.map((issue, idx) => (
                      <div key={idx} className="ats-issue-item">
                        <AlertCircle size={14} />
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="ats-no-issues">
                    <CheckCircle size={14} />
                    <span>No issues found</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="ats-results-section ats-recommendations">
          <div className="ats-section-header">
            <h3>
              <Zap size={20} />
              Improvement Recommendations
            </h3>
          </div>
          <div className="ats-recommendations-list">
            {results.recommendations.map((recommendation, idx) => (
              <div key={idx} className="ats-recommendation-item">
                <div className="ats-recommendation-number">{idx + 1}</div>
                <div className="ats-recommendation-content">
                  <p>{recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="ats-results-actions">
          <button className="ats-action-btn ats-secondary" onClick={onNewAnalysis}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2-8.947m2 8.947h1"></path>
            </svg>
            Analyze Another Resume
          </button>
          <button className="ats-action-btn ats-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Report
          </button>
        </div>
      </div>
    </div>
  )
}
