import React from "react";

function SectionSelector({ setActiveSection }) {
  return (
    <div className="section-selector text-center mb-5" data-aos="fade-up">
      <h2 className="section-title">Select Section to Manage</h2>
      <ul className="list-group">
        <li
          className="list-group-item list-group-item-action"
          onClick={() => setActiveSection("profile")}
          style={{ cursor: "pointer" }}
        >
          Profile
        </li>
        <li
          className="list-group-item list-group-item-action"
          onClick={() => setActiveSection("skills")}
          style={{ cursor: "pointer" }}
        >
          Skills
        </li>
        <li
          className="list-group-item list-group-item-action"
          onClick={() => setActiveSection("experience")}
          style={{ cursor: "pointer" }}
        >
          Experience
        </li>
        <li
          className="list-group-item list-group-item-action"
          onClick={() => setActiveSection("educations")}
          style={{ cursor: "pointer" }}
        >
          Education
        </li>
        <li
          className="list-group-item list-group-item-action"
          onClick={() => setActiveSection("projects")}
          style={{ cursor: "pointer" }}
        >
          Projects
        </li>
        <li
          className="list-group-item list-group-item-action"
          onClick={() => setActiveSection("socialLinks")}
          style={{ cursor: "pointer" }}
        >
          Social Links
        </li>
        <li
          className="list-group-item list-group-item-action"
          onClick={() => setActiveSection("contacts")}
          style={{ cursor: "pointer" }}
        >
          Contacts
        </li>
      </ul>
    </div>
  );
}

export default SectionSelector;
