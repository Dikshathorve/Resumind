import { User } from '../models/User.js'
import { Projects } from '../models/Projects.js'
import { asyncHandler } from '../middleware/middleware.js'

/**
 * AUTHENTICATION SYSTEM DOCUMENTATION
 * 
 * Technology Stack:
 * - Password Hashing: bcryptjs (automatic hashing on User model pre-save)
 * - Session Management: express-session with MongoDB store
 * - Session Cookie: secure, httpOnly, sameSite (strict in development)
 * - CORS: Enabled with credentials for cookie sharing
 * 
 * Authentication Flow:
 * 1. SIGNUP:
 *    - User provides: fullName, email, password, confirmPassword
 *    - Backend: Validates inputs, checks if email exists
 *    - bcryptjs: Automatically hashes password in User model pre-save hook
 *    - Database: Saves user with hashed password
 *    - Session: Creates session with userId
 *    - Returns: User object with userId and projectsId
 * 
 * 2. SIGNIN:
 *    - User provides: email, password
 *    - Database: Finds user by email
 *    - bcryptjs: Compares provided password with hashed password
 *    - Session: Creates session with userId
 *    - Returns: User object with all data and projectsId
 * 
 * 3. SESSION VERIFICATION:
 *    - Frontend: Can call /api/auth/verify to check if user is logged in
 *    - Backend: Returns user data if session exists
 * 
 * 4. LOGOUT:
 *    - Backend: Destroys session and clears cookie
 *    - Frontend: Clears localStorage
 * 
 * Protected Routes:
 * - Use isAuthenticated middleware on routes that require login
 * - Example: router.get('/route', isAuthenticated, controller)
 * 
 * Session Storage:
 * - MongoDB: Sessions are stored in 'sessions' collection
 * - Auto cleanup: 24 hour touch interval (lazy session update)
 * - Cookie: Expires in 7 days (SESSION_MAX_AGE)
 */

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
export const signup = asyncHandler(async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body

  // Validation
  if (!fullName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields',
    })
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'Passwords do not match',
    })
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'Email already registered',
    })
  }

  // Create new user
  const user = await User.create({
    fullName,
    email,
    password,
  })

  // Initialize Projects document with empty projects array and count 0
  const projects = await Projects.create({
    projectsId: user.projectsId,
    userId: user._id,
    projectsCount: 0,
    projects: [],
  })

  // Set session
  req.session.userId = user._id
  req.session.email = user.email
  req.session.name = user.fullName

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    user: {
      id: user._id,
      userId: user.userId,
      fullName: user.fullName,
      email: user.email,
      projectsId: user.projectsId,
    },
  })
})

// @route   POST /api/auth/signin
// @desc    Login user
// @access  Public
export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password',
    })
  }

  // Find user and select password
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    })
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password)
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    })
  }

  // Update last login
  user.lastLogin = new Date()
  await user.save()

  // Set session
  req.session.userId = user._id
  req.session.email = user.email
  req.session.name = user.fullName

  res.status(200).json({
    success: true,
    message: 'Logged in successfully',
    user: {
      id: user._id,
      userId: user.userId,
      fullName: user.fullName,
      email: user.email,
      projectsId: user.projectsId,
      subscription: user.subscription,
    },
  })
})

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error logging out',
      })
    }

    res.clearCookie('resumind.sid')
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    })
  })
})

// @route   GET /api/auth/verify
// @desc    Verify user session
// @access  Private
export const verifySession = asyncHandler(async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({
      success: false,
      message: 'No active session',
    })
  }

  const user = await User.findById(req.session.userId)
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    })
  }

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      userId: user.userId,
      fullName: user.fullName,
      email: user.email,
      projectsId: user.projectsId,
      subscription: user.subscription,
      profileImage: user.profileImage,
      accentColor: user.preferences?.accentColor,
    },
  })
})

export default {
  signup,
  signin,
  logout,
  verifySession,
}
