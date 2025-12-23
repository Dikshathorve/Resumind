import OpenAI from 'openai'
import config from '../config/config.js'

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
})

/**
 * Evaluate resume against job description using RAG-based rubric
 * @param {string} resumeText - Cleaned resume text
 * @param {string} jobDescription - Job description text
 * @param {array} atsRules - Injected ATS rules from RAG (optional)
 * @returns {object} Structured evaluation result in JSON
 */
export const evaluateResumeAgainstJD = async (
  resumeText,
  jobDescription,
  atsRules = []
) => {
  try {
    const systemPrompt = buildSystemPrompt(atsRules)
    const userPrompt = buildUserPrompt(resumeText, jobDescription)

    const response = await openai.chat.completions.create({
      model: config.openaiModel,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      temperature: 1, // gpt-5-nano requires temperature of 1
      response_format: { type: 'json_object' }, // Force JSON response
      max_completion_tokens: 2000,
    })

    const responseText = response.choices[0]?.message?.content
    if (!responseText) {
      throw new Error('Empty response from OpenAI')
    }

    const result = JSON.parse(responseText)
    return result
  } catch (error) {
    console.error('Error evaluating resume:', error.message)
    throw error
  }
}

/**
 * Build system prompt with injected ATS rules (RAG)
 */
const buildSystemPrompt = (atsRules) => {
  const rulesContext =
    atsRules && atsRules.length > 0
      ? `\nRELEVANT ATS RULES:\n${atsRules.map((rule, i) => `${i + 1}. ${rule}`).join('\n')}`
      : ''

  return `You are an ATS resume evaluator. Your role is to score resumes strictly against job descriptions using a predefined rubric.

CRITICAL INSTRUCTIONS:
- Follow the rubric strictly with fixed weights
- Be conservative and rule-driven
- Do NOT hallucinate skills or experience
- Return ONLY valid JSON, no prose
- Score honestly based on actual content match
${rulesContext}

SCORING RUBRIC (Total: 100):
1. Keyword Match (30 points): Presence of job-specific technical keywords
2. Experience Relevance (25 points): How relevant past roles are to the target position
3. Skills Alignment (20 points): Match between required and candidate's skills
4. Formatting & Readability (15 points): ATS-friendly formatting, clear structure
5. Impact & Metrics (10 points): Quantifiable achievements and results

RESPONSE FORMAT:
Return ONLY valid JSON with this exact structure:
{
  "overall_score": <number 0-100>,
  "category_scores": {
    "keyword_match": <number 0-30>,
    "experience_relevance": <number 0-25>,
    "skills_alignment": <number 0-20>,
    "formatting": <number 0-15>,
    "impact": <number 0-10>
  },
  "missing_keywords": [<array of actual keywords found in JD but not in resume>],
  "format_issues": [<array of formatting issues if any>],
  "improvement_suggestions": [<array of max 5 actionable suggestions>],
  "analysis_summary": "<brief 2-3 line summary>"
}`
}

/**
 * Build user prompt with resume and JD
 */
const buildUserPrompt = (resumeText, jobDescription) => {
  return `Evaluate this resume against the job description.

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resumeText}

Provide your evaluation in the exact JSON format specified.`
}

export default {
  evaluateResumeAgainstJD,
}
