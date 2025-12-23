import express from 'express';
import {
  enhanceProfessionalSummary,
  batchEnhanceSummaries
} from '../services/summaryAIService.js';

const router = express.Router();

/**
 * POST /api/ai/enhance/professional-summary
 * Enhance a single professional summary
 */
router.post('/enhance/professional-summary', async (req, res) => {
  try {
    const { summary } = req.body;

    // Validation
    if (!summary) {
      return res.status(400).json({
        success: false,
        message: 'Summary text is required'
      });
    }

    if (summary.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: 'Summary must be at least 20 characters'
      });
    }

    console.log('📝 POST /enhance/professional-summary');
    console.log('   Summary length:', summary.length);

    const result = await enhanceProfessionalSummary(summary);

    if (!result.success) {
      return res.status(400).json(result);
    }

    console.log('✅ Summary enhanced successfully');
    res.json(result);
  } catch (error) {
    console.error('❌ Error in /enhance/professional-summary:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to enhance summary',
      error: error.message
    });
  }
});

/**
 * POST /api/ai/enhance/batch-summaries
 * Enhance multiple summaries in batch
 */
router.post('/enhance/batch-summaries', async (req, res) => {
  try {
    const { summaries } = req.body;

    if (!Array.isArray(summaries) || summaries.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Summaries array is required (array of text strings)'
      });
    }

    console.log('📦 POST /enhance/batch-summaries');
    console.log('   Count:', summaries.length);

    const result = await batchEnhanceSummaries(summaries);

    console.log('✅ Batch enhancement successful');
    res.json(result);
  } catch (error) {
    console.error('❌ Error in /enhance/batch-summaries:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to enhance summaries',
      error: error.message
    });
  }
});

export default router;
