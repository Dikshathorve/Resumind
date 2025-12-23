import express from 'express';
import { generateProfessionRecommendations } from '../services/professionAIService.js';

const router = express.Router();

/**
 * POST /api/ai/suggest/profession
 * Generate 4 profession recommendations based on input
 */
router.post('/suggest/profession', async (req, res) => {
  try {
    const { profession } = req.body;

    if (!profession) {
      return res.status(400).json({
        success: false,
        message: 'Profession field is required'
      });
    }

    console.log('🔍 Received profession request:', profession);
    console.log('📌 OpenAI API Key exists:', !!process.env.OPENAI_API_KEY);
    console.log('📌 OpenAI Model:', process.env.OPENAI_MODEL);

    const result = await generateProfessionRecommendations(profession);

    console.log('✅ Generation result:', result);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.message,
        error: result.error
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        original_profession: result.original_profession,
        recommendations: result.recommendations,
        explanation: result.explanation,
        model: result.model
      }
    });

  } catch (error) {
    console.error('❌ Profession recommendation error:', error);
    console.error('Error stack:', error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error generating profession recommendations',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

export default router;
