"use client";


import Navbar from '../components/ui/NavBar';
import ResumeAnalyzer from '../components/ui/ResumeAnalyzer';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const EnterResumePage = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-screen p-8 bg-white text-gray-950">
        <LoadingSpinner />
        <p className="mt-4 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <main
      className="bg-cover min-h-screen flex flex-col items-center"
      style={{ backgroundImage: "url('/images/bg-main.webp')" }}
    >
      <Navbar />
      <ResumeAnalyzer />
    </main>
  );
};

export default EnterResumePage;
