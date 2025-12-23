import { config } from '../config/config.js'

/**
 * Generate a random 6-digit OTP
 * @returns {string} 6-digit OTP
 */
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/**
 * Calculate OTP expiry time (15 minutes from now)
 * @returns {Date} Expiry datetime
 */
export const getOTPExpiry = () => {
  const now = new Date()
  now.setMinutes(now.getMinutes() + 15) // 15 minutes from now
  return now
}

/**
 * Check if OTP has expired
 * @param {Date} expiryTime - OTP expiry time
 * @returns {boolean} True if expired, false otherwise
 */
export const isOTPExpired = (expiryTime) => {
  return new Date() > expiryTime
}

/**
 * DEPRECATED: Email sending is now handled on the frontend with EmailJS
 * This function is kept for reference and backward compatibility
 * 
 * The frontend now handles EmailJS API calls because:
 * - EmailJS requires browser-based calls
 * - Server-side calls are disabled due to CORS/security policies
 * 
 * New flow:
 * 1. Backend generates OTP and returns it to frontend
 * 2. Frontend sends OTP via EmailJS from the browser
 * 3. Backend validates the OTP when user enters it
 */
export const sendOTPEmail = async (email, fullName, otp) => {
  console.warn('⚠️  sendOTPEmail called on backend - this should be handled on frontend!')
  throw new Error('Email sending should be done from the frontend using EmailJS SDK. See emailService.js for details.')
}

export default {
  generateOTP,
  getOTPExpiry,
  isOTPExpired,
  sendOTPEmail
}
