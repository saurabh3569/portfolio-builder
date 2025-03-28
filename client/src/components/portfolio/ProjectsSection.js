import React from "react";

function ProjectsSection({ projects }) {
  return (
    <section
      id="projects-section"
      className="projects-section"
      data-aos="fade-up"
    >
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="row justify-content-center">
          {projects && projects.length ? (
            projects.map((proj, idx) => (
              <div
                key={idx}
                className="col-lg-6 col-md-8 col-sm-10 mb-4"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="project-card">
                  <h5 className="card-title">{proj.name}</h5>
                  <p className="card-description">{proj.description}</p>
                  <p className="card-tech">
                    <small>Tech: {proj.technologies.join(", ")}</small>
                  </p>
                  {/* Display links if they exist */}
                  <div className="project-links mt-2">
                    {proj.links?.live && (
                      <a
                        href={proj.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary btn-sm me-2"
                      >
                        Live Demo
                      </a>
                    )}
                    {proj.links?.sourceCode && (
                      <a
                        href={proj.links.sourceCode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-secondary btn-sm"
                      >
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-light-subtle">
              <p>No Projects Available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
