import React from "react";

function SkillsManager({
  skills,
  handleAddSkill,
  handleEditSkill,
  handleUpdateSkill,
  handleDeleteSkill,
  newSkill,
  setNewSkill,
  editingSkill,
  setEditingSkill,
  showAllSkills,
  setShowAllSkills,
}) {
  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setNewSkill((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSkillChange = (e) => {
    const { name, value } = e.target;
    setEditingSkill((prev) => ({ ...prev, [name]: value }));
  };

  const skillsToShow = showAllSkills ? skills : skills.slice(0, 4);

  return (
    <section
      id="dashboard-skills-section"
      className="skills-section"
      data-aos="fade-up"
    >
      <h2 className="section-title">Manage Skills</h2>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-4">Add New Skill</h5>
          <form onSubmit={handleAddSkill}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="skillName" className="form-label">
                  Skill Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="skillName"
                  name="name"
                  value={newSkill.name}
                  onChange={handleSkillChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="skillType" className="form-label">
                  Skill Type
                </label>
                <select
                  className="form-control"
                  id="skillType"
                  name="type"
                  value={newSkill.type}
                  onChange={handleSkillChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Language">Language</option>
                  <option value="Technology">Technology</option>
                  <option value="Database">Database</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Add Skill
            </button>
          </form>
        </div>
      </div>
      {skills && skills.length > 0 ? (
        <div className="skills-list">
          {skillsToShow.map((skill, idx) => (
            <div
              key={idx}
              className="list-item"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {editingSkill && editingSkill._id === skill._id ? (
                <form
                  onSubmit={handleUpdateSkill}
                  className="d-flex align-items-center gap-3 w-100"
                >
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={editingSkill.name}
                    onChange={handleEditSkillChange}
                    required
                  />
                  <select
                    className="form-control"
                    name="type"
                    value={editingSkill.type}
                    onChange={handleEditSkillChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Language">Language</option>
                    <option value="Technology">Technology</option>
                    <option value="Database">Database</option>
                    <option value="DevOps">DevOps</option>
                  </select>
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditingSkill(null)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div>
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-type"> ({skill.type})</span>
                  </div>
                  <div className="action-buttons">
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEditSkill(skill)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteSkill(skill._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {skills.length > 4 && (
            <div className="view-more-container">
              <button
                className="btn btn-primary view-more-btn"
                onClick={() => setShowAllSkills(!showAllSkills)}
                data-aos="fade-up"
              >
                {showAllSkills ? "View Less" : "View More"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-light-subtle">No Skills Available.</p>
      )}
    </section>
  );
}

export default SkillsManager;
