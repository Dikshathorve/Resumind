import { Resume } from '../models/Resume.js'
import { asyncHandler } from '../middleware/middleware.js'

// @route   POST /api/resumes
// @desc    Create a new resume
// @access  Private
export const createResume = asyncHandler(async (req, res) => {
  const { name, templateType, resumeData } = req.body
  const userId = req.session.userId

  console.log('[Resume API] POST /api/resumes - Creating new resume')
  console.log('[Resume API] User ID from session:', userId)
  console.log('[Resume API] Request body:', { name, templateType })
  console.log('[Resume API] Session data:', req.session)

  if (!userId) {
    console.error('[Resume API] User ID is missing from session')
    return res.status(401).json({
      success: false,
      message: 'Unauthorized - User session not found'
    })
  }

  // Get the count of existing resumes for this user to determine resumeIndex
  const existingResumes = await Resume.countDocuments({ userId })
  const resumeIndex = existingResumes // Start from 0 for first resume
  
  // Generate resumeName and projectsId
  const resumeName = `resume-${userId}-${resumeIndex}`
  const projectsId = `${userId}-PROJECT-${Date.now()}`

  console.log('[Resume API] Auto-generated resumeName:', resumeName)
  console.log('[Resume API] Auto-generated projectsId:', projectsId)
  console.log('[Resume API] Resume index:', resumeIndex)

  const resume = await Resume.create({
    userId,
    projectsId,
    resumeIndex,
    resumeName,
    name: name || 'My Resume',
    templateType: templateType || 'template1',
    personal: resumeData?.personal || {},
    summary: resumeData?.summary || '',
    experiences: resumeData?.experiences || [],
    education: resumeData?.education || [],
    projects: resumeData?.projects || [],
    skills: resumeData?.skills || [],
    certifications: resumeData?.certifications || [],
  })

  console.log('[Resume API] Resume created successfully with ID:', resume._id)

  res.status(201).json({
    success: true,
    message: 'Resume created successfully',
    resume,
  })
})

// @route   GET /api/resumes
// @desc    Get all user resumes
// @access  Private
export const getAllResumes = asyncHandler(async (req, res) => {
  const userId = req.session.userId

  const resumes = await Resume.find({ userId }).sort({ createdAt: -1 })

  res.status(200).json({
    success: true,
    count: resumes.length,
    resumes,
  })
})

// @route   GET /api/resumes/:id
// @desc    Get specific resume
// @access  Private
export const getResumeById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const userId = req.session.userId

  const resume = await Resume.findOne({ _id: id, userId })
  if (!resume) {
    return res.status(404).json({
      success: false,
      message: 'Resume not found',
    })
  }

  res.status(200).json({
    success: true,
    resume,
  })
})

// @route   PUT /api/resumes/:id
// @desc    Update resume
// @access  Private
export const updateResume = asyncHandler(async (req, res) => {
  const { id } = req.params
  const userId = req.session.userId
  const {
    name,
    templateType,
    personal,
    summary,
    experiences,
    education,
    projects,
    skills,
    certifications,
    accentColor,
    profileImage,
  } = req.body

  console.log('[Resume API] PUT /api/resumes/:id - Updating resume')
  console.log('[Resume API] Resume ID:', id)
  console.log('[Resume API] User ID from session:', userId)
  console.log('[Resume API] Fields being updated:', { name, templateType, personal, summary })

  if (!userId) {
    console.error('[Resume API] User ID is missing from session')
    return res.status(401).json({
      success: false,
      message: 'Unauthorized - User session not found'
    })
  }

  let resume = await Resume.findOne({ _id: id, userId })
  if (!resume) {
    console.error('[Resume API] Resume not found for ID:', id, 'and User:', userId)
    return res.status(404).json({
      success: false,
      message: 'Resume not found',
    })
  }

  // Update fields
  if (name) resume.name = name
  if (templateType) resume.templateType = templateType
  if (personal) resume.personal = { ...resume.personal, ...personal }
  if (summary) resume.summary = summary
  if (experiences) resume.experiences = experiences
  if (education) resume.education = education
  if (projects) resume.projects = projects
  if (skills) resume.skills = skills
  if (certifications) resume.certifications = certifications
  if (accentColor) resume.accentColor = accentColor
  if (profileImage) resume.profileImage = profileImage

  resume.updatedAt = new Date()
  resume.lastModified = new Date()

  resume = await resume.save()

  console.log('[Resume API] Resume updated successfully with ID:', resume._id)
  console.log('[Resume API] Updated fields:', { name, templateType, accentColor })

  res.status(200).json({
    success: true,
    message: 'Resume updated successfully',
    resume,
  })
})

// @route   DELETE /api/resumes/:id
// @desc    Delete resume
// @access  Private
export const deleteResume = asyncHandler(async (req, res) => {
  const { id } = req.params
  const userId = req.session.userId

  const resume = await Resume.findOneAndDelete({ _id: id, userId })
  if (!resume) {
    return res.status(404).json({
      success: false,
      message: 'Resume not found',
    })
  }

  res.status(200).json({
    success: true,
    message: 'Resume deleted successfully',
  })
})

// @route   POST /api/resumes/:id/duplicate
// @desc    Duplicate resume
// @access  Private
export const duplicateResume = asyncHandler(async (req, res) => {
  const { id } = req.params
  const userId = req.session.userId

  const originalResume = await Resume.findOne({ _id: id, userId })
  if (!originalResume) {
    return res.status(404).json({
      success: false,
      message: 'Resume not found',
    })
  }

  const duplicatedResume = new Resume({
    userId,
    name: `${originalResume.name} (Copy)`,
    templateType: originalResume.templateType,
    personal: originalResume.personal,
    summary: originalResume.summary,
    experiences: originalResume.experiences,
    education: originalResume.education,
    projects: originalResume.projects,
    skills: originalResume.skills,
    certifications: originalResume.certifications,
    accentColor: originalResume.accentColor,
  })

  await duplicatedResume.save()

  res.status(201).json({
    success: true,
    message: 'Resume duplicated successfully',
    resume: duplicatedResume,
  })
})

export default {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,
  duplicateResume,
}
