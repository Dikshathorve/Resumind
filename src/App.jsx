import { useState, useEffect } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import BuildResume from './pages/BuildResume'
import ProjectsPage from './pages/ProjectsPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  const [currentPage, setCurrentPage] = useState('landing') // landing, landing-signin, landing-signup, projects, builder

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

  return (
    <>
      <div className="app">
        {(currentPage === 'landing' || currentPage === 'landing-signin' || currentPage === 'landing-signup') && (
          <LandingPage 
            onStart={() => setCurrentPage('projects')}
            onSignIn={() => setCurrentPage('landing-signin')}
            onSignUp={() => setCurrentPage('landing-signup')}
          />
        )}
        {currentPage === 'projects' && (
          <ProjectsPage onStart={() => setCurrentPage('builder')} onClose={() => setCurrentPage('landing')} />
        )}
        {currentPage === 'builder' && (
          <BuildResume onClose={() => setCurrentPage('projects')} />
        )}
      </div>

      {(currentPage === 'landing-signin' || currentPage === 'signin') && (
        <SignIn onClose={() => setCurrentPage('landing')} />
      )}
      {(currentPage === 'landing-signup' || currentPage === 'signup') && (
        <SignUp onClose={() => setCurrentPage('landing')} />
      )}
    </>
  )
}

export default App
