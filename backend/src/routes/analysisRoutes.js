import express from 'express'
import {
  analyzeJobMatcher,
  analyzeATS,
  getAnalysisHistory,
  getAnalysisById,
  deleteAnalysis,
} from '../controllers/analysisController.js'
import { isAuthenticated } from '../middleware/middleware.js'

const router = express.Router()

router.use(isAuthenticated) // All analysis routes require authentication

router.post('/job-matcher', analyzeJobMatcher)
router.post('/ats', analyzeATS)
router.get('/history', getAnalysisHistory)
router.get('/:id', getAnalysisById)
router.delete('/:id', deleteAnalysis)

export default router
