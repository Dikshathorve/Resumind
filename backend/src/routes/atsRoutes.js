import express from 'express';
import { analyzeATSResume, analyzeATSBuiltResume } from '../controllers/atsController.js';

const router = express.Router();

// @route   POST /api/ats/analyze-resume
// @desc    Analyze uploaded resume against job description
// @access  Private
router.post('/analyze-resume', analyzeATSResume);

// @route   POST /api/ats/analyze-built-resume
// @desc    Analyze built resume against job description
// @access  Private
router.post('/analyze-built-resume', analyzeATSBuiltResume);

export default router;
