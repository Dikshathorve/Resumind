import mongoose from 'mongoose'

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    projectsId: {
      type: String,
      required: true,
      // Reference to Projects document (inherited from User)
      // Format: userId-PROJECT-XXXXX
    },
    resumeIndex: {
      type: Number,
      required: true,
      // Index of this resume for naming (0, 1, 2, etc.)
    },
    resumeName: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
      // Format: resume-{userId}-{resumeIndex} (e.g., resume-123456-0)
    },
    name: {
      type: String,
      default: 'My Resume',
      trim: true,
    },
    templateType: {
      type: String,
      enum: ['template1', 'template2', 'template3', 'template4'],
      default: 'template1',
    },
    personal: {
      fullName: String,
      jobTitle: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      website: String,
    },
    summary: {
      type: String,
      default: '',
    },
    experiences: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        jobTitle: String,
        company: String,
        location: String,
        startDate: Date,
        endDate: Date,
        currentlyWorking: Boolean,
        description: String,
      },
    ],
    education: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        school: String,
        degree: String,
        fieldOfStudy: String,
        startDate: Date,
        endDate: Date,
        grade: String,
        description: String,
      },
    ],
    projects: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        projectName: String,
        description: String,
        technologies: [String],
        projectLink: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    skills: [
      {
        type: String,
      },
    ],
    certifications: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        certName: String,
        issuer: String,
        issueDate: Date,
        expiryDate: Date,
        credentialUrl: String,
      },
    ],
    accentColor: {
      type: String,
      default: '#3B82F6',
    },
    profileImage: {
      type: String,
      default: null,
    },
    isTemplate: {
      type: Boolean,
      default: false,
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

// Index for better query performance
resumeSchema.index({ userId: 1, createdAt: -1 })
resumeSchema.index({ projectsId: 1 })
resumeSchema.index({ resumeName: 1 })

export const Resume = mongoose.model('Resume', resumeSchema)
export default Resume
