import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

// Helper function to generate 6-digit unique ID
const generate6DigitId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Helper function to generate unique projectsId
const generateProjectsId = (userId) => {
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${userId}-PROJECT-${randomSuffix}`
}

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      sparse: true,
      // Generated as 6-digit unique ID before saving
    },
    fullName: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // don't return password by default
    },
    projectsId: {
      type: String,
      unique: true,
      sparse: true,
      // Generated as userId-PROJECT-XXXXX (e.g., 123456-PROJECT-XXXXX)
    },
    profileImage: {
      type: String,
      default: null,
    },
    preferences: {
      accentColor: {
        type: String,
        default: '#3B82F6',
      },
      defaultTemplate: {
        type: String,
        default: 'template1',
      },
      emailNotifications: {
        type: Boolean,
        default: true,
      },
    },
    subscription: {
      type: String,
      enum: ['free', 'premium', 'pro'],
      default: 'free',
    },
    subscriptionExpiry: {
      type: Date,
      default: null,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      default: null,
      select: false,
    },
    passwordResetToken: {
      type: String,
      default: null,
      select: false,
    },
    passwordResetExpiry: {
      type: Date,
      default: null,
      select: false,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

// Generate userId and projectsId before saving
userSchema.pre('save', async function (next) {
  // Generate userId if not already set
  if (!this.userId) {
    let isUnique = false
    while (!isUnique) {
      this.userId = generate6DigitId()
      // Check if this userId already exists
      const existingUser = await mongoose.model('User').findOne({ userId: this.userId })
      if (!existingUser) {
        isUnique = true
      }
    }
  }

  // Generate projectsId if not already set
  if (!this.projectsId && this.userId) {
    this.projectsId = generateProjectsId(this.userId)
  }

  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password)
}

// Method to get user data without sensitive info
userSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  delete user.emailVerificationToken
  delete user.passwordResetToken
  delete user.passwordResetExpiry
  return user
}

export const User = mongoose.model('User', userSchema)
export default User
