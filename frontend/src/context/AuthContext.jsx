import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [redirectAfterAuth, setRedirectAfterAuth] = useState(null)

  // Check if user is already logged in on app load
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated')
    const storedUser = localStorage.getItem('user')

    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('isAuthenticated', 'true')
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
    setRedirectAfterAuth(null)
  }

  const setAuthRedirect = (page) => {
    setRedirectAfterAuth(page)
  }

  const getAndClearRedirect = () => {
    const redirect = redirectAfterAuth
    setRedirectAfterAuth(null)
    return redirect
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout,
      setAuthRedirect,
      getAndClearRedirect,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
