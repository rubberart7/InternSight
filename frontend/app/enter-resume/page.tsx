import React from 'react';
import Navbar from '../components/ui/NavBar';
import JobUploadForm from '../components/ui/JobUploadForm';
import AnalyzeResumeButton from '../components/ui/AnalyzeResumeButton';

const page = () => {
  return (
    <main className='bg-cover min-h-screen flex flex-col items-center'
    style={{ backgroundImage: "url('/images/bg-main.webp')" }}
    >
      <Navbar/>
      <section className="main-section">
        <div className='page-heading py-16'>
          <h1>Smart feedback for your dream job</h1>
          <h2>Drop your resume for an ATS score and improvement tips</h2>
          <JobUploadForm/>
          <AnalyzeResumeButton/>
        </div>

      </section>
      
    </main>
  )
}

export default page
