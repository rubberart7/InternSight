"use client";

import React from "react";

const ResumeUploadForm = () => {
  return (
    <form id="resume-upload-form" className="flex flex-col gap-4 mt-8">
      {/* Name */}
      <div className="form-div">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          id="name"
        />
      </div>

      {/* Email */}
      <div className="form-div">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your Email Address"
          id="email"
        />
      </div>

      {/* LinkedIn */}
      <div className="form-div">
        <label htmlFor="linkedin">LinkedIn</label>
        <input
          type="url"
          name="linkedin"
          placeholder="LinkedIn Profile URL"
          id="linkedin"
        />
      </div>

      {/* Education */}
      <div className="form-div">
        <label htmlFor="education">Education</label>
        <input
          type="text"
          name="education"
          placeholder="e.g. B.Sc. Computer Science, XYZ University"
          id="education"
        />
      </div>

      {/* Description */}
      <div className="form-div">
        <label htmlFor="description">Description</label>
        <textarea
          rows={8}
          name="description"
          placeholder="Brief professional summary or objective"
          id="description"
        />
      </div>

      {/* Skills */}
      <div className="form-div">
        <label htmlFor="skills">Skills</label>
        <textarea
          rows={6}
          name="skills"
          placeholder="List your technical and soft skills"
          id="skills"
        />
      </div>

      {/* Work Experience */}
      <div className="form-div">
        <label htmlFor="work-experience">Work Experience</label>
        <textarea
          rows={6}
          name="work-experience"
          placeholder="Describe your past roles, responsibilities, and achievements"
          id="work-experience"
        />
      </div>

      {/* Projects */}
      <div className="form-div">
        <label htmlFor="projects">Projects</label>
        <textarea
          rows={6}
          name="projects"
          placeholder="Highlight key projects you've worked on"
          id="projects"
        />
      </div>

      {/* Certifications and Awards */}
      <div className="form-div">
        <label htmlFor="certifications">Certifications and Awards</label>
        <textarea
          rows={6}
          name="certifications"
          placeholder="List certifications, honors, and awards"
          id="certifications"
        />
      </div>
    </form>
  );
};

export default ResumeUploadForm;
