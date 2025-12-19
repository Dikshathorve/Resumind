import { useState, useEffect } from 'react'
import './App.css'
import { useAuth } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import BuildResume from './pages/BuildResume'
import ProjectsPage from './pages/ProjectsPage'
import BuildATSAnalyzer from './pages/BuildATSAnalyzer'
import ATSAnalyzer from './pages/ATSAnalyzer'
import JobMatcher from './pages/JobMatcher'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  const [currentPage, setCurrentPage] = useState('landing') // landing, landing-signin, landing-signup, projects, builder, build-ats, ats-analyzer, job-matcher
  const [resumeData, setResumeData] = useState(null)
  const { isAuthenticated, getAndClearRedirect } = useAuth()

  // Handle redirect after authentication
  useEffect(() => {
    const redirectPage = getAndClearRedirect()
    if (redirectPage && isAuthenticated) {
      setCurrentPage(redirectPage)
    }
  }, [isAuthenticated, getAndClearRedirect])

  useEffect(() => {
    if (currentPage === 'landing-signin' || currentPage === 'landing-signup' || currentPage === 'signin' || currentPage === 'signup') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [currentPage])

  const handleStartBuilder = () => {
    if (isAuthenticated) {
      setCurrentPage('projects')
    } else {
      // Set redirect to projects page after auth
      setCurrentPage('landing-signup')
    }
  }

  return (
    <>
      <div className="app">
        {(currentPage === 'landing' || currentPage === 'landing-signin' || currentPage === 'landing-signup') && (
          <LandingPage 
            onStart={handleStartBuilder}
            onSignIn={() => setCurrentPage('landing-signin')}
            onSignUp={() => setCurrentPage('landing-signup')}
          />
        )}
        {currentPage === 'projects' && (
          <ProjectsPage 
            onStart={() => setCurrentPage('builder')} 
            onClose={() => setCurrentPage('landing')}
          />
        )}
        {currentPage === 'builder' && (
          <BuildResume 
            onClose={() => setCurrentPage('projects')}
            onATSAnalyzer={(data) => {
              setResumeData(data)
              setCurrentPage('build-ats')
            }}
            onJobMatcher={(data) => {
              setResumeData(data)
              setCurrentPage('job-matcher')
            }}
          />
        )}
        {currentPage === 'job-matcher' && (
          <JobMatcher 
            onClose={() => setCurrentPage('builder')} 
            resumeData={resumeData}
          />
        )}
        {currentPage === 'build-ats' && (
          <BuildATSAnalyzer 
            onClose={() => setCurrentPage('builder')}
            onAnalyze={() => setCurrentPage('ats-analyzer')}
          />
        )}
        {currentPage === 'ats-analyzer' && (
          <ATSAnalyzer onClose={() => setCurrentPage('projects')} resumeData={resumeData} />
        )}
      </div>

      {(currentPage === 'landing-signin' || currentPage === 'signin') && (
        <SignIn 
          onClose={() => setCurrentPage(isAuthenticated ? 'projects' : 'landing')}
          onSuccess={() => {
            setCurrentPage('projects')
          }}
          onShowSignUp={() => setCurrentPage(currentPage === 'landing-signin' ? 'landing-signup' : 'signup')}
        />
      )}
      {(currentPage === 'landing-signup' || currentPage === 'signup') && (
        <SignUp 
          onClose={() => setCurrentPage(isAuthenticated ? 'projects' : 'landing')}
          onSuccess={() => {
            setCurrentPage('projects')
          }}
          onShowSignIn={() => setCurrentPage(currentPage === 'landing-signup' ? 'landing-signin' : 'signin')}
        />
      )}
    </>
  )
}

export default App
