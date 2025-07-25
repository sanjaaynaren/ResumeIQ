import { GoogleGenerativeAI } from '@google/generative-ai';

export interface ResumeAnalysisResult {
  fitPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  uniqueSkills: string[];
  overallAssessment: string;
  recommendations: string[];
  candidateName?: string;
  fileName: string;
}

export const analyzeResumeWithAI = async (
  resumeText: string,
  jobDescription: string,
  fileName: string,
  apiKey: string
): Promise<ResumeAnalysisResult> => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `
Analyze the following resume against the job description and provide a detailed assessment.

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resumeText}

Please provide your analysis in the following JSON format:
{
  "fitPercentage": <number between 0-100>,
  "matchedSkills": [<array of skills that match>],
  "missingSkills": [<array of important skills missing from resume>],
  "uniqueSkills": [<array of skills candidate has that add value>],
  "overallAssessment": "<detailed assessment paragraph>",
  "recommendations": [<array of 3-4 specific recommendations>],
  "candidateName": "<extract name from resume if available>"
}

Focus on:
1. Technical skills alignment
2. Experience relevance
3. Education/certification matches
4. Overall cultural and role fit
5. Areas for improvement

Be objective and provide constructive feedback.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();
    
    if (!content) {
      throw new Error('No response from Gemini');
    }

    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Gemini');
    }

    const analysisData = JSON.parse(jsonMatch[0]);
    
    return {
      ...analysisData,
      fileName
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to analyze resume. Please check your API key and try again.');
  }
};

export const extractTextFromFile = async (file: File): Promise<string> => {
  if (file.type === 'text/plain') {
    return await file.text();
  }
  
  // For other file types, we'll return a placeholder
  // In a real implementation, you'd use libraries like pdf-parse or mammoth for PDF/DOC files
  return `[File: ${file.name}]\nThis is a placeholder for file content extraction. In a full implementation, this would extract text from PDF, DOC, and other file formats.`;
};