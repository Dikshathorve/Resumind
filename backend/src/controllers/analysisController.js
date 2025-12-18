import { AnalysisResult } from '../models/AnalysisResult.js'
import { asyncHandler } from '../middleware/middleware.js'

// Mock Job Matcher Analysis
const performJobMatcherAnalysis = async (resume, jobDescription) => {
  // In production, this would call your AI service
  const suggestions = [
    {
      id: 1,
      section: 'Professional Summary',
      originalText: resume.summary || 'No summary provided',
      suggestedText:
        'Experienced professional with proven track record in delivering high-impact solutions aligned with your job requirements.',
      improvement: 23,
      applied: false,
    },
    {
      id: 2,
      section: 'Skills',
      originalText: resume.skills?.join(', ') || 'No skills provided',
      suggestedText: 'JavaScript, React, Node.js, SQL, Cloud Computing, Team Leadership',
      improvement: 18,
      applied: false,
    },
    {
      id: 3,
      section: 'Professional Experience',
      originalText: 'Current work experience',
      suggestedText: 'Enhanced description emphasizing relevant achievements and metrics',
      improvement: 31,
      applied: false,
    },
  ]

  return {
    suggestions,
    overallScore: 72,
    matchedCount: 8,
    totalKeywords: 15,
  }
}

// @route   POST /api/analysis/job-matcher
// @desc    Analyze resume against job description
// @access  Private
export const analyzeJobMatcher = asyncHandler(async (req, res) => {
  const userId = req.session.userId
  const { resumeId, jobDescription } = req.body

  if (!jobDescription || jobDescription.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Job description is required',
    })
  }

  // Mock resume data (in production, fetch from database)
  const mockResumeData = {
    summary: 'Experienced full-stack developer',
    skills: ['JavaScript', 'React', 'Node.js'],
  }

  // Perform analysis
  const analysisResults = await performJobMatcherAnalysis(mockResumeData, jobDescription)

  // Save to database
  const analysis = await AnalysisResult.create({
    userId,
    resumeId: resumeId || null,
    type: 'job-matcher',
    jobDescription,
    score: analysisResults.overallScore,
    suggestions: analysisResults.suggestions,
    results: analysisResults,
  })

  res.status(200).json({
    success: true,
    message: 'Job matching analysis completed',
    analysis,
  })
})

// Mock ATS Analysis
const performATSAnalysis = async (resumeText, jobDescription) => {
  // In production, this would:
  // 1. Parse PDF resume
  // 2. Extract keywords from JD
  // 3. Perform ATS scoring
  // 4. Analyze formatting

  return {
    atsScore: 78,
    matchedKeywords: ['project management', 'agile', 'leadership', 'communication'],
    missingKeywords: ['machine learning', 'cloud architecture', 'devops'],
    sections: {
      skills: {
        score: 85,
        issues: ['Missing technical certifications'],
      },
      experience: {
        score: 72,
        issues: ['Could emphasize quantifiable achievements more'],
      },
      education: {
        score: 88,
        issues: [],
      },
      format: {
        score: 76,
        issues: ['Consider adding more white space between sections'],
      },
    },
    recommendations: [
      'Add more action verbs to describe your accomplishments',
      'Include specific metrics and numbers to showcase impact',
      'Use industry-standard keywords from the job description',
      'Ensure consistent formatting and spacing',
      'Organize information in reverse chronological order',
    ],
  }
}

// @route   POST /api/analysis/ats
// @desc    Analyze resume for ATS compatibility
// @access  Private
export const analyzeATS = asyncHandler(async (req, res) => {
  const userId = req.session.userId
  const { resumeId, jobDescription, resumeText } = req.body

  if (!jobDescription || jobDescription.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Job description is required',
    })
  }

  if (!resumeText && !resumeId) {
    return res.status(400).json({
      success: false,
      message: 'Resume content or resumeId is required',
    })
  }

  // Perform ATS analysis
  const analysisResults = await performATSAnalysis(
    resumeText || 'Resume content from database',
    jobDescription
  )

  // Save to database
  const analysis = await AnalysisResult.create({
    userId,
    resumeId: resumeId || null,
    type: 'ats-analyzer',
    jobDescription,
    score: analysisResults.atsScore,
    matchedKeywords: analysisResults.matchedKeywords,
    missingKeywords: analysisResults.missingKeywords,
    sections: analysisResults.sections,
    recommendations: analysisResults.recommendations,
    results: analysisResults,
  })

  res.status(200).json({
    success: true,
    message: 'ATS analysis completed',
    analysis,
  })
})

// @route   GET /api/analysis/history
// @desc    Get analysis history
// @access  Private
export const getAnalysisHistory = asyncHandler(async (req, res) => {
  const userId = req.session.userId
  const { type, limit = 10, page = 1 } = req.query

  const query = { userId }
  if (type) query.type = type

  const analyses = await AnalysisResult.find(query)
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit))

  const total = await AnalysisResult.countDocuments(query)

  res.status(200).json({
    success: true,
    count: analyses.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
    analyses,
  })
})

// @route   GET /api/analysis/:id
// @desc    Get specific analysis
// @access  Private
export const getAnalysisById = asyncHandler(async (req, res) => {
  const userId = req.session.userId
  const { id } = req.params

  const analysis = await AnalysisResult.findOne({ _id: id, userId })
  if (!analysis) {
    return res.status(404).json({
      success: false,
      message: 'Analysis not found',
    })
  }

  res.status(200).json({
    success: true,
    analysis,
  })
})

// @route   DELETE /api/analysis/:id
// @desc    Delete analysis
// @access  Private
export const deleteAnalysis = asyncHandler(async (req, res) => {
  const userId = req.session.userId
  const { id } = req.params

  const analysis = await AnalysisResult.findOneAndDelete({ _id: id, userId })
  if (!analysis) {
    return res.status(404).json({
      success: false,
      message: 'Analysis not found',
    })
  }

  res.status(200).json({
    success: true,
    message: 'Analysis deleted successfully',
  })
})

export default {
  analyzeJobMatcher,
  analyzeATS,
  getAnalysisHistory,
  getAnalysisById,
  deleteAnalysis,
}
