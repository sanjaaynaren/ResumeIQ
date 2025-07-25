import OpenAI from 'openai';

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
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });

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
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-2025-04-14',
      messages: [
        {
          role: 'system',
          content: 'You are an expert HR analyst and technical recruiter. Provide objective, detailed resume analysis with specific actionable insights.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from OpenAI');
    }

    const analysisData = JSON.parse(jsonMatch[0]);
    
    return {
      ...analysisData,
      fileName
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
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