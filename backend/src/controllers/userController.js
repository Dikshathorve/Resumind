import { User } from '../models/User.js'
import { asyncHandler } from '../middleware/middleware.js'

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.session.userId

  const user = await User.findById(userId)
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
      profileImage: user.profileImage,
      preferences: user.preferences,
      subscription: user.subscription,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
    },
  })
})

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.session.userId
  const { fullName, profileImage, preferences } = req.body

  let user = await User.findById(userId)
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    })
  }

  if (fullName) user.fullName = fullName
  if (profileImage) user.profileImage = profileImage
  if (preferences) {
    user.preferences = { ...user.preferences, ...preferences }
  }

  user.updatedAt = new Date()
  user = await user.save()

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImage: user.profileImage,
      preferences: user.preferences,
    },
  })
})

// @route   POST /api/user/password
// @desc    Change password
// @access  Private
export const changePassword = asyncHandler(async (req, res) => {
  const userId = req.session.userId
  const { currentPassword, newPassword, confirmPassword } = req.body

  // Validation
  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields',
    })
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'New passwords do not match',
    })
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters',
    })
  }

  // Get user with password
  let user = await User.findById(userId).select('+password')
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    })
  }

  // Verify current password
  const isPasswordValid = await user.comparePassword(currentPassword)
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Current password is incorrect',
    })
  }

  // Update password
  user.password = newPassword
  user.updatedAt = new Date()
  user = await user.save()

  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
  })
})

// @route   DELETE /api/user/account
// @desc    Delete user account
// @access  Private
export const deleteAccount = asyncHandler(async (req, res) => {
  const userId = req.session.userId

  const user = await User.findByIdAndDelete(userId)
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    })
  }

  // Destroy session
  req.session.destroy()

  res.status(200).json({
    success: true,
    message: 'Account deleted successfully',
  })
})

export default {
  getUserProfile,
  updateUserProfile,
  changePassword,
  deleteAccount,
}
