# EmailJS Integration Complete ✅

## Updated Configuration

Your Resumind application is now configured to use **EmailJS** for sending OTP emails.

### Your EmailJS Credentials (Already Set)
- **Service ID**: `service.resumind.123`
- **Public Key**: `_flKog5jvYfD9RL4Z`

### Updated Files

1. **Backend Configuration**
   - `.env` - Added EmailJS credentials
   - `src/config/config.js` - Added EmailJS config variables
   - `src/utils/emailService.js` - Updated to use EmailJS REST API

2. **Frontend (Already Updated)**
   - `src/pages/SignUp.jsx` - OTP flow integrated
   - `src/components/OTPVerification.jsx` - OTP verification modal
   - `src/components/OTPVerification.css` - Styling

## What You Need to Do

### Step 1: Create EmailJS Template
Go to your [EmailJS Dashboard](https://dashboard.emailjs.com/):

1. Click **Email Templates** → **Create New Template**
2. Template Name: `OTP Verification`
3. Template ID: `template_otp_verification` (important - must match!)
4. Copy the HTML template from `EMAILJS_SETUP_GUIDE.md`
5. Save the template

### Step 2: Connect Email Service
In the same template:
1. Click **Create New Service** or select existing one
2. Choose **Gmail** (or your preferred service)
3. Authorize your email account
4. Service ID must be: `service.resumind.123`

### Step 3: Get Your User ID
1. Go to EmailJS Account settings
2. Copy your **User ID**
3. Update in `.env`: `EMAILJS_USER_ID=your_user_id`

### Step 4: Restart Backend
```bash
cd backend
npm start
```

## How It Works

**Signup Flow:**
1. User fills signup form (Name, Email, Password)
2. Clicks "Create Account"
3. Backend sends OTP via EmailJS
4. User receives email with 6-digit OTP
5. User enters OTP in verification modal
6. OTP verified → Account created → Auto login

## Environment Variables Set

```env
EMAILJS_SERVICE_ID=service.resumind.123
EMAILJS_PUBLIC_KEY=_flKog5jvYfD9RL4Z
EMAILJS_TEMPLATE_ID=template_otp_verification
EMAILJS_USER_ID=[you need to add this]
```

## Template Variables Used

Your EmailJS template should use these variables:
- `{{to_name}}` - User's full name
- `{{to_email}}` - User's email address  
- `{{otp_code}}` - 6-digit OTP code
- `{{otp_message}}` - "Your OTP is valid for 15 minutes only"

## Testing

1. Frontend dev server should be running: `http://localhost:5173`
2. Backend should be running: `http://localhost:5000`
3. Click "Sign Up" and fill the form
4. Check your email for OTP
5. Enter OTP and verify

## Troubleshooting

### OTP not received?
- Verify EmailJS template is created and published
- Check template ID matches: `template_otp_verification`
- Verify service is authorized with correct email
- Check spam folder
- Look for errors in browser console and backend logs

### Template showing raw variables?
- Variables must use double curly braces: `{{variable}}`
- Variable names must match exactly

### API errors?
- Service ID: `service.resumind.123`
- Public Key: `_flKog5jvYfD9RL4Z`
- Template ID: `template_otp_verification`

## Next Steps

1. ✅ EmailJS API integrated (done)
2. ⏳ Create EmailJS template
3. ⏳ Add EmailJS User ID to .env
4. ⏳ Restart backend
5. ⏳ Test signup flow

Your system is ready once you complete the EmailJS template setup!
