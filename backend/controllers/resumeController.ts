import type { Request, Response } from 'express';
import { analyzeResumeWithGemini, type ResumeData } from '../services/geminiService.js';

export const analyzeResume = async (req: Request, res: Response) => {
  try {
    const {
      companyName,
      jobTitle,
      jobDescription,
      name,
      email,
      linkedin,
      education,
      description,
      skills,
      workExperience,
      projects,
      certifications,
    } = req.body;

    console.log('Starting resume analysis...');
    console.log('Company:', companyName);
    console.log('Job Title:', jobTitle);
    console.log('Applicant:', name);

    // Validate required fields
    if (!jobTitle || !jobDescription) {
      return res.status(400).json({ 
        message: 'Job title and job description are required', 
        type: 'Error' 
      });
    }

    if (!name || !email) {
      return res.status(400).json({ 
        message: 'Name and email are required', 
        type: 'Error' 
      });
    }

    const resumeData: ResumeData = {
      name,
      email,
      linkedin: linkedin || '',
      education: education || '',
      description: description || '',
      skills: skills || '',
      workExperience: workExperience || '',
      projects: projects || '',
      certifications: certifications || '',
    };

    console.log('Analyzing with Gemini...');
    
    // Analyze with Gemini
    const feedback = await analyzeResumeWithGemini({
      jobTitle,
      jobDescription,
      resumeData,
    });

    console.log('Analysis complete!');
    
    // Return the analysis
    res.status(200).json({
      message: 'Resume analyzed successfully',
      type: 'Success',
      data: {
        companyName,
        jobTitle,
        jobDescription,
        applicantName: name,
        feedback,
      }
    });

  } catch (error) {
    console.error('Resume analysis error:', error);
    res.status(500).json({ 
      message: 'Failed to analyze resume. Please try again.', 
      type: 'Error' 
    });
  }
};