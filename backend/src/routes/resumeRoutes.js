import express from 'express'
import {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,
  duplicateResume,
} from '../controllers/resumeController.js'
import { isAuthenticated } from '../middleware/middleware.js'

const router = express.Router()

router.use(isAuthenticated) // All resume routes require authentication

router.post('/', createResume)
router.get('/', getAllResumes)
router.get('/:id', getResumeById)
router.put('/:id', updateResume)
router.delete('/:id', deleteResume)
router.post('/:id/duplicate', duplicateResume)

export default router
