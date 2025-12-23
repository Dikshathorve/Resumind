# EmailJS Setup Guide for Resumind OTP

## Your EmailJS Credentials
- **Service ID**: service.resumind.123
- **Public Key**: _flKog5jvYfD9RL4Z

## Step 1: Create an EmailJS Template

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Click on **"Email Templates"** in the left sidebar
3. Click **"Create New Template"**
4. Fill in the template details:

### Template Configuration:

**Template Name**: OTP Verification (or any name you prefer)

**Template ID**: `template_otp_verification` (use this exact ID in your .env)

**Email Content**:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 2px solid #3B82F6;
    }
    .header h1 {
      color: #3B82F6;
      margin: 0;
    }
    .content {
      padding: 20px 0;
      text-align: center;
    }
    .otp-box {
      background-color: #3B82F6;
      color: white;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 2px;
      font-family: 'Courier New', monospace;
    }
    .info {
      background-color: #e3f2fd;
      border-left: 4px solid #3B82F6;
      padding: 15px;
      margin: 15px 0;
      border-radius: 4px;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Resumind</h1>
      <p>Email Verification</p>
    </div>
    
    <div class="content">
      <p>Hi {{to_name}},</p>
      <p>Thank you for signing up for Resumind! We're excited to have you on board.</p>
      
      <p>Please use the following One-Time Password (OTP) to verify your email address:</p>
      
      <div class="otp-box">{{otp_code}}</div>
      
      <div class="info">
        <p><strong>⏱️ Important:</strong> This OTP is valid for <strong>15 minutes only</strong>.</p>
        <p>Do not share this code with anyone. Resumind staff will never ask for your OTP.</p>
      </div>
      
      <p>If you didn't create this account, please ignore this email.</p>
    </div>
    
    <div class="footer">
      <p>&copy; 2025 Resumind. All rights reserved.</p>
      <p>This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
```

### Template Variables:
Make sure to use these exact variable names in your template:
- `{{to_name}}` - Recipient's full name
- `{{to_email}}` - Recipient's email (can be used in settings)
- `{{otp_code}}` - The 6-digit OTP code
- `{{otp_message}}` - Message about OTP validity

## Step 2: Update .env File

Update your `.env` file with your EmailJS credentials:

```env
EMAILJS_SERVICE_ID=service.resumind.123
EMAILJS_PUBLIC_KEY=_flKog5jvYfD9RL4Z
EMAILJS_TEMPLATE_ID=template_otp_verification
EMAILJS_USER_ID=your_emailjs_user_id
```

To find your **User ID**:
1. Go to EmailJS Dashboard
2. Click on your profile in the top right
3. Click **"Account"**
4. Copy your **User ID** (looks like a long hash)

## Step 3: Configure Email Service in Template

In your EmailJS template settings:

1. Click **"Create New Service"** or select existing service
2. Choose **Gmail** or your preferred email service
3. Authorize your email account
4. Save the service with ID: `service.resumind.123`

## Step 4: Test the Setup

Run the backend and test the OTP sending:

```bash
cd backend
npm start
```

When a user signs up, they should receive an email with the OTP.

## Troubleshooting

### Email not received?
- Verify all credentials in .env are correct
- Check spam/junk folder
- Verify template ID matches in .env
- Check EmailJS quota limit

### Template variables not showing?
- Use double curly braces: `{{variable_name}}`
- Ensure variable names match exactly in code and template

### API Error?
- Verify Service ID is correct: `service.resumind.123`
- Verify Public Key is correct: `_flKog5jvYfD9RL4Z`
- Check that template exists and is published

## Next Steps

After setup:
1. Restart the backend server
2. Test signup flow with a valid email
3. Verify OTP email arrives
4. Enter OTP to complete registration

Your OTP email verification system is now ready to use!
