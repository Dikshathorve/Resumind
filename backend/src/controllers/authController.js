import { User } from '../models/User.js'
import { asyncHandler } from '../middleware/middleware.js'

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

  // Set session
  req.session.userId = user._id
  req.session.email = user.email
  req.session.name = user.fullName

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
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
      fullName: user.fullName,
      email: user.email,
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
      fullName: user.fullName,
      email: user.email,
      subscription: user.subscription,
    },
  })
})

export default {
  signup,
  signin,
  logout,
  verifySession,
}
