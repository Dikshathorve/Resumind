const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Analyze uploaded resume against job description
 */
export const analyzeResumeATS = async (resumeText, jobDescription) => {
  try {
    const requestBody = {
      resumeFile: resumeText,
      jobDescription: jobDescription.trim()
    };
    
    const response = await fetch(`${API_URL}/ats/analyze-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to analyze resume');
    }

    return data.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Analyze built resume against job description
 */
export const analyzeBuiltResumeATS = async (resumeData, jobDescription) => {
  try {
    const requestBody = {
      resumeData: resumeData,
      jobDescription: jobDescription.trim()
    };
    
    const response = await fetch(`${API_URL}/ats/analyze-built-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to analyze built resume');
    }

    return data.data;
  } catch (error) {
    throw error;
  }
};
