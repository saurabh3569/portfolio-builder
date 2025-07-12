import React, { useRef } from "react";
import moment from "moment";

function EducationManager({
  educations,
  handleAddEducation,
  handleEditEducation,
  handleUpdateEducation,
  handleDeleteEducation,
  newEducation,
  setNewEducation,
  editingEducation,
  setEditingEducation,
}) {
  const formRef = useRef(null);

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setNewEducation((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditEducationChange = (e) => {
    const { name, value } = e.target;
    setEditingEducation((prev) => ({ ...prev, [name]: value }));
  };

  const onEditEducation = (edu) => {
    handleEditEducation(edu);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="dashboard-education-section"
      className="education-section"
      data-aos="fade-up"
    >
      <h2 className="section-title">Manage Education</h2>
      <div className="card mb-4" ref={formRef}>
        <div className="card-body">
          <h5 className="card-title mb-4">
            {editingEducation ? "Edit Education" : "Add New Education"}
          </h5>
          <form
            onSubmit={
              editingEducation ? handleUpdateEducation : handleAddEducation
            }
          >
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="eduDegree" className="form-label">
                  Degree
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="eduDegree"
                  name="degree"
                  value={
                    editingEducation
                      ? editingEducation.degree
                      : newEducation.degree
                  }
                  onChange={
                    editingEducation
                      ? handleEditEducationChange
                      : handleEducationChange
                  }
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="eduInstitution" className="form-label">
                  Institution
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="eduInstitution"
                  name="institution"
                  value={
                    editingEducation
                      ? editingEducation.institution
                      : newEducation.institution
                  }
                  onChange={
                    editingEducation
                      ? handleEditEducationChange
                      : handleEducationChange
                  }
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="eduStartDate" className="form-label">
                  Start Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="eduStartDate"
                  name="startDate"
                  value={
                    editingEducation
                      ? editingEducation.startDate
                      : newEducation.startDate
                  }
                  onChange={
                    editingEducation
                      ? handleEditEducationChange
                      : handleEducationChange
                  }
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="eduEndDate" className="form-label">
                  End Date (Optional)
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="eduEndDate"
                  name="endDate"
                  value={
                    editingEducation
                      ? editingEducation.endDate
                      : newEducation.endDate
                  }
                  onChange={
                    editingEducation
                      ? handleEditEducationChange
                      : handleEducationChange
                  }
                />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="eduDescription" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="eduDescription"
                  name="description"
                  rows="3"
                  value={
                    editingEducation
                      ? editingEducation.description
                      : newEducation.description
                  }
                  onChange={
                    editingEducation
                      ? handleEditEducationChange
                      : handleEducationChange
                  }
                ></textarea>
              </div>
              {/* <div className="col-md-12 mb-3">
                <label htmlFor="eduSubjects" className="form-label">
                  Subjects (Comma-separated)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="eduSubjects"
                  name="subjects"
                  value={
                    editingEducation
                      ? editingEducation.subjects
                      : newEducation.subjects
                  }
                  onChange={
                    editingEducation
                      ? handleEditEducationChange
                      : handleEducationChange
                  }
                  placeholder="e.g., Computer Science, Mathematics, Physics"
                />
              </div> */}
            </div>
            <button type="submit" className="btn btn-success me-2">
              {editingEducation ? "Update Education" : "Add Education"}
            </button>
            {editingEducation && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditingEducation(null)}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
      {educations && educations.length > 0 ? (
        <div className="row justify-content-center">
          {educations.map((edu, idx) => (
            <div
              key={idx}
              className="col-lg-6 col-md-8 col-sm-10 mb-4"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="education-card">
                <h5 className="card-title">
                  {edu.degree} @ {edu.institution}
                </h5>
                <p className="card-date">
                  {moment(edu.startDate).format("MMM YYYY")} -{" "}
                  {edu.endDate
                    ? moment(edu.endDate).format("MMM YYYY")
                    : "Present"}
                </p>
                <p className="card-description">{edu.description}</p>
                <div className="action-buttons">
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => onEditEducation(edu)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteEducation(edu.id)}
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
          No Educations Available.
        </p>
      )}
    </section>
  );
}

export default EducationManager;
