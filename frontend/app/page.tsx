import NavBar from "./components/ui/NavBar";
import { resumes } from "./constants";
import ResumeCard from "./components/ui/ResumeCard";

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-main-2.jpg')] bg-cover">
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
