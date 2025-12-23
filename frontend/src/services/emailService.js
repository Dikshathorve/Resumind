import emailjs from '@emailjs/browser'

// Initialize EmailJS with your public key
// Make sure to set VITE_EMAILJS_PUBLIC_KEY in your .env.local file
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

// Initialize EmailJS if public key is available
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY)
}

/**
 * Send OTP via EmailJS from the browser
 * @param {string} email - User's email address
 * @param {string} fullName - User's full name
 * @param {string} otp - 6-digit OTP to send
 * @returns {Promise} Promise that resolves when email is sent
 */
export const sendOTPEmail = async (email, fullName, otp) => {
  try {
    // Check if EmailJS is configured
    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      console.error('EmailJS configuration missing:', {
        publicKey: !!EMAILJS_PUBLIC_KEY,
        serviceId: !!EMAILJS_SERVICE_ID,
        templateId: !!EMAILJS_TEMPLATE_ID,
      })
      throw new Error('EmailJS configuration is not set. Please configure VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, and VITE_EMAILJS_TEMPLATE_ID in .env.local')
    }

    console.log('📧 Sending OTP via EmailJS from browser...')
    console.log('  Email:', email)
    console.log('  Name:', fullName)
    console.log('  OTP:', otp)
    console.log('  Service ID:', EMAILJS_SERVICE_ID)
    console.log('  Template ID:', EMAILJS_TEMPLATE_ID)
    console.log('  Public Key:', EMAILJS_PUBLIC_KEY.substring(0, 5) + '...')

    // Calculate expiry time (15 minutes from now)
    const expiryTime = new Date()
    expiryTime.setMinutes(expiryTime.getMinutes() + 15)
    const formattedTime = expiryTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })

    const templateParams = {
      to_email: email,
      to_name: fullName,
      passcode: otp,
      time: formattedTime,
    }

    console.log('  Template Parameters:', templateParams)

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )

    console.log('✅ OTP email sent successfully via EmailJS')
    return { success: true, message: 'OTP sent successfully', response }
  } catch (error) {
    console.error('❌ Error sending OTP email via EmailJS:', error)
    console.error('Error Status:', error.status)
    console.error('Error Text:', error.text)
    console.error('Full Error:', error)
    throw new Error(`Failed to send OTP email: ${error.status} - ${error.text || error.message}`)
  }
}

export default {
  sendOTPEmail,
}
