import OpenAI from 'openai';

/**
 * Enhance professional summary with AI - simple, pure AI response
 * @param {string} summaryText - The professional summary text to enhance
 * @returns {Promise<Object>} Enhanced summary with suggestions
 */
export const enhanceProfessionalSummary = async (summaryText) => {
  try {
    if (!summaryText || summaryText.trim().length === 0) {
      return {
        success: false,
        message: 'Professional summary cannot be empty',
        enhanced: null
      };
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    console.log('✍️ Enhancing professional summary...');
    console.log('   Input length:', summaryText.length, 'characters');

    // System prompt with persona guidance
    const systemPrompt = `You are an expert resume writer. Enhance the professional summary to be:
- Impactful and compelling
- ATS-friendly with relevant keywords
- 2-3 sentences maximum
- Focused on value and achievements

Return JSON: {"enhanced":"improved summary","improvements":["improvement1","improvement2","improvement3"]}`;

    // User prompt - simple, no hardcoded values
    const userPrompt = `Enhance this professional summary:
"${summaryText.trim()}"

Make it stronger and more professional.`;

    const response = await client.chat.completions.create({
      model: process.env.PROFESSION_MODEL || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
      max_tokens: 300 // Tight limit for efficiency
    });

    const responseText = response.choices[0]?.message?.content?.trim();
    console.log('📊 Tokens used:', response.usage.total_tokens);

    if (!responseText) {
      throw new Error('No response from AI');
    }

    const result = JSON.parse(responseText);

    console.log('✅ Summary enhanced successfully');

    return {
      success: true,
      original: summaryText,
      enhanced: result.enhanced,
      improvements: result.improvements || [],
      tokensUsed: response.usage.total_tokens,
      estimatedCost: `$${(response.usage.total_tokens * 0.00015).toFixed(5)}`
    };
  } catch (error) {
    console.error('❌ Error enhancing summary:', error.message);
    throw error;
  }
};

/**
 * Batch enhance multiple summaries
 * @param {Array} summaries - Array of summary text strings
 * @returns {Promise<Object>} Enhanced summaries with cost tracking
 */
export const batchEnhanceSummaries = async (summaries) => {
  try {
    console.log(`🔄 Batch enhancing ${summaries.length} summaries...`);

    const results = await Promise.all(
      summaries.map((summaryText) =>
        enhanceProfessionalSummary(summaryText)
      )
    );

    const totalTokens = results.reduce(
      (sum, r) => sum + (r.tokensUsed || 0),
      0
    );

    return {
      success: true,
      count: results.length,
      enhanced: results,
      totalTokens,
      totalCost: `$${(totalTokens * 0.00015).toFixed(4)}`
    };
  } catch (error) {
    console.error('❌ Batch enhancement error:', error.message);
    throw error;
  }
};
