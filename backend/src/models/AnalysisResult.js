import mongoose from 'mongoose'

const analysisResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      default: null,
    },
    type: {
      type: String,
      enum: ['job-matcher', 'ats-analyzer'],
      required: true,
      index: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
    },
    results: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {},
    },
    // For Job Matcher
    suggestions: [
      {
        id: Number,
        section: String,
        originalText: String,
        suggestedText: String,
        improvement: Number,
        applied: Boolean,
      },
    ],
    // For ATS Analyzer
    matchedKeywords: [String],
    missingKeywords: [String],
    sections: {
      skills: {
        score: Number,
        issues: [String],
      },
      experience: {
        score: Number,
        issues: [String],
      },
      education: {
        score: Number,
        issues: [String],
      },
      format: {
        score: Number,
        issues: [String],
      },
    },
    recommendations: [String],
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
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
analysisResultSchema.index({ userId: 1, type: 1, createdAt: -1 })
analysisResultSchema.index({ resumeId: 1, createdAt: -1 })

export const AnalysisResult = mongoose.model('AnalysisResult', analysisResultSchema)
export default AnalysisResult
