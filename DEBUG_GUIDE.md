# Debugging Guide: Connection Failure & Save Changes

## Issue Summary
After adding the Save Changes functionality, users encountered a "Connection Failure [1006-0-1]" error.

## Root Causes Identified

### 1. **Missing Vite Proxy Configuration**
- Frontend running on port 5173 wasn't proxying API calls to backend on port 5000
- API calls were trying to hit `/api/resumes` on localhost:5173 instead of localhost:5000
- Solution: Added proxy configuration to `vite.config.js`

### 2. **Missing Session/Authentication**
- Resume creation requires authentication (`req.session.userId`)
- If user isn't authenticated, the API returns 401 Unauthorized
- Solution: Added comprehensive logging to track session state

### 3. **Missing Credentials in Fetch Requests**
- Frontend fetch calls weren't sending `credentials: 'include'`
- This prevented cookies/sessions from being sent with API requests
- Solution: Added `credentials: 'include'` to all fetch calls

## Changes Made

### Frontend Changes

#### 1. **vite.config.js** - Added Proxy Configuration
```javascript
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false,
      ws: true,
      rewrite: (path) => {
        console.log('[Vite Proxy] Proxying request:', path)
        return path
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log('[Vite Proxy] Response received from backend:', proxyRes.statusCode)
      }
    }
  }
}
```

#### 2. **.env.development** - Added Environment Variables
```
VITE_API_URL=http://localhost:5000
VITE_ENV=development
```

#### 3. **App.jsx** - Added Comprehensive Logging
- Logs component mount and state changes
- Logs all resume creation attempts with detailed error handling
- Uses API base URL from environment or defaults to localhost:5000
- Includes `credentials: 'include'` in fetch requests

#### 4. **BuildResume.jsx** - Added Save Function Logging
- Logs resume ID validation
- Logs all API requests with payload details
- Logs response status and data
- Includes `credentials: 'include'` in fetch requests

### Backend Changes

#### 1. **resumeController.js** - Added Request Logging
- Logs user ID from session
- Logs request payloads
- Logs successful resume creation/updates
- Validates session exists before processing

#### 2. **middleware.js** - Enhanced Auth Middleware
- Logs authentication checks
- Shows session details
- Shows cookie information
- Clear error messages on auth failure

#### 3. **server.js** - Added Request Logging Middleware
- Logs all incoming requests with timestamp
- Shows session ID and session data
- Helps track request flow through the system

## How to Debug

### 1. **Check Frontend Logs**
Open browser console (F12) and look for logs starting with:
- `[App]` - Application state changes
- `[Resume Creation]` - Resume creation process
- `[Save Resume]` - Save operation
- `[Vite Proxy]` - Proxy activity

### 2. **Check Backend Logs**
In the terminal running `npm run dev` in the backend folder, look for:
- `[Server]` - All incoming requests
- `[Auth Middleware]` - Authentication checks
- `[Resume API]` - Resume operations

### 3. **Common Issues & Solutions**

#### Error: "Resume ID not found"
```
[Resume Creation] Resume ID is null or undefined
```
**Cause**: Backend didn't return resume ID
**Solution**: Check backend logs for resume creation failure

#### Error: "Failed to create resume: 401"
```
[Resume Creation] Error response: Not authenticated. Please login first.
```
**Cause**: Session/authentication not working
**Solution**: 
- Ensure user is logged in
- Check if session is being persisted correctly
- Verify credentials: 'include' is in fetch calls

#### Error: "404 Not Found"
```
[Vite Proxy] Proxying request: /api/resumes
```
**Cause**: Proxy not working or backend not running
**Solution**:
- Verify backend is running on port 5000
- Check Vite proxy logs in frontend console
- Restart dev servers

#### Error: "Connection Failure [1006-0-1]"
**Cause**: WebSocket or general connection issue
**Solution**: 
- Check if both servers are running
- Check network tab in browser DevTools
- Verify CORS is properly configured
- Check if session middleware is working

## Testing the Fix

### Step 1: Start Backend
```bash
cd backend
npm run dev
```
Expected output: "Resumind Backend Server Started"

### Step 2: Start Frontend
```bash
cd frontend
npm run dev
```
Expected output: "VITE ready in XXX ms"

### Step 3: Test Resume Creation
1. Navigate to http://localhost:5173
2. Login if needed
3. Click "Create Resume"
4. Check browser console for logs:
   - `[Resume Creation] Starting resume creation...`
   - `[Resume Creation] Success! Resume created with ID: ...`

### Step 4: Check Backend Logs
Look for:
- `[Server] POST /api/resumes`
- `[Resume API] POST /api/resumes - Creating new resume`
- `[Resume API] Resume created successfully with ID: ...`

### Step 5: Test Save Functionality
1. Fill in some resume fields
2. Click "Save Changes"
3. Check browser console for logs:
   - `[Save Resume] Sending PUT request...`
   - `[Save Resume] Success! Resume saved:`
4. Should see success message appear

## Console Log Legend

### Frontend Logs
| Prefix | Meaning |
|--------|---------|
| `[App]` | App component lifecycle and state |
| `[Resume Creation]` | Resume creation flow |
| `[Save Resume]` | Save operation flow |
| `[Vite Proxy]` | Proxy request/response info |

### Backend Logs
| Prefix | Meaning |
|--------|---------|
| `[Server]` | Incoming HTTP requests |
| `[Auth Middleware]` | Authentication checks |
| `[Resume API]` | Resume CRUD operations |

## Environment Configuration

### Development (.env.development)
```
VITE_API_URL=http://localhost:5000
VITE_ENV=development
```

### Production (.env.production)
```
VITE_API_URL=https://api.yoursite.com
VITE_ENV=production
```

## Key Points to Remember

1. ✅ **Proxy is essential** - Frontend must proxy to backend in dev
2. ✅ **Credentials matter** - Include `credentials: 'include'` in fetch
3. ✅ **Session required** - User must be authenticated
4. ✅ **Logging helps** - Console logs show exactly what's happening
5. ✅ **Check both servers** - Both frontend and backend must be running

## Troubleshooting Checklist

- [ ] Backend running on port 5000?
- [ ] Frontend running on port 5173?
- [ ] User logged in?
- [ ] Browser console shows success logs?
- [ ] Backend console shows resume creation logs?
- [ ] Vite proxy configured correctly?
- [ ] CORS configured correctly?
- [ ] Session middleware working?
- [ ] No network errors in DevTools?
- [ ] Cookies being sent with requests?
