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
  const [currentResumeId, setCurrentResumeId] = useState(null)
  const [isCreatingResume, setIsCreatingResume] = useState(false)
  const { isAuthenticated, getAndClearRedirect } = useAuth()

  // Debug logging
  useEffect(() => {
    console.log('[App] Component mounted')
    console.log('[App] Current page:', currentPage)
    console.log('[App] Is authenticated:', isAuthenticated)
    console.log('[App] Current resume ID:', currentResumeId)
  }, [currentPage, isAuthenticated, currentResumeId])

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

  const handleCreateNewResume = async (resumeTitle = 'My Resume') => {
    setIsCreatingResume(true)
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    console.log('[Resume Creation] Starting resume creation...')
    console.log('[Resume Creation] Resume Title:', resumeTitle)
    console.log('[Resume Creation] API Base URL:', apiBaseUrl)
    
    try {
      const resumePayload = {
        name: resumeTitle,
        templateType: 'template1',
        resumeData: {
          personal: {
            fullName: '',
            jobTitle: '',
            email: '',
            phone: '',
            location: '',
            linkedin: '',
            website: ''
          },
          summary: '',
          experiences: [],
          education: [],
          projects: [],
          skills: [],
          certifications: []
        }
      }
      
      console.log('[Resume Creation] Payload:', resumePayload)
      console.log('[Resume Creation] Sending POST request to /api/resumes...')
      
      const response = await fetch(`${apiBaseUrl}/api/resumes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(resumePayload)
      })

      console.log('[Resume Creation] Response status:', response.status)
      console.log('[Resume Creation] Response ok:', response.ok)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('[Resume Creation] Error response:', errorText)
        throw new Error(`Failed to create resume: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('[Resume Creation] Success! Resume created with ID:', data.resume._id)
      console.log('[Resume Creation] Full response:', data)
      
      setCurrentResumeId(data.resume._id)
      setCurrentPage('builder')
    } catch (error) {
      console.error('[Resume Creation] Error caught:', error)
      console.error('[Resume Creation] Error message:', error.message)
      console.error('[Resume Creation] Error stack:', error.stack)
      alert(`Failed to create resume: ${error.message}`)
    } finally {
      setIsCreatingResume(false)
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
            onStart={handleCreateNewResume}
            onClose={() => setCurrentPage('landing')}
          />
        )}
        {currentPage === 'builder' && (
          <BuildResume 
            resumeId={currentResumeId}
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
