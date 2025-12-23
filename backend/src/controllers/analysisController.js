import { AnalysisResult } from '../models/AnalysisResult.js'
import { asyncHandler } from '../middleware/middleware.js'
import { performComprehensiveJobMatching } from '../services/aiJobMatcherService.js'

// @route   POST /api/analysis/job-matcher
// @desc    Analyze resume against job description using AI
// @access  Private
export const analyzeJobMatcher = asyncHandler(async (req, res) => {
  const userId = req.session.userId
  const { resumeId, jobDescription, summary, experiences, skills, projects } = req.body

  if (!jobDescription || jobDescription.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Job description is required',
    })
  }

  // Validate that at least some resume data is provided
  if (!summary && (!experiences || experiences.length === 0) && (!skills || skills.length === 0) && (!projects || projects.length === 0)) {
    return res.status(400).json({
      success: false,
      message: 'At least some resume content (summary, experiences, skills, or projects) is required',
    })
  }

  try {
    console.log('🎯 Starting job matcher analysis for user:', userId)
    
    // Perform comprehensive job matching using AI
    const analysisResults = await performComprehensiveJobMatching(
      {
        summary: summary || '',
        experiences: experiences || [],
        skills: skills || [],
        projects: projects || []
      },
      jobDescription
    )

    if (!analysisResults.success) {
      return res.status(400).json({
        success: false,
        message: analysisResults.message,
      })
    }

    // Save analysis to database
    const analysis = await AnalysisResult.create({
      userId,
      resumeId: resumeId || null,
      type: 'job-matcher',
      jobDescription,
      score: analysisResults.overallMatchScore,
      suggestions: analysisResults.analyses, // Store detailed analysis
      results: {
        overallMatchScore: analysisResults.overallMatchScore,
        totalTokens: analysisResults.totalTokens,
        estimatedCost: analysisResults.estimatedCost,
        matchingInsights: analysisResults.matchingInsights,
      },
    })

    console.log('✅ Job matching analysis completed successfully')
    console.log('   Match Score:', analysisResults.overallMatchScore)
    console.log('   Cost:', analysisResults.estimatedCost)

    res.status(200).json({
      success: true,
      message: 'Job matching analysis completed successfully',
      analysis: {
        _id: analysis._id,
        overallMatchScore: analysisResults.overallMatchScore,
        matchingInsights: analysisResults.matchingInsights,
        detailedAnalysis: {
          summary: analysisResults.analyses.summary?.analysis || null,
          experiences: analysisResults.analyses.experiences?.analysis || null,
          skills: analysisResults.analyses.skills?.analysis || null,
          projects: analysisResults.analyses.projects?.analysis || null,
        },
        tokenUsage: {
          total: analysisResults.totalTokens,
          estimatedCost: analysisResults.estimatedCost,
        },
        createdAt: analysis.createdAt,
      },
    })
  } catch (error) {
    console.error('❌ Job matcher analysis error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to complete job matching analysis',
      error: error.message,
    })
  }
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
