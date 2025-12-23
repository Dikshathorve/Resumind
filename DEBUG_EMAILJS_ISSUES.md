# OTP Email Issues - Debugging Guide

## Current Status
You've provided:
- **Service ID**: `service.resumind.123`
- **Public Key**: `_flKog5jvYfD9RL4Z`

But the OTP email is not being sent. Here are the most likely causes:

## Root Cause #1: EmailJS Template Not Created (MOST LIKELY)
Your .env file shows:
```
EMAILJS_TEMPLATE_ID=template_otp_verification
```

**But this template may not exist in your EmailJS account!**

### What to do:
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Click **"Email Templates"** in left menu
3. Click **"Create New Template"**
4. Fill in:
   - **Template Name**: `OTP Verification` (or any name)
   - **Template ID**: `template_otp_verification` (IMPORTANT - must match .env!)
5. In the template body, add HTML with these variables:
   ```html
   <p>Hi {{to_name}},</p>
   <p>Your OTP is: {{otp_code}}</p>
   <p>Valid for 15 minutes.</p>
   ```
6. **Save Template**
7. **Publish Template**

## Root Cause #2: Email Service Not Connected
Your service ID is `service.resumind.123`, but you need to:

1. In EmailJS Dashboard, go to **Email Services**
2. Click **"Create New Service"**
3. Choose **Gmail** (or your email provider)
4. Authorize your email account
5. Set Service ID to: `service.resumind.123`
6. Click Connect/Save

## Root Cause #3: Missing User ID in .env
Check your `.env` file:
```
EMAILJS_USER_ID=your_emailjs_user_id
```

This should be your actual EmailJS User ID. To find it:
1. Go to EmailJS Dashboard
2. Click on your profile (top right)
3. Click "Account"
4. Copy your **User ID** (looks like a long hash)
5. Update .env with this value

## How to Verify Setup

### Step 1: Check EmailJS Dashboard
- [ ] Service exists: `service.resumind.123`
- [ ] Template exists: `template_otp_verification`
- [ ] Template is published (not draft)
- [ ] Email service is authorized

### Step 2: Check .env values
```env
EMAILJS_SERVICE_ID=service.resumind.123
EMAILJS_PUBLIC_KEY=_flKog5jvYfD9RL4Z
EMAILJS_TEMPLATE_ID=template_otp_verification
EMAILJS_USER_ID=[your actual user id from dashboard]
```

### Step 3: Restart Backend
```bash
npm start
```

### Step 4: Test by Signing Up
1. Go to frontend (http://localhost:5173)
2. Click Sign Up
3. Fill in form with a real email address
4. Click "Create Account"
5. Check your email inbox (and spam folder)

## Debugging Logs
The backend will show logs like:
```
Sending OTP via EmailJS: {
  email: 'your@email.com',
  fullName: 'Your Name',
  serviceId: 'service.resumind.123',
  templateId: 'template_otp_verification'
}

EmailJS Response: {
  status: 200,
  result: {...}
}
```

**If you don't see these logs**, the API call isn't being made at all.

## Common Error Messages

### "EmailJS credentials are not configured"
- One or more of: SERVICE_ID, PUBLIC_KEY, or TEMPLATE_ID is missing from .env

### "Invalid template ID"
- Template doesn't exist in EmailJS dashboard
- Make sure template ID matches exactly

### "Service ID not found"
- Email service hasn't been created in EmailJS
- Or service ID is wrong

### "401 Unauthorized"
- Public key is incorrect
- Or user ID is incorrect

## Fallback: Test Email Directly

If you want to test without EmailJS first, temporarily use this test code:

```javascript
// Add to test-otp.js
console.log('Testing EmailJS configuration...')
console.log('Service ID:', process.env.EMAILJS_SERVICE_ID)
console.log('Public Key:', process.env.EMAILJS_PUBLIC_KEY)
console.log('Template ID:', process.env.EMAILJS_TEMPLATE_ID)
console.log('User ID:', process.env.EMAILJS_USER_ID)
```

## Summary Checklist

- [ ] EmailJS account created
- [ ] Service `service.resumind.123` created
- [ ] Template `template_otp_verification` created and published
- [ ] Email service authorized (Gmail/Outlook)
- [ ] User ID found and added to .env
- [ ] Backend restarted after .env changes
- [ ] Tested signup form
- [ ] Checked email inbox (and spam)

Once all these are done, emails will start arriving!
