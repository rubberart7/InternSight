import Link from "next/link";
import Image from "next/image"; // Import the next/image component
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({ resume }: { resume: Resume }) => {
  return (
    <Link href={`/resume/${resume.id}`} className="resume-card animate-in fade-in duration-1000">
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          {resume.companyName && <h2 className="!text-black font-bold break-words">{resume.companyName}</h2>}
          {resume.jobTitle && <h3 className="text-lg break-words text-gray-500">{resume.jobTitle}</h3>}
          {!resume.companyName && !resume.jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={resume.feedback.overallScore} />
        </div>
      </div>
      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-full">
          <Image
            src={resume.imagePath}
            alt="resume"
            width={490} // Set the width of the image
            height={350} // Set the height of the image
            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
          />
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;