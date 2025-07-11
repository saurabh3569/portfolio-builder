import React, { useRef } from "react";
import moment from "moment";
import { getDurationSummary } from "../../utils/helper";

function ExperienceManager({
  experiences,
  handleAddExperience,
  handleEditExperience,
  handleUpdateExperience,
  handleDeleteExperience,
  newExperience,
  setNewExperience,
  editingExperience,
  setEditingExperience,
}) {
  const formRef = useRef(null);

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setNewExperience((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditExperienceChange = (e) => {
    const { name, value } = e.target;
    setEditingExperience((prev) => ({ ...prev, [name]: value }));
  };

  const onEditExperience = (exp) => {
    handleEditExperience(exp);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="dashboard-experience-section"
      className="experience-section"
      data-aos="fade-up"
    >
      <h2 className="section-title">Manage Experience</h2>
      <div className="card mb-4" ref={formRef}>
        <div className="card-body">
          <h5 className="card-title mb-4">
            {editingExperience ? "Edit Experience" : "Add New Experience"}
          </h5>
          <form
            onSubmit={
              editingExperience ? handleUpdateExperience : handleAddExperience
            }
          >
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="expTitle" className="form-label">
                  Job Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="expTitle"
                  name="title"
                  value={
                    editingExperience
                      ? editingExperience.title
                      : newExperience.title
                  }
                  onChange={
                    editingExperience
                      ? handleEditExperienceChange
                      : handleExperienceChange
                  }
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="expCompany" className="form-label">
                  Company
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="expCompany"
                  name="company"
                  value={
                    editingExperience
                      ? editingExperience.company
                      : newExperience.company
                  }
                  onChange={
                    editingExperience
                      ? handleEditExperienceChange
                      : handleExperienceChange
                  }
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="expStartDate" className="form-label">
                  Start Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="expStartDate"
                  name="startDate"
                  value={
                    editingExperience
                      ? editingExperience.startDate
                      : newExperience.startDate
                  }
                  onChange={
                    editingExperience
                      ? handleEditExperienceChange
                      : handleExperienceChange
                  }
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="expEndDate" className="form-label">
                  End Date (Optional)
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="expEndDate"
                  name="endDate"
                  value={
                    editingExperience
                      ? editingExperience.endDate
                      : newExperience.endDate
                  }
                  onChange={
                    editingExperience
                      ? handleEditExperienceChange
                      : handleExperienceChange
                  }
                />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="expDescription" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="expDescription"
                  name="description"
                  rows="3"
                  value={
                    editingExperience
                      ? editingExperience.description
                      : newExperience.description
                  }
                  onChange={
                    editingExperience
                      ? handleEditExperienceChange
                      : handleExperienceChange
                  }
                ></textarea>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="expTechnologies" className="form-label">
                  Technologies (Comma-separated)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="expTechnologies"
                  name="technologies"
                  value={
                    editingExperience
                      ? editingExperience.technologies
                      : newExperience.technologies
                  }
                  onChange={
                    editingExperience
                      ? handleEditExperienceChange
                      : handleExperienceChange
                  }
                  placeholder="e.g., React, NodeJS, MongoDB"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success me-2">
              {editingExperience ? "Update Experience" : "Add Experience"}
            </button>
            {editingExperience && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditingExperience(null)}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
      {experiences && experiences.length > 0 ? (
        <div className="row justify-content-center">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="col-lg-6 col-md-8 col-sm-10 mb-4"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="experience-card">
                <h5 className="card-title">
                  {exp.title} @ {exp.company}
                </h5>
                <p className="card-date">
                  {moment(exp.startDate).format("MMM YYYY")} -{" "}
                  {exp.endDate
                    ? moment(exp.endDate).format("MMM YYYY")
                    : "Present"}{" "}
                  {getDurationSummary(exp.startDate, exp.endDate)}
                </p>
                <p className="card-description">{exp.description}</p>
                {exp.technologies && exp.technologies.length > 0 && (
                  <p className="card-tech">
                    {exp.technologies.map((tech, techIdx) => (
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
                <div className="action-buttons">
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => onEditExperience(exp)} // Updated to use new handler
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteExperience(exp._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-light-subtle">
          No Experiences Available.
        </p>
      )}
    </section>
  );
}

export default ExperienceManager;
