"use client";

import React, { useState, FormEvent } from 'react';
import Image from 'next/image';

interface FeedbackTip {
  type: "good" | "improve";
  tip: string;
  explanation?: string;
}

type AnyFeedbackTip = FeedbackTip | { type: "good" | "improve"; tip: string; explanation?: string };

interface ATSFeedbackSection {
  score: number;
  tips: {
    type: "good" | "improve";
    tip: string;
  }[];
}

interface DetailedFeedbackSection {
  score: number;
  tips: FeedbackTip[];
}

interface AnalysisFeedback {
  overallScore: number;
  ATS: ATSFeedbackSection;
  toneAndStyle: DetailedFeedbackSection;
  content: DetailedFeedbackSection;
  structure: DetailedFeedbackSection;
  skills: DetailedFeedbackSection;
}

interface AnalysisResult {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  applicantName: string;
  feedback: AnalysisFeedback;
}

const ResumeAnalyzer: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const serverUrl: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL;

  const analyzeResume = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsProcessing(true);
    setError(null);
    setAnalysisResult(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      companyName: formData.get('company-name') as string,
      jobTitle: formData.get('job-title') as string,
      jobDescription: formData.get('job-description') as string,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      linkedin: formData.get('linkedin') as string,
      education: formData.get('education') as string,
      description: formData.get('description') as string || '',
      skills: formData.get('skills') as string,
      workExperience: formData.get('work-experience') as string,
      projects: formData.get('projects') as string,
      certifications: formData.get('certifications') as string,
    };

    try {
      setStatusText('Preparing your resume data...');
      
      console.log('Calling API:', `${serverUrl}api/resume/analyze`);
      console.log('Server URL:', serverUrl);
      
      setStatusText('Analyzing with AI...');
      const response = await fetch(`${serverUrl}api/resume/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response received:', textResponse);
        throw new Error(`Server returned ${contentType || 'unknown content type'} instead of JSON. Check if the API endpoint exists.`);
      }

      const result: { data: AnalysisResult; message?: string } = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Server error: ${response.status}`);
      }

      setStatusText('Analysis complete!');
      setAnalysisResult(result.data);
      
    } catch (err: unknown) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setIsProcessing(false);
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number): string => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  if (analysisResult) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Resume Analysis Results</h1>
          <p className="text-gray-600">Analysis for {analysisResult.applicantName}</p>
          <p className="text-sm text-gray-500">Position: {analysisResult.jobTitle} at {analysisResult.companyName}</p>
        </div>

        <div className={`p-6 rounded-lg mb-6 ${getScoreBackground(analysisResult.feedback.overallScore)}`}>
          <h2 className="text-2xl font-bold mb-2">Overall Score</h2>
          <div className={`text-4xl font-bold ${getScoreColor(analysisResult.feedback.overallScore)}`}>
            {analysisResult.feedback.overallScore}/100
          </div>
        </div>

        {(Object.entries(analysisResult.feedback) as [keyof AnalysisFeedback, ATSFeedbackSection | DetailedFeedbackSection | number][]).map(([key, section]) => {
          if (key === 'overallScore') return null;
          
          const feedbackSection = section as ATSFeedbackSection | DetailedFeedbackSection;
          
          const sectionName = key === 'ATS' ? 'ATS Compatibility' : 
                             key === 'toneAndStyle' ? 'Tone & Style' :
                             key.charAt(0).toUpperCase() + key.slice(1);

          return (
            <div key={key} className="mb-6 p-6 bg-white rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{sectionName}</h3>
                <span className={`text-2xl font-bold ${getScoreColor(feedbackSection.score)}`}>
                  {feedbackSection.score}/100
                </span>
              </div>
              
              <div className="space-y-3">
                {feedbackSection.tips.map((tip: AnyFeedbackTip, index: number) => (
                  <div key={index} className={`p-4 rounded-lg ${
                    tip.type === 'good' ? 'bg-green-50 border-l-4 border-green-400' : 'bg-red-50 border-l-4 border-red-400'
                  }`}>
                    <div className="flex items-start">
                      <span className={`inline-block w-2 h-2 rounded-full mt-2 mr-3 ${
                        tip.type === 'good' ? 'bg-green-400' : 'bg-red-400'
                      }`}></span>
                      <div>
                        <h4 className="font-semibold mb-1">{tip.tip}</h4>
                        {tip.explanation && (
                          <p className="text-sm text-gray-600">{tip.explanation}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="text-center mt-8">
          <button 
            onClick={() => {
              setAnalysisResult(null);
              setError(null);
            }}
            className="primary-button"
          >
            Analyze Another Resume
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <section className="main-section">
        <div className="page-heading py-16 max-w-4xl mx-auto">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <Image 
                src="/images/resume-scan.gif" 
                className="w-full max-w-md mx-auto" 
                alt="Analyzing..." 
                width={400}
                height={300}
                unoptimized
              />
            </>
          ) : (
            <h2>Enter your information for an ATS score and improvement tips</h2>
          )}
          
          {error && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mt-4">
              {error}
            </div>
          )}

          {!isProcessing && (
            <form id="upload-form" className="flex flex-col gap-4 mt-8" onSubmit={analyzeResume}>
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input type="text" name="company-name" placeholder="Company Name" id="company-name" required />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input type="text" name="job-title" placeholder="Job Title" id="job-title" required />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea rows={8} name="job-description" placeholder="Job Description" id="job-description" required />
              </div>

              <div className="form-div">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" placeholder="Your Full Name" id="name" required />
              </div>
              <div className="form-div">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Your Email Address" id="email" required />
              </div>
              <div className="form-div">
                <label htmlFor="linkedin">LinkedIn</label>
                <input type="url" name="linkedin" placeholder="LinkedIn Profile URL" id="linkedin" />
              </div>

              <div className="form-div">
                <label htmlFor="description">Professional Summary</label>
                <textarea rows={4} name="description" placeholder="Brief professional summary or objective" id="description" />
              </div>
              <div className="form-div">
                <label htmlFor="education">Education</label>
                <textarea rows={3} name="education" placeholder="e.g. B.Sc. Computer Science, XYZ University" id="education" />
              </div>
              <div className="form-div">
                <label htmlFor="skills">Skills</label>
                <textarea rows={6} name="skills" placeholder="List your technical and soft skills" id="skills" />
              </div>
              <div className="form-div">
                <label htmlFor="work-experience">Work Experience</label>
                <textarea rows={6} name="work-experience" placeholder="Describe your past roles, responsibilities, and achievements" id="work-experience" />
              </div>
              <div className="form-div">
                <label htmlFor="projects">Projects</label>
                <textarea rows={6} name="projects" placeholder="Highlight key projects you've worked on" id="projects" />
              </div>
              <div className="form-div">
                <label htmlFor="certifications">Certifications and Awards</label>
                <textarea rows={6} name="certifications" placeholder="List certifications, honors, and awards" id="certifications" />
              </div>

              <button className="primary-button" type="submit" disabled={isProcessing}>
                {isProcessing ? 'Analyzing...' : 'Analyze Resume'}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default ResumeAnalyzer;