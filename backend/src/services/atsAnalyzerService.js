import OpenAI from 'openai';

/**
 * ATS Resume Analyzer Service
 * Evaluates resume against job description using RAG-based rubric system
 * Scores: Keyword Match (30), Experience Relevance (25), Skills Alignment (20), 
 *         Formatting (15), Impact (10)
 */

// ATS Rules and Best Practices for RAG Context
const ATS_RULES_CONTEXT = `
# ATS Resume Best Practices and Rules

## Formatting Rules
- Use standard fonts (Arial, Calibri, Times New Roman)
- Simple formatting without colors, graphics, or images
- Clear section headers
- Consistent spacing and indentation
- Bullet points for easy parsing
- No special characters or symbols
- Standard page layout

## Keyword Optimization
- Include industry-specific keywords from job description
- Use exact terminology from JD when possible
- Incorporate technical skills and certifications
- Include role-specific competencies
- Match job title variations

## Content Structure
- Professional Summary (aligned with role)
- Core Competencies/Skills section
- Professional Experience with quantifiable achievements
- Education and Certifications
- Reverse chronological order for experience

## Achievement Metrics
- Always include numbers and percentages
- Use action verbs (Led, Managed, Developed, etc.)
- Quantify impact (time, cost, revenue, efficiency)
- Show ROI or business value
- Include concrete examples

## ATS-Friendly Keywords
- Use standard section headers (Professional Experience, Education, Skills)
- Include dates in standard format (MM/YYYY)
- Use full company names before acronyms
- Include degree names (Bachelor of Science)
- List certifications with issuing organizations
`;

export const analyzeResumeForATS = async (resumeText, jobDescription) => {
  try {
    if (!resumeText || !jobDescription) {
      return {
        success: false,
        message: 'Resume text and job description are required'
      };
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const systemPrompt = `You are an ATS (Applicant Tracking System) resume evaluator specializing in scoring resumes against job descriptions using a comprehensive rubric system.

${ATS_RULES_CONTEXT}

EVALUATION RUBRIC:
- Keyword Match (0-30): How well resume keywords match JD keywords
- Experience Relevance (0-25): How relevant professional experience is to role
- Skills Alignment (0-20): How well technical and soft skills align with JD
- Formatting (0-15): ATS-friendliness and resume structure quality
- Impact (0-10): Presence of quantifiable achievements and metrics

INSTRUCTIONS:
1. Analyze the resume strictly against the job description
2. Score each category based on the rubric
3. Identify ALL missing critical keywords from JD
4. List specific format issues if any
5. Provide 3-5 actionable improvement suggestions
6. Return ONLY valid JSON, no additional text

RETURN FORMAT (JSON ONLY):
{
  "overall_score": number (0-100),
  "category_scores": {
    "keyword_match": number (0-30),
    "experience_relevance": number (0-25),
    "skills_alignment": number (0-20),
    "formatting": number (0-15),
    "impact": number (0-10)
  },
  "missing_keywords": [array of strings],
  "matched_keywords": [array of strings],
  "format_issues": [array of strings],
  "improvement_suggestions": [array of strings],
  "strengths": [array of strings],
  "overall_fit": "Poor" | "Fair" | "Good" | "Excellent"
}`;

    const userPrompt = `Analyze this resume against the job description and score it using the ATS rubric.

JOB DESCRIPTION:
${jobDescription.trim()}

---

RESUME:
${resumeText.trim()}

---

Provide a comprehensive ATS analysis with detailed scoring. Return ONLY the JSON response.`;

    const response = await client.chat.completions.create({
      model: process.env.ATS_MODEL || 'gpt-4o-mini',
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
      temperature: 0.3,
      response_format: { type: 'json_object' }
    });

    try {
      const analysisData = JSON.parse(response.choices[0].message.content);
      
      return {
        success: true,
        analysis: analysisData
      };
    } catch (parseError) {
      console.error('Failed to parse ATS analysis response:', parseError);
      return {
        success: false,
        message: 'Failed to parse analysis response',
        error: parseError.message
      };
    }
  } catch (error) {
    console.error('ATS Analysis Error:', error);
    return {
      success: false,
      message: error.message || 'ATS analysis failed'
    };
  }
};

/**
 * Analyze built resume from resume data object
 */
export const analyzeBuiltResumeForATS = async (resumeData, jobDescription) => {
  try {
    if (!resumeData || !jobDescription) {
      return {
        success: false,
        message: 'Resume data and job description are required'
      };
    }

    // Convert structured resume data to text
    let resumeText = '';

    // Add personal info
    if (resumeData.personal) {
      resumeText += `${resumeData.personal.fullName || ''}\n`;
      if (resumeData.personal.email) resumeText += `Email: ${resumeData.personal.email}\n`;
      if (resumeData.personal.phone) resumeText += `Phone: ${resumeData.personal.phone}\n`;
      resumeText += '\n';
    }

    // Add professional summary
    if (resumeData.summary) {
      resumeText += `PROFESSIONAL SUMMARY\n`;
      resumeText += `${resumeData.summary}\n\n`;
    }

    // Add skills
    if (resumeData.skills && resumeData.skills.length > 0) {
      resumeText += `SKILLS\n`;
      resumeText += resumeData.skills.map(s => `• ${s.name || s}`).join('\n');
      resumeText += '\n\n';
    }

    // Add experiences
    if (resumeData.experiences && resumeData.experiences.length > 0) {
      resumeText += `PROFESSIONAL EXPERIENCE\n`;
      resumeData.experiences.forEach(exp => {
        resumeText += `${exp.jobTitle || ''} at ${exp.company || ''}\n`;
        if (exp.startDate || exp.endDate) {
          resumeText += `${exp.startDate || ''} - ${exp.endDate || 'Present'}\n`;
        }
        if (exp.description) {
          resumeText += `${exp.description}\n`;
        }
        resumeText += '\n';
      });
    }

    // Add education
    if (resumeData.education && resumeData.education.length > 0) {
      resumeText += `EDUCATION\n`;
      resumeData.education.forEach(edu => {
        resumeText += `${edu.degree || ''} in ${edu.field || ''} from ${edu.institution || ''}\n`;
        if (edu.graduationYear) {
          resumeText += `Graduated: ${edu.graduationYear}\n`;
        }
        resumeText += '\n';
      });
    }

    // Add certifications
    if (resumeData.certifications && resumeData.certifications.length > 0) {
      resumeText += `CERTIFICATIONS\n`;
      resumeText += resumeData.certifications.map(c => `• ${c.name || c}`).join('\n');
      resumeText += '\n\n';
    }

    return analyzeResumeForATS(resumeText, jobDescription);
  } catch (error) {
    console.error('Built Resume Analysis Error:', error);
    return {
      success: false,
      message: error.message || 'Built resume analysis failed'
    };
  }
};
