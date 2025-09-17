import { GoogleGenerativeAI } from '@google/generative-ai';
import { prepareInstructions } from '../constants/aiPrompts.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface ResumeData {
  name: string;
  email: string;
  linkedin: string;
  education: string;
  description: string;
  skills: string;
  workExperience: string;
  projects: string;
  certifications: string;
}

export const formatResumeData = (data: ResumeData): string => {
  return `
RESUME CONTENT:

Name: ${data.name}
Email: ${data.email}
LinkedIn: ${data.linkedin}

Education: ${data.education}

Professional Summary:
${data.description}

Skills:
${data.skills}

Work Experience:
${data.workExperience}

Projects:
${data.projects}

Certifications and Awards:
${data.certifications}
`.trim();
};

export const analyzeResumeWithGemini = async ({
  jobTitle,
  jobDescription,
  resumeData,
}: {
  jobTitle: string;
  jobDescription: string;
  resumeData: ResumeData;
}) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const instructions = prepareInstructions({ jobTitle, jobDescription });
    const formattedResume = formatResumeData(resumeData);
    const prompt = `${instructions}\n\n${formattedResume}`;
    
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    
    
    
    const cleanedText = text.replace(/```json|```/g, '').trim();
    const feedback = JSON.parse(cleanedText);
    
    return feedback;
  } catch (error) {
    console.error('Error analyzing resume with Gemini:', error);
    throw new Error('Failed to analyze resume');
  }
};