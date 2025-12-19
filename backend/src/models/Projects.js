import mongoose from 'mongoose'

const projectsSchema = new mongoose.Schema(
  {
    projectsId: {
      type: String,
      unique: true,
      required: true,
      sparse: true,
      // Format: userId-PROJECT-XXXXX (inherited from User model)
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
      unique: true, // One projects document per user
    },
    projectsCount: {
      type: Number,
      default: 0,
      min: 0,
      // Total number of resumes/projects in the projects array
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
        // Format: resume-user-id-0, resume-user-id-1, etc.
        // References to Resume documents
      },
    ],
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

// Index for faster queries
projectsSchema.index({ userId: 1 })
projectsSchema.index({ projectsId: 1 })

export const Projects = mongoose.model('Projects', projectsSchema)
export default Projects
