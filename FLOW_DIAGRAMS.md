# User Authentication Flow Diagram

## Landing Page Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    LANDING PAGE                             │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         "Build my CV" Button (HeroSection)           │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│              ┌──────────┴──────────┐                        │
│              ▼                     ▼                        │
│       ┌────────────┐        ┌────────────┐                │
│       │ Is Auth?   │        │ Is Auth?   │                │
│       │ YES        │        │ NO         │                │
│       └────────────┘        └────────────┘                │
│              │                     │                        │
│              ▼                     ▼                        │
│        Go to Projects         Show Signup Form             │
│        (Builder Access)        (Redirect Flow)             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    SIGNUP/SIGNIN FORMS                      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              User Fills Form                         │  │
│  │         (Email, Password, etc.)                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │      Submit to Backend API                           │  │
│  │  (POST /api/auth/signup or /api/auth/signin)         │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│              ┌──────────┴──────────┐                        │
│              ▼                     ▼                        │
│        ┌────────────┐        ┌────────────┐              │
│        │  Success   │        │  Error     │              │
│        └────────────┘        └────────────┘              │
│              │                     │                        │
│              ▼                     ▼                        │
│        ┌──────────────────┐  Show Error Message           │
│        │ call login()     │                                │
│        │ in AuthContext   │                                │
│        └──────────────────┘                                │
│              │                                              │
│              ▼                                              │
│        ┌──────────────────┐                               │
│        │ Save user to     │                               │
│        │ localStorage     │                               │
│        │ & context state  │                               │
│        └──────────────────┘                               │
│              │                                              │
│              ▼                                              │
│        ┌──────────────────┐                               │
│        │ onSuccess()      │                               │
│        │ callback called  │                               │
│        └──────────────────┘                               │
│              │                                              │
│              ▼                                              │
│        Auto-redirect to                                    │
│        Projects Page                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Protected Route Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  USER TRIES TO ACCESS BUILDER               │
│                     (Build Resume Page)                     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │    Check isAuthenticated from AuthContext            │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│              ┌──────────┴──────────┐                        │
│              ▼                     ▼                        │
│         ┌────────────┐        ┌──────────────┐            │
│         │  YES       │        │  NO          │            │
│         │ Auth=true  │        │ Auth=false   │            │
│         └────────────┘        └──────────────┘            │
│              │                     │                        │
│              ▼                     ▼                        │
│      ✅ Allow Access         ❌ Redirect to               │
│      to BuildResume Page     Signup Form                   │
│                                                             │
│      Users can now:        Users must:                     │
│      • Create resumes      • Fill signup form              │
│      • Edit resumes        • Verify account                │
│      • Use ATS Analyzer    • Then get access               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## State Persistence Flow

```
┌─────────────────────────────────────────────────────────────┐
│              APP INITIALIZATION / PAGE REFRESH              │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  AuthContext useEffect (on mount):                   │  │
│  │  1. Check localStorage.getItem('isAuthenticated')    │  │
│  │  2. Check localStorage.getItem('user')               │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│              ┌──────────┴──────────┐                        │
│              ▼                     ▼                        │
│        ┌────────────┐        ┌──────────────┐            │
│        │  Found     │        │  Not Found   │            │
│        │ credentials│        │              │            │
│        └────────────┘        └──────────────┘            │
│              │                     │                        │
│              ▼                     ▼                        │
│      setIsAuthenticated(true)   setIsAuthenticated(false)  │
│      setUser(userData)          setUser(null)              │
│      ✅ User stays logged in   ❌ User logged out         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Component Dependencies

```
AuthProvider (main.jsx)
    │
    └──► AuthContext
         (provides: isAuthenticated, user, login, logout)
         
              │
              ├──► App.jsx
              │    ├──► LandingPage
              │    │    ├──► HeroSection (uses useAuth)
              │    │    └──► CTASection (uses useAuth)
              │    │
              │    ├──► ProjectsPage (uses useAuth)
              │    │
              │    └──► BuildResume (protected)
              │
              ├──► SignIn (uses useAuth)
              │
              └──► SignUp (uses useAuth)
```

## Authentication State Storage

```
┌─────────────────────────────────────────────────────────────┐
│                   DATA STORAGE LOCATIONS                    │
│                                                              │
│  localStorage:                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  isAuthenticated: "true" / not set                   │  │
│  │  user: {"fullName":"...", "email":"...", ...}        │  │
│  └──────────────────────────────────────────────────────┘  │
│           │ Persists across page reloads                    │
│           │ Survives browser restart                        │
│                                                              │
│  AuthContext (Memory):                                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  isAuthenticated: boolean                            │  │
│  │  user: object or null                                │  │
│  │  redirectAfterAuth: page name or null                │  │
│  └──────────────────────────────────────────────────────┘  │
│           │ Lost on page refresh                            │
│           │ But restored from localStorage on mount         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Logout Flow

```
┌─────────────────────────────────────────────────────────────┐
│              USER CLICKS LOGOUT IN PROJECTS                 │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │     handleLogout() in ProjectsPage                   │  │
│  │                                                      │  │
│  │  1. Call logout() from useAuth()                     │  │
│  │  2. Clear localStorage                              │  │
│  │  3. Clear AuthContext state                          │  │
│  │  4. Call onClose() to go to landing page            │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│        ┌──────────────────────────────┐                    │
│        │ AuthContext State Updated:   │                    │
│        │  isAuthenticated = false     │                    │
│        │  user = null                 │                    │
│        │  redirectAfterAuth = null    │                    │
│        └──────────────────────────────┘                    │
│                         │                                    │
│                         ▼                                    │
│        ┌──────────────────────────────┐                    │
│        │ localStorage Cleared:        │                    │
│        │  isAuthenticated removed     │                    │
│        │  user removed                │                    │
│        └──────────────────────────────┘                    │
│                         │                                    │
│                         ▼                                    │
│        Redirect to Landing Page                            │
│        "Build my CV" button shows                           │
│        Signup form instead of builder                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
