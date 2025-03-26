import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addExperience,
  addProject,
  addSkill,
  addSocialLink,
  deleteExperience,
  deleteProject,
  deleteSkill,
  deleteSocialLink,
  getUserPortfolio,
  updateExperience,
  updatePortfolio,
  updateProject,
  updateSkill,
  updateSocialLink,
  listContact,
  deleteContact,
  updateProfile,
  addEducation,
  updateEducation,
  deleteEducation,
  updatePortfolioVisibility,
} from "../services/api";
import Navbar from "../components/admin/Navbar";
import SectionSelector from "../components/admin/SectionSelector";
import SkillsManager from "../components/admin/SkillsManager";
import ExperienceManager from "../components/admin/ExperienceManager";
import ProjectsManager from "../components/admin/ProjectsManager";
import SocialLinksManager from "../components/admin/SocialLinksManager";
import ContactManager from "../components/admin/ContactManager";
import ProfileManager from "../components/admin/ProfileManager";
import EducationManager from "../components/admin/EducationManager";
import AOS from "aos";
import "aos/dist/aos.css";
import "./css/Admin.css";

function Admin() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: "", type: "" });
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    technologies: "",
  });
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    technologies: "",
  });
  const [newSocialLink, setNewSocialLink] = useState({ platform: "", url: "" });
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingSocialLink, setEditingSocialLink] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [profile, setProfile] = useState({
    summary: "",
    resume: "",
    name: "",
    email: "",
  });
  const [editingProfile, setEditingProfile] = useState(null);
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [editingEducation, setEditingEducation] = useState(null);
  const [profileVisibility, setProfileVisibility] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const res = await getUserPortfolio();
        setPortfolio(res.data);
        setProfile({
          name: res.data.user.name || "",
          email: res.data.user.email || "",
          phone: res.data.user.phone || "",
          username: res.data.user.username || "",
          location: res.data.user.location || "",
          summary: res.data.summary || "",
          resume: res.data.resume || "",
        });
        setProfileVisibility(res.data.isPublic);
        setLoading(false);
      } catch (err) {
        setError("Failed to load portfolio. Please try again later.");
        setLoading(false);
        console.error(err);
      }
    };

    const fetchContact = async () => {
      try {
        setLoading(true);
        const res = await listContact();
        setContacts(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load portfolio. Please try again later.");
        setLoading(false);
        console.error(err);
      }
    };

    AOS.init({
      duration: 1000,
      once: true,
      disable: "mobile",
    });

    fetchPortfolio();
    fetchContact();
  }, [navigate]);

  // Refresh Portfolio after updates
  const refreshPortfolio = async () => {
    const res = await getUserPortfolio();
    setPortfolio(res.data);
  };

  // Toggle Public Visibility
  const handleTogglePublic = async () => {
    setProfileVisibility(!profileVisibility);
    try {
      const updatedPortfolio = {
        ...portfolio,
        isPublic: !profileVisibility, // Toggle the value
      };
      await updatePortfolioVisibility({ isPublic: updatedPortfolio.isPublic });
    } catch (err) {
      alert("Failed to update visibility. Please try again.");
      console.error(err);
    }
  };

  // Handle Skill Add
  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name || !newSkill.type) {
      alert("Please provide both skill name and type.");
      return;
    }
    try {
      await addSkill(newSkill);
      await refreshPortfolio();
      setNewSkill({ name: "", type: "" });
    } catch (err) {
      alert("Failed to add skill. Please try again.");
      console.error(err);
    }
  };

  // Handle Skill Edit
  const handleEditSkill = (skill) => {
    setEditingSkill(skill);
  };

  const handleUpdateSkill = async (e) => {
    e.preventDefault();
    try {
      await updateSkill(editingSkill);
      await refreshPortfolio();
      setEditingSkill(null);
    } catch (err) {
      alert("Failed to update skill. Please try again.");
      console.error(err);
    }
  };

  // Handle Skill Delete
  const handleDeleteSkill = async (skillId) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await deleteSkill(skillId);
        await refreshPortfolio();
      } catch (err) {
        alert("Failed to delete skill. Please try again.");
        console.error(err);
      }
    }
  };

  // Handle Experience Add
  const handleAddExperience = async (e) => {
    e.preventDefault();
    const { title, company, startDate, endDate, description, technologies } =
      newExperience;
    if (!title || !company || !startDate) {
      alert("Please provide title, company, and start date.");
      return;
    }
    try {
      const experienceData = {
        title,
        company,
        startDate,
        endDate: endDate || null,
        description,
        technologies: technologies
          ? technologies.split(",").map((t) => t.trim())
          : [],
      };
      await addExperience(experienceData);
      await refreshPortfolio();
      setNewExperience({
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        technologies: "",
      });
    } catch (err) {
      alert("Failed to add experience. Please try again.");
      console.error(err);
    }
  };

  // Handle Experience Edit
  const handleEditExperience = (exp) => {
    setEditingExperience({
      ...exp,
      technologies: exp.technologies ? exp.technologies.join(", ") : "",
    });
  };

  const handleUpdateExperience = async (e) => {
    e.preventDefault();
    try {
      const experienceData = {
        ...editingExperience,
        technologies: editingExperience.technologies
          ? editingExperience.technologies.split(",").map((t) => t.trim())
          : [],
      };
      await updateExperience(experienceData);
      await refreshPortfolio();
      setEditingExperience(null);
    } catch (err) {
      alert("Failed to update experience. Please try again.");
      console.error(err);
    }
  };

  // Handle Experience Delete
  const handleDeleteExperience = async (expId) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        await deleteExperience(expId);
        await refreshPortfolio();
      } catch (err) {
        alert("Failed to delete experience. Please try again.");
        console.error(err);
      }
    }
  };

  // Handle Project Add
  const handleAddProject = async (e) => {
    e.preventDefault();
    const { name, description, technologies } = newProject;
    if (!name || !description || !technologies) {
      alert("Please provide project name, description, and technologies.");
      return;
    }
    try {
      const projectData = {
        name,
        description,
        technologies: technologies.split(",").map((t) => t.trim()),
      };
      await addProject(projectData);
      await refreshPortfolio();
      setNewProject({ name: "", description: "", technologies: "" });
    } catch (err) {
      alert("Failed to add project. Please try again.");
      console.error(err);
    }
  };

  // Handle Project Edit
  const handleEditProject = (proj) => {
    setEditingProject({
      ...proj,
      technologies: proj.technologies ? proj.technologies.join(", ") : "",
    });
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      const projectData = {
        ...editingProject,
        technologies: editingProject.technologies
          ? editingProject.technologies.split(",").map((t) => t.trim())
          : [],
      };
      await updateProject(projectData);
      await refreshPortfolio();
      setEditingProject(null);
    } catch (err) {
      alert("Failed to update project. Please try again.");
      console.error(err);
    }
  };

  // Handle Project Delete
  const handleDeleteProject = async (projId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(projId);
        await refreshPortfolio();
      } catch (err) {
        alert("Failed to delete project. Please try again.");
        console.error(err);
      }
    }
  };

  // Handle Social Link Add
  const handleAddSocialLink = async (e) => {
    e.preventDefault();
    if (!newSocialLink.platform || !newSocialLink.url) {
      alert("Please provide both platform and URL.");
      return;
    }
    try {
      await addSocialLink(newSocialLink);
      await refreshPortfolio();
      setNewSocialLink({ platform: "", url: "" });
    } catch (err) {
      alert("Failed to add social link. Please try again.");
      console.error(err);
    }
  };

  // Handle Social Link Edit
  const handleEditSocialLink = (link) => {
    setEditingSocialLink(link);
  };

  const handleUpdateSocialLink = async (e) => {
    e.preventDefault();
    try {
      await updateSocialLink(editingSocialLink);
      await refreshPortfolio();
      setEditingSocialLink(null);
    } catch (err) {
      alert("Failed to update social link. Please try again.");
      console.error(err);
    }
  };

  // Handle Social Link Delete
  const handleDeleteSocialLink = async (linkId) => {
    if (window.confirm("Are you sure you want to delete this social link?")) {
      try {
        await deleteSocialLink(linkId);
        await refreshPortfolio();
      } catch (err) {
        alert("Failed to delete social link. Please try again.");
        console.error(err);
      }
    }
  };

  // Handle Profile Update (User Details)
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const updateData = { ...editingProfile };
      if (!updateData.password) delete updateData.password;
      await updateProfile(updateData);
      await updatePortfolio(updateData);
      await refreshPortfolio();
      setEditingProfile(null);
    } catch (err) {
      alert("Failed to update profile. Please try again.");
      console.error(err);
    }
  };

  // Handle Education Add
  const handleAddEducation = async (e) => {
    e.preventDefault();
    const { degree, institution, startDate, endDate, description } =
      newEducation;
    if (!degree || !institution || !startDate) {
      alert("Please provide degree, institution, and start date.");
      return;
    }
    try {
      const educationData = {
        degree,
        institution,
        startDate,
        endDate: endDate || null,
        description,
      };
      await addEducation(educationData);
      await refreshPortfolio();
      setNewEducation({
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    } catch (err) {
      alert("Failed to add education. Please try again.");
      console.error(err);
    }
  };

  // Handle Education Edit
  const handleEditEducation = (edu) => {
    setEditingEducation(edu);
  };

  // Handle Education Update
  const handleUpdateEducation = async (e) => {
    e.preventDefault();
    try {
      await updateEducation(editingEducation);
      await refreshPortfolio();
      setEditingEducation(null);
    } catch (err) {
      alert("Failed to update education. Please try again.");
      console.error(err);
    }
  };

  // Handle Education Delete
  const handleDeleteEducation = async (eduId) => {
    if (window.confirm("Are you sure you want to delete this education?")) {
      try {
        await deleteEducation(eduId);
        await refreshPortfolio();
      } catch (err) {
        alert("Failed to delete education. Please try again.");
        console.error(err);
      }
    }
  };

  // Contacts Handler
  const handleDeleteContact = async (messageId) => {
    try {
      await deleteContact(messageId);
      setContacts((prev) => prev.filter((msg) => msg.id !== messageId));
    } catch (err) {
      alert("Failed to delete contact. Please try again.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-card">
          <h4 className="error-title">Oops! Something Went Wrong</h4>
          <p className="error-message">{error}</p>
          <button
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="text-center mt-5 text-light">
        No portfolio data available.
      </div>
    );
  }

  return (
    <div className="portfolio-container">
      <Navbar user={portfolio.user} />
      <div className="container mt-5 pt-4">
        <h1
          className="display-4 mb-4 text-light text-center"
          data-aos="fade-down"
        >
          Admin Dashboard
        </h1>

        {/* Toggle Public Button */}
        <div className="text-center mb-4" data-aos="fade-up">
          <label
            className="form-check-label text-light me-3"
            htmlFor="publicToggle"
          >
            Public Profile
          </label>
          <div className="custom-switch d-inline-block">
            <input
              type="checkbox"
              className="custom-switch-input"
              id="publicToggle"
              checked={profileVisibility}
              onChange={handleTogglePublic}
            />
            <label className="custom-switch-label" htmlFor="publicToggle">
              <span className="custom-switch-text on-text">On</span>
              <span className="custom-switch-text off-text">Off</span>
            </label>
          </div>
        </div>

        {/* Section Selector */}
        <SectionSelector setActiveSection={setActiveSection} />

        {/* Conditionally Render Sections */}
        {activeSection === "profile" && (
          <ProfileManager
            profile={profile}
            handleUpdateProfile={handleUpdateProfile}
            editingProfile={editingProfile}
            setEditingProfile={setEditingProfile}
          />
        )}
        {activeSection === "skills" && (
          <SkillsManager
            skills={portfolio.skills}
            handleAddSkill={handleAddSkill}
            handleEditSkill={handleEditSkill}
            handleUpdateSkill={handleUpdateSkill}
            handleDeleteSkill={handleDeleteSkill}
            newSkill={newSkill}
            setNewSkill={setNewSkill}
            editingSkill={editingSkill}
            setEditingSkill={setEditingSkill}
            showAllSkills={showAllSkills}
            setShowAllSkills={setShowAllSkills}
          />
        )}
        {activeSection === "experience" && (
          <ExperienceManager
            experiences={portfolio.experiences}
            handleAddExperience={handleAddExperience}
            handleEditExperience={handleEditExperience}
            handleUpdateExperience={handleUpdateExperience}
            handleDeleteExperience={handleDeleteExperience}
            newExperience={newExperience}
            setNewExperience={setNewExperience}
            editingExperience={editingExperience}
            setEditingExperience={setEditingExperience}
          />
        )}
        {activeSection === "educations" && (
          <EducationManager
            educations={portfolio.educations}
            handleAddEducation={handleAddEducation}
            handleEditEducation={handleEditEducation}
            handleUpdateEducation={handleUpdateEducation}
            handleDeleteEducation={handleDeleteEducation}
            newEducation={newEducation}
            setNewEducation={setNewEducation}
            editingEducation={editingEducation}
            setEditingEducation={setEditingEducation}
          />
        )}
        {activeSection === "projects" && (
          <ProjectsManager
            projects={portfolio.projects}
            handleAddProject={handleAddProject}
            handleEditProject={handleEditProject}
            handleUpdateProject={handleUpdateProject}
            handleDeleteProject={handleDeleteProject}
            newProject={newProject}
            setNewProject={setNewProject}
            editingProject={editingProject}
            setEditingProject={setEditingProject}
          />
        )}
        {activeSection === "socialLinks" && (
          <SocialLinksManager
            socialLinks={portfolio.socialLinks}
            handleAddSocialLink={handleAddSocialLink}
            handleEditSocialLink={handleEditSocialLink}
            handleUpdateSocialLink={handleUpdateSocialLink}
            handleDeleteSocialLink={handleDeleteSocialLink}
            newSocialLink={newSocialLink}
            setNewSocialLink={setNewSocialLink}
            editingSocialLink={editingSocialLink}
            setEditingSocialLink={setEditingSocialLink}
          />
        )}
        {activeSection === "contacts" && (
          <ContactManager
            contacts={contacts}
            handleDeleteContact={handleDeleteContact}
          />
        )}
      </div>
    </div>
  );
}

export default Admin;
