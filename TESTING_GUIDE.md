# Testing Guide - Authentication & Protected Routes

## Pre-requisites
- Backend server running on `http://localhost:5000`
- Frontend dev server running
- Database with test credentials ready

## Test Scenarios

### Test 1: Unauthenticated User Accessing Builder
**Expected Behavior:** Non-logged-in user should NOT be able to access the builder

**Steps:**
1. Clear localStorage (F12 → Application → localStorage → clear all)
2. Go to landing page
3. Click "Build my CV" button
4. **Expected Result:** Signup form appears instead of builder page

**Pass/Fail:** ___________

---

### Test 2: Signup & Redirect Flow
**Expected Behavior:** After signup, user should auto-redirect to Projects page

**Steps:**
1. In signup form:
   - Full Name: Test User
   - Email: test@example.com
   - Password: password123
   - Confirm: password123
2. Click "Create Account"
3. **Expected Result:** 
   - Success message appears
   - Auto-redirects to Projects page (after 1 second)
   - User name "Test User" displays in header

**Pass/Fail:** ___________

---

### Test 3: Login & Redirect Flow
**Expected Behavior:** After login, user should auto-redirect to Projects page

**Steps:**
1. Go to landing page
2. Click "Sign In" button
3. In signin form:
   - Email: test@example.com
   - Password: password123
4. Click "Login"
5. **Expected Result:** 
   - Success message appears
   - Auto-redirects to Projects page (after 1 second)

**Pass/Fail:** ___________

---

### Test 4: Persistence After Page Refresh
**Expected Behavior:** User should remain logged in after page refresh

**Steps:**
1. Login successfully
2. You're on Projects page
3. Press F5 (refresh page)
4. **Expected Result:** 
   - Still on Projects page
   - Still logged in (not back to landing page)
   - User data preserved

**Pass/Fail:** ___________

---

### Test 5: Logout Functionality
**Expected Behavior:** After logout, user should go back to landing page and be unauthenticated

**Steps:**
1. While on Projects page, click logout button (in header)
2. **Expected Result:** 
   - Redirected to landing page
   - User authentication cleared
   - "Build my CV" button shows signup form when clicked

**Pass/Fail:** ___________

---

### Test 6: Logout & Page Refresh
**Expected Behavior:** After logout, user should stay logged out even after refresh

**Steps:**
1. Logout from Projects page
2. You're on landing page
3. Press F5 (refresh page)
4. **Expected Result:** 
   - Still on landing page
   - Not logged in
   - Clicking "Build my CV" shows signup form

**Pass/Fail:** ___________

---

### Test 7: Direct Access to Builder (Authenticated)
**Expected Behavior:** Logged-in user should be able to create resumes

**Steps:**
1. Login successfully (landed on Projects page)
2. Click "Create Resume"
3. **Expected Result:** 
   - BuildResume component loads
   - Can access resume builder

**Pass/Fail:** ___________

---

### Test 8: CTA Section Button
**Expected Behavior:** Same behavior as "Build my CV" button

**Steps:**
1. On landing page (logged out)
2. Scroll down to CTA section
3. Click "Start Building Free" button
4. **Expected Result:** Signup form appears

**Pass/Fail:** ___________

---

### Test 9: Authentication State in Console
**Expected Behavior:** AuthContext should maintain proper state

**Steps:**
1. Open F12 → Console
2. Login to the app
3. In console, check localStorage:
   ```javascript
   localStorage.getItem('isAuthenticated')  // should be "true"
   localStorage.getItem('user')             // should have user object
   ```
4. **Expected Result:** Both values present and correct

**Pass/Fail:** ___________

---

### Test 10: Header with User
**Expected Behavior:** User name should display correctly

**Steps:**
1. Login with different users
2. Go to Projects page
3. **Expected Result:** Header shows actual user's full name

**Test Users:**
- Name shown should match: ___________

**Pass/Fail:** ___________

---

## Edge Cases to Test

### Edge Case 1: Invalid Credentials
**Steps:**
1. Go to login
2. Enter: email: wrong@example.com, password: wrong123
3. Click Login
4. **Expected Result:** Error message appears, stays on login form

**Pass/Fail:** ___________

---

### Edge Case 2: Missing Form Fields
**Steps:**
1. Go to signup
2. Leave fields empty
3. Click "Create Account"
4. **Expected Result:** Validation error appears (form validation)

**Pass/Fail:** ___________

---

### Edge Case 3: Password Mismatch
**Steps:**
1. Go to signup
2. Password: password123
3. Confirm: different456
4. Click "Create Account"
5. **Expected Result:** Error: "Passwords do not match"

**Pass/Fail:** ___________

---

### Edge Case 4: Multiple Tabs
**Steps:**
1. Login in Tab 1
2. Open another tab (same site) - Tab 2
3. **Expected Result:** Tab 2 also shows user as logged in

**Pass/Fail:** ___________

---

### Edge Case 5: Close Signup Modal
**Steps:**
1. Click "Build my CV" (not logged in)
2. Signup form opens
3. Click X button to close
4. **Expected Result:** 
   - Modal closes
   - Back on landing page
   - Not logged in

**Pass/Fail:** ___________

---

## Browser DevTools Checks

### Check localStorage after login:
```
F12 → Application → Local Storage → http://localhost:3000/

Expected keys:
- isAuthenticated: "true"
- user: {fullName: "...", email: "...", id: "..."}
```

### Check Network tab:
```
POST /api/auth/signup or /api/auth/signin
Response should include:
- user: {...}
- message: "success"
```

### Check React DevTools:
```
Provider(AuthProvider)
  └─ App
     └─ useAuth() should show:
        - isAuthenticated: true/false
        - user: {...} or null
```

---

## Summary Table

| Test Case | Status | Notes |
|-----------|--------|-------|
| 1. No access to builder when logged out | | |
| 2. Signup & redirect | | |
| 3. Login & redirect | | |
| 4. Persist on refresh | | |
| 5. Logout functionality | | |
| 6. Logout persistence | | |
| 7. Builder access when logged in | | |
| 8. CTA button behavior | | |
| 9. localStorage state | | |
| 10. User name display | | |
| Edge Case 1: Invalid creds | | |
| Edge Case 2: Missing fields | | |
| Edge Case 3: Password mismatch | | |
| Edge Case 4: Multiple tabs | | |
| Edge Case 5: Close modal | | |

---

## Troubleshooting

### Issue: User not redirecting after signup
**Solution:**
- Check if `onSuccess()` is being called in SignUp.jsx
- Verify `getAndClearRedirect()` is working in App.jsx useEffect

### Issue: localStorage not persisting
**Solution:**
- Ensure SignIn/SignUp call `login()` from useAuth
- Check that localStorage is not being cleared on page refresh

### Issue: User name showing as "User"
**Solution:**
- Check backend response includes `fullName` field
- Verify SignUp/SignIn are storing full user object

### Issue: Cannot access builder even when logged in
**Solution:**
- Clear localStorage and re-login
- Check browser console for errors
- Verify AuthContext is wrapped around App in main.jsx

---

## Success Criteria

✅ All test cases pass  
✅ No console errors  
✅ localStorage correctly stores/clears data  
✅ User can signup → builder  
✅ User can login → builder  
✅ User can logout → landing page  
✅ Auth persists across page refreshes  
✅ Non-auth users cannot access builder  
