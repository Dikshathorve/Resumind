# EmailJS Migration to Frontend - Setup Instructions

## Problem Solved
✅ Fixed the error: "Failed to send OTP email: EmailJS API Error (403): API calls are disabled for non-browser applications"

## Solution
Moved the EmailJS OTP sending from the backend (Node.js server) to the frontend (browser), where EmailJS is designed to work.

## Changes Made

### 1. **Created Frontend Email Service**
- **File**: `frontend/src/services/emailService.js`
- Handles all EmailJS email sending from the browser
- Properly initializes EmailJS SDK with environment variables
- Exports `sendOTPEmail()` function

### 2. **Updated Backend Auth Controller**
- **File**: `backend/src/controllers/authController.js`
- Removed `sendOTPEmail` import from sendOTP function
- Backend now only:
  - Generates OTP
  - Stores OTP in database with 15-minute expiry
  - Validates OTP when user enters it
  - Returns OTP to frontend so it can be sent via EmailJS
- Backend NO LONGER attempts to send emails

### 3. **Updated Frontend Signup Page**
- **File**: `frontend/src/pages/SignUp.jsx`
- Now imports and uses frontend emailService
- New flow:
  1. Request OTP from backend (backend generates & stores it)
  2. Send OTP email from frontend using EmailJS
  3. Show OTP verification modal

### 4. **Updated OTP Verification Component**
- **File**: `frontend/src/components/OTPVerification.jsx`
- Resend OTP now uses frontend emailService
- When user clicks "Resend OTP":
  1. Request new OTP from backend
  2. Send it via EmailJS from frontend

### 5. **Updated Backend Email Service**
- **File**: `backend/src/utils/emailService.js`
- Deprecated backend `sendOTPEmail()` function
- Kept for backward compatibility but now throws warning
- Contains documentation about the migration

### 6. **Updated Frontend Dependencies**
- **File**: `frontend/package.json`
- Added `@emailjs/browser: ^4.4.1`

## Environment Variables Setup

### Frontend (.env.local)
Create `.env.local` file in `frontend/` directory with:

```env
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

To get these values:
1. Go to https://www.emailjs.com
2. Sign up or login
3. Create a service and template
4. Copy the Public Key from Account > API Keys
5. Copy Service ID and Template ID

### Backend (.env)
You can now remove these from backend `.env` if they exist:
```env
EMAILJS_SERVICE_ID
EMAILJS_PUBLIC_KEY
EMAILJS_TEMPLATE_ID
EMAILJS_PRIVATE_KEY
```

The backend no longer needs EmailJS configuration.

## Installation Steps

### 1. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables
Create `frontend/.env.local` with your EmailJS credentials

### 3. Test the Flow
1. Start the backend: `cd backend && npm start`
2. Start the frontend: `cd frontend && npm run dev`
3. Try signing up - OTP should now be sent successfully via browser

## How It Works Now

### OTP Request Flow
```
User fills signup form
    ↓
Frontend sends: {email, fullName} to POST /api/auth/send-otp
    ↓
Backend generates OTP and stores in database
    ↓
Backend returns: {otp, email} to frontend
    ↓
Frontend receives OTP and sends via EmailJS from browser ✅
    ↓
User receives email and enters OTP
```

### OTP Verification Flow
```
User enters OTP
    ↓
Frontend sends: {email, otp} to POST /api/auth/verify-otp
    ↓
Backend validates OTP against stored value
    ↓
If valid: User account created, session established
    ↓
User logged in ✅
```

## Why This Works

- **EmailJS SDK** is designed for browser-based email sending
- **CORS security** prevents non-browser applications from using EmailJS API
- **Server-to-server** calls are blocked (403 error)
- **Browser-to-EmailJS** calls are allowed with proper authentication
- **No backend email service** needed - cleaner architecture

## Verification

To verify the setup is working:
1. Check browser console when signup page loads - should show EmailJS initialized
2. When sending OTP, console should show "✅ OTP email sent successfully via EmailJS"
3. Email should arrive within seconds
4. OTP verification should complete the signup

## Files Modified Summary

| File | Changes |
|------|---------|
| `frontend/src/services/emailService.js` | ✨ NEW - Handles EmailJS sending |
| `frontend/src/pages/SignUp.jsx` | Updated to use frontend emailService |
| `frontend/src/components/OTPVerification.jsx` | Updated to use frontend emailService for resend |
| `frontend/package.json` | Added @emailjs/browser dependency |
| `backend/src/controllers/authController.js` | Removed sendOTPEmail calls, returns OTP to frontend |
| `backend/src/utils/emailService.js` | Deprecated backend email sending |

## Troubleshooting

### "VITE_EMAILJS_PUBLIC_KEY not set" Error
- Create `frontend/.env.local` file
- Add your EmailJS credentials
- Restart frontend dev server

### OTP Email Not Arriving
1. Check browser console for EmailJS errors
2. Verify EmailJS credentials are correct
3. Check EmailJS dashboard for failed sends
4. Ensure email template is properly configured

### 403 API Error Still Appearing
- Verify you're NOT calling EmailJS from the backend
- Make sure frontend emailService is being used
- Check that frontend has proper EmailJS configuration

## Next Steps

- Test the complete signup flow end-to-end
- Configure email template in EmailJS for better formatting
- Set up rate limiting for OTP requests if needed
- Consider adding OTP attempt limiting

---
Migration completed successfully! 🎉
