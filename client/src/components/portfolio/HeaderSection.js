import React from "react";

function HeaderSection({ userName, summary, resume }) {
  return (
    <header
      id="header-section"
      className="header-section text-center"
      data-aos="fade-down"
    >
      <h1 className="portfolio-title">{userName}</h1>
      <p className="portfolio-subtitle">{summary}</p>
      {resume && resume.length && (
        <div className="resume-section mt-4">
          <a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn resume-btn"
          >
            View My Resume
          </a>
        </div>
      )}
    </header>
  );
}

export default HeaderSection;
