import { Resume } from '../models/Resume.js'
import { Projects } from '../models/Projects.js'
import { asyncHandler } from '../middleware/middleware.js'

// @route   POST /api/resumes
// @desc    Create a new resume
// @access  Private
export const createResume = asyncHandler(async (req, res) => {
  const { name, templateType, resumeData } = req.body
  const userId = req.session.userId

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

  // Add resume ID to user's Projects array
  try {
    let userProjects = await Projects.findOne({ userId })
    
    if (!userProjects) {
      // Create Projects document if it doesn't exist
      userProjects = await Projects.create({
        userId,
        projectsId,
        projects: [resume._id],
        projectsCount: 1
      })
    } else {
      // Add resume to projects array if not already there
      if (!userProjects.projects.includes(resume._id)) {
        userProjects.projects.push(resume._id)
        userProjects.projectsCount = userProjects.projects.length
        await userProjects.save()
      }
    }
  } catch (error) {
    console.error('[Resume API] Error updating Projects:', error.message)
    // Don't fail the resume creation if Projects update fails, just log the error
  }

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

  // Remove resume ID from user's Projects array
  try {
    const userProjects = await Projects.findOne({ userId })
    if (userProjects) {
      userProjects.projects = userProjects.projects.filter(
        projectId => projectId.toString() !== id
      )
      userProjects.projectsCount = userProjects.projects.length
      await userProjects.save()
    }
  } catch (error) {
    console.error('[Resume API] Error updating Projects after delete:', error.message)
    // Don't fail the deletion if Projects update fails
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

  // Get the count of existing resumes for this user to determine resumeIndex
  const existingResumes = await Resume.countDocuments({ userId })
  const resumeIndex = existingResumes
  
  // Generate resumeName and projectsId for the duplicate
  const resumeName = `resume-${userId}-${resumeIndex}`
  const projectsId = `${userId}-PROJECT-${Date.now()}`

  const duplicatedResume = new Resume({
    userId,
    projectsId,
    resumeIndex,
    resumeName,
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
    profileImage: originalResume.profileImage,
  })

  await duplicatedResume.save()

  // Add duplicated resume ID to user's Projects array
  try {
    let userProjects = await Projects.findOne({ userId })
    
    if (userProjects) {
      if (!userProjects.projects.includes(duplicatedResume._id)) {
        userProjects.projects.push(duplicatedResume._id)
        userProjects.projectsCount = userProjects.projects.length
        await userProjects.save()
      }
    }
  } catch (error) {
    console.error('[Resume API] Error updating Projects after duplicate:', error.message)
    // Don't fail the duplication if Projects update fails
  }

  res.status(201).json({
    success: true,
    message: 'Resume duplicated successfully',
    resume: duplicatedResume,
  })
})

// @route   POST /api/resumes/batch/fetch
// @desc    Fetch multiple resumes by IDs
// @access  Private
export const getResumesByIds = asyncHandler(async (req, res) => {
  const { ids } = req.body
  const userId = req.session.userId

  if (!Array.isArray(ids) || ids.length === 0) {
    console.error('[Resume API] Invalid IDs array provided')
    return res.status(400).json({
      success: false,
      message: 'Please provide an array of resume IDs'
    })
  }

  try {
    // Convert string IDs to ObjectId if needed
    const resumes = await Resume.find({
      _id: { $in: ids },
      userId
    }).select('_id name templateType personal summary experiences education projects skills certifications accentColor profileImage updatedAt')

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes
    })
  } catch (error) {
    console.error('[Resume API] Error fetching resumes:', error.message)
    res.status(500).json({
      success: false,
      message: 'Error fetching resumes'
    })
  }
})

export default {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,
  duplicateResume,
  getResumesByIds,
}
