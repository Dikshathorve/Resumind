# Quick Testing Steps

## Prerequisites
- Make sure both backend and frontend are running
- User should be logged in

## Backend Start
```bash
cd backend
npm run dev
```

## Frontend Start (in another terminal)
```bash
cd frontend
npm run dev
```

## Test Steps

### 1. Check Backend is Running
- Terminal should show: "Resumind Backend Server Started"
- Port should be: 5000

### 2. Check Frontend is Running
- Terminal should show: "VITE ready"
- Port should be: 5173
- URL: http://localhost:5173

### 3. Console Logs to Check

#### When creating resume, you should see in browser console:
```
[App] Component mounted
[App] Current page: landing
[App] Is authenticated: true

[Resume Creation] Starting resume creation...
[Resume Creation] API Base URL: http://localhost:5000
[Resume Creation] Sending POST request to http://localhost:5000/api/resumes...
[Resume Creation] Response status: 201
[Resume Creation] Success! Resume created with ID: 65abc...
```

#### In backend terminal, you should see:
```
[Server] POST /api/resumes
[Auth Middleware] User authenticated: 65abc...
[Resume API] POST /api/resumes - Creating new resume
[Resume API] Resume created successfully with ID: 65abc...
```

### 4. When Saving Resume

#### Browser console should show:
```
[Save Resume] Starting save operation...
[Save Resume] Resume ID: 65abc...
[Save Resume] Sending PUT request to: http://localhost:5000/api/resumes/65abc...
[Save Resume] Response status: 200
[Save Resume] Success! Resume saved:
```

#### Backend should show:
```
[Server] PUT /api/resumes/65abc...
[Auth Middleware] User authenticated: 65abc...
[Resume API] PUT /api/resumes/:id - Updating resume
[Resume API] Resume updated successfully with ID: 65abc...
```

## If Something Goes Wrong

### 404 Error
```
[Resume Creation] Error response: 404
```
**Check**: Is backend running on port 5000?

### 401 Error (Unauthorized)
```
[Resume Creation] Error response: Not authenticated
```
**Check**: Is user logged in? Check session in middleware logs

### Connection Failed
```
[Resume Creation] Error: Failed to fetch
```
**Check**: 
- Is backend running?
- Is CORS enabled?
- Check Network tab in DevTools

### No Logs Appearing
**Check**: 
- Is proxy configured in vite.config.js?
- Did you restart frontend after changing config?
- Open DevTools console (F12)

## Success Indicators

✅ Resume created and ID appears in logs
✅ Page redirects to builder
✅ Can fill form fields
✅ Click "Save Changes" shows success message
✅ No errors in browser console
✅ Backend logs show all operations
