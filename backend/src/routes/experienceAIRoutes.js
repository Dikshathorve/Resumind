import express from 'express';
import {
  generateJobDescription,
  enhanceExperienceDescription,
  batchEnhanceExperiences
} from '../services/experienceAIService.js';

const router = express.Router();

/**
 * POST /api/ai/generate/job-description
 * Generate detailed job description from job title, company, and brief info
 */
router.post('/generate/job-description', async (req, res) => {
  try {
    const { jobTitle, company, duration, briefDescription } = req.body;

    // Validation
    if (!jobTitle || !company) {
      return res.status(400).json({
        success: false,
        message: 'Job title and company are required'
      });
    }

    console.log('💼 POST /generate/job-description');
    console.log('   Job Title:', jobTitle, '| Company:', company);

    const result = await generateJobDescription({
      jobTitle,
      company,
      duration,
      briefDescription
    });

    if (!result.success) {
      return res.status(400).json(result);
    }

    console.log('✅ Job description generated successfully');
    res.json(result);
  } catch (error) {
    console.error('❌ Error in /generate/job-description:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to generate job description',
      error: error.message
    });
  }
});

/**
 * POST /api/ai/enhance/experience
 * Enhance a single experience description
 */
router.post('/enhance/experience', async (req, res) => {
  try {
    const { description } = req.body;

    // Validation
    if (!description) {
      return res.status(400).json({
        success: false,
        message: 'Experience description is required'
      });
    }

    if (description.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: 'Description must be at least 20 characters'
      });
    }

    console.log('💼 POST /enhance/experience');
    console.log('   Description length:', description.length);

    const result = await enhanceExperienceDescription(description);

    if (!result.success) {
      return res.status(400).json(result);
    }

    console.log('✅ Experience enhanced successfully');
    res.json(result);
  } catch (error) {
    console.error('❌ Error in /enhance/experience:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to enhance experience description',
      error: error.message
    });
  }
});

/**
 * POST /api/ai/enhance/batch-experiences
 * Enhance multiple experience descriptions in batch
 */
router.post('/enhance/batch-experiences', async (req, res) => {
  try {
    const { descriptions } = req.body;

    if (!Array.isArray(descriptions) || descriptions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Descriptions array is required (array of text strings)'
      });
    }

    console.log('📦 POST /enhance/batch-experiences');
    console.log('   Count:', descriptions.length);

    const result = await batchEnhanceExperiences(descriptions);

    console.log('✅ Batch enhancement successful');
    res.json(result);
  } catch (error) {
    console.error('❌ Error in /enhance/batch-experiences:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to enhance experience descriptions',
      error: error.message
    });
  }
});

export default router;
