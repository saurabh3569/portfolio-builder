import React, { useRef } from "react"; // Added useRef for scrolling

function ProjectsManager({
  projects,
  handleAddProject,
  handleEditProject,
  handleUpdateProject,
  handleDeleteProject,
  newProject,
  setNewProject,
  editingProject,
  setEditingProject,
}) {
  const formRef = useRef(null); // Ref to the form container

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
      links: { ...prev.links, [name]: value },
    }));
  };

  const handleEditProjectChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });

    setEditingProject((prev) => ({
      ...prev,
      [name]: value,
      links: { ...prev.links, [name]: value },
    }));
  };

  const onEditProject = (proj) => {
    handleEditProject(proj);
    // Scroll to the form
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="dashboard-projects-section"
      className="projects-section"
      data-aos="fade-up"
    >
      <h2 className="section-title">Manage Projects</h2>
      <div className="card mb-4" ref={formRef}>
        <div className="card-body">
          <h5 className="card-title mb-4">
            {editingProject ? "Edit Project" : "Add New Project"}
          </h5>
          <form
            onSubmit={editingProject ? handleUpdateProject : handleAddProject}
          >
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="projName" className="form-label">
                  Project Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projName"
                  name="name"
                  value={editingProject ? editingProject.name : newProject.name}
                  onChange={
                    editingProject
                      ? handleEditProjectChange
                      : handleProjectChange
                  }
                  required
                />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="projDescription" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="projDescription"
                  name="description"
                  rows="3"
                  value={
                    editingProject
                      ? editingProject.description
                      : newProject.description
                  }
                  onChange={
                    editingProject
                      ? handleEditProjectChange
                      : handleProjectChange
                  }
                  required
                ></textarea>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="projTechnologies" className="form-label">
                  Technologies (Comma-separated)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projTechnologies"
                  name="technologies"
                  value={
                    editingProject
                      ? editingProject.technologies
                      : newProject.technologies
                  }
                  onChange={
                    editingProject
                      ? handleEditProjectChange
                      : handleProjectChange
                  }
                  placeholder="e.g., React, NodeJS, MongoDB"
                  required
                />
              </div>
              {/* Live Link Input */}
              <div className="col-md-6 mb-3">
                <label htmlFor="projLiveLink" className="form-label">
                  Live Link
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="projLiveLink"
                  name="live"
                  value={
                    editingProject
                      ? editingProject.links?.live || ""
                      : newProject.links?.live || ""
                  }
                  onChange={
                    editingProject
                      ? handleEditProjectChange
                      : handleProjectChange
                  }
                  placeholder="e.g., https://yourproject.com"
                />
              </div>
              {/* Source Code Link Input */}
              <div className="col-md-6 mb-3">
                <label htmlFor="projSourceCode" className="form-label">
                  Source Code Link
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="projSourceCode"
                  name="sourceCode"
                  value={
                    editingProject
                      ? editingProject.links?.sourceCode || ""
                      : newProject.links?.sourceCode || ""
                  }
                  onChange={
                    editingProject
                      ? handleEditProjectChange
                      : handleProjectChange
                  }
                  placeholder="e.g., https://github.com/yourrepo"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success me-2">
              {editingProject ? "Update Project" : "Add Project"}
            </button>
            {editingProject && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditingProject(null)}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
      {projects && projects.length > 0 ? (
        <div className="row justify-content-center">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="col-lg-6 col-md-8 col-sm-10 mb-4"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="project-card">
                <h5 className="card-title">{proj.name}</h5>
                <p className="card-description">{proj.description}</p>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className="card-tech">
                    {proj.technologies.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="tech-item"
                        data-aos="fade"
                        data-aos-delay={techIdx * 50}
                      >
                        {tech}
                      </span>
                    ))}
                  </p>
                )}
                {/* Display Links */}
                <div className="project-links">
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
                <div className="action-buttons mt-2">
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => onEditProject(proj)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteProject(proj._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-light-subtle">No Projects Available.</p>
      )}
    </section>
  );
}

export default ProjectsManager;
