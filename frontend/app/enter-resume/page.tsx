import React from 'react';
import Navbar from '../components/ui/NavBar';
import ResumeAnalyzer from '../components/ui/ResumeAnalyzer';

const page = () => {
  
  return (
    <main className='bg-cover min-h-screen flex flex-col items-center'
    style={{ backgroundImage: "url('/images/bg-main.webp')" }}
    >
      <Navbar/>
      <ResumeAnalyzer></ResumeAnalyzer>
      
    </main>
  )
}

export default page
