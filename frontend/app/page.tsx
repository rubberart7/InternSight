"use client";

import NavBar from "./components/ui/NavBar";
import { resumes } from "./constants";
import ResumeCard from "./components/ui/ResumeCard";
import { useAuth } from "./context/AuthContext";
import LoadingSpinner from "./components/ui/LoadingSpinner";

export default function Home() {

	const { loading } = useAuth();

	if (loading) {
		return (
      <div className="flex flex-col items-center justify-center h-full min-h-screen p-8 bg-slate-950 text-gray-100">
        <LoadingSpinner />
        <p className="mt-4 text-lg">Loading...</p>
      </div>
    );
	}
  return (
    <main className="bg-[url('/images/bg-main.webp')] bg-cover">
		<NavBar></NavBar>
		<section className="main-section py-16">
			<div className="page-heading">
				<h1>Track your Applications and Resume Ratings</h1>
				<h2>Review your submissions and check AI-powered feedback.</h2>
			</div>

			{
				resumes.length > 0 && (
					<div className="resumes-section">
						{resumes.map((resume) => (
							<ResumeCard key={resume.id} resume={resume}></ResumeCard>
						))}
					</div>
				)
			}

		</section>

	

		
	</main>
  );
}
