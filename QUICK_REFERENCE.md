# Quick Reference - Auth Implementation

## Files Modified/Created

| File | Changes | Type |
|------|---------|------|
| [frontend/src/context/AuthContext.jsx](frontend/src/context/AuthContext.jsx) | **NEW** - Auth state management | ✨ NEW |
| [frontend/src/main.jsx](frontend/src/main.jsx) | Added AuthProvider wrapper | 🔧 Modified |
| [frontend/src/App.jsx](frontend/src/App.jsx) | Added auth logic & redirects | 🔧 Modified |
| [frontend/src/components/HeroSection.jsx](frontend/src/components/HeroSection.jsx) | Auth-based button behavior | 🔧 Modified |
| [frontend/src/components/CTASection.jsx](frontend/src/components/CTASection.jsx) | Auth-based button behavior | 🔧 Modified |
| [frontend/src/pages/LandingPage.jsx](frontend/src/pages/LandingPage.jsx) | Pass onSignUp to components | 🔧 Modified |
| [frontend/src/pages/SignIn.jsx](frontend/src/pages/SignIn.jsx) | Integrated AuthContext | 🔧 Modified |
| [frontend/src/pages/SignUp.jsx](frontend/src/pages/SignUp.jsx) | Integrated AuthContext | 🔧 Modified |
| [frontend/src/pages/ProjectsPage.jsx](frontend/src/pages/ProjectsPage.jsx) | Integrated logout & useAuth | 🔧 Modified |

## How to Use AuthContext

### In a Component:
```jsx
import { useAuth } from '../context/AuthContext'

function MyComponent() {
  const { isAuthenticated, user, login, logout, setAuthRedirect } = useAuth()
  
  // Check if user is logged in
  if (isAuthenticated) {
    console.log('User:', user.fullName)
  }
  
  // Set redirect after auth (optional)
  const handleRestrictedAction = () => {
    if (!isAuthenticated) {
      setAuthRedirect('builder')
      // ... redirect to signup
    }
  }
  
  return (
    <>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={signup}>Sign Up</button>
      )}
    </>
  )
}
```

### In SignIn/SignUp (after successful auth):
```jsx
const { login } = useAuth()

// After successful API response:
login(responseData.user)  // Stores user in context & localStorage
```

## Key AuthContext Methods

### `login(userData)`
- **Purpose:** Set user as authenticated
- **Params:** `userData` - User object from backend
- **Side effects:** Saves to localStorage & AuthContext
- **Example:** `login({ id: 1, fullName: 'John', email: 'john@example.com' })`

### `logout()`
- **Purpose:** Clear authentication
- **Params:** None
- **Side effects:** Clears localStorage & AuthContext
- **Example:** `logout()`

### `setAuthRedirect(page)`
- **Purpose:** Set where to redirect after auth
- **Params:** `page` - Page name to redirect to
- **Example:** `setAuthRedirect('projects')`

### `getAndClearRedirect()`
- **Purpose:** Get & clear redirect target
- **Returns:** Page name or null
- **Side effects:** Clears redirect target after retrieval
- **Used in:** App.jsx useEffect

## Authentication Flow (Simple)

```
1. User clicks "Build my CV" (not logged in)
   └─► handleStartBuilder() checks isAuthenticated
       └─► If false: Show signup form
       └─► If true: Go to projects page

2. User fills signup form
   └─► API call to /api/auth/signup
       └─► Success: login(userData)
       └─► onSuccess() callback called
           └─► Redirect to projects page

3. User on projects page
   └─► Can now access builder
       └─► Can create/edit resumes

4. User clicks logout
   └─► logout() clears auth
   └─► Redirect to landing page
       └─► Back to square one
```

## Important Notes

⚠️ **localStorage depends on AuthContext for hydration**
- On app load, AuthContext checks localStorage
- If credentials exist, user stays logged in
- Always call AuthContext methods, not localStorage directly

⚠️ **SignIn/SignUp must call login()**
- Just storing in localStorage is not enough
- Must update AuthContext for redirects to work

⚠️ **Protected pages check isAuthenticated**
- No manual route guards needed
- Uses conditional rendering in App.jsx
- If not authenticated, shows auth form instead

⚠️ **Redirect happens automatically**
- After signup/signin, user auto-redirects
- No manual navigation needed (except in parent component)

## Common Patterns

### Pattern 1: Check if User Can Access Something
```jsx
const { isAuthenticated } = useAuth()

if (!isAuthenticated) {
  return <SignupPrompt />
}

return <RestrictedContent />
```

### Pattern 2: Logout from Any Component
```jsx
const { logout } = useAuth()

<button onClick={() => {
  logout()
  // Optional: redirect via App state
}}>
  Logout
</button>
```

### Pattern 3: Get User Data
```jsx
const { user } = useAuth()

return <span>Hello, {user?.fullName}</span>
```

### Pattern 4: Check and Redirect
```jsx
const { isAuthenticated, setAuthRedirect } = useAuth()

const handleProtectedAction = () => {
  if (!isAuthenticated) {
    setAuthRedirect('builder')
    // Show signup form
    return
  }
  // Do protected action
}
```

## Error Scenarios

### Scenario: User tries to access /builder directly (if it were a route)
- AuthContext checks `isAuthenticated`
- If false: Component renders signup form
- If true: Component renders builder

### Scenario: User logs out while on builder
- `logout()` clears context
- User would need to check `isAuthenticated` again
- Next page render would show signup instead

### Scenario: User opens multiple tabs
- localStorage shared across all tabs
- All tabs see same authentication state
- Good for consistency

## Debugging Tips

### Check auth state in console:
```javascript
// Get from localStorage
JSON.parse(localStorage.getItem('user'))
localStorage.getItem('isAuthenticated')

// Check React DevTools
// Components → App → Look for AuthContext provider
```

### Add debug logs:
```jsx
useEffect(() => {
  console.log('Auth state changed:', { isAuthenticated, user })
}, [isAuthenticated, user])
```

### Verify context wrapping:
```jsx
// In main.jsx, ensure AuthProvider wraps App
<AuthProvider>
  <App />
</AuthProvider>
```

## Future Enhancements

- [ ] Add refresh token mechanism
- [ ] Add session timeout
- [ ] Add role-based access control (RBAC)
- [ ] Add two-factor authentication
- [ ] Add password reset flow
- [ ] Add email verification
- [ ] Add OAuth/Social login
- [ ] Add activity logging

---

**Last Updated:** December 19, 2025  
**Status:** ✅ Complete and ready for testing
