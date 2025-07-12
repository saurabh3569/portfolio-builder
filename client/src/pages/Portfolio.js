import React, { useEffect, useState } from "react";
import { addContact, getPublicPortfolio } from "../services/api";
import Header from "../components/portfolio/Header";
import Footer from "../components/portfolio/Footer";
import HeaderSection from "../components/portfolio/HeaderSection";
import SkillsSection from "../components/portfolio/SkillsSection";
import ExperienceSection from "../components/portfolio/ExperienceSection";
import EducationSection from "../components/portfolio/EducationSection";
import ProjectsSection from "../components/portfolio/ProjectsSection";
import ContactSection from "../components/portfolio/ContactSection";
import AOS from "aos";
import "aos/dist/aos.css";
import "./css/Portfolio.css";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

function Portfolio() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    AOS.init({
      duration: 1000,
      once: true,
      disable: "mobile",
      offset: 100,
    });

    getPublicPortfolio(username)
      .then((res) => {
        setPortfolio(res.data);
      })
      .catch((err) => {
        console.error(err);
        navigate("/404");
      });
  }, [username, navigate]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await addContact({ ...contactForm, userId: portfolio.user.id });
      setFormStatus("Message sent successfully!");
      setContactForm({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus(""), 3000);
    } catch (error) {
      setFormStatus(error.response?.data?.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (!portfolio)
    return <div className="text-center mt-5 text-light">Loading...</div>;

  return (
    <div className="portfolio-container">
      <main>
        <Header />
        <HeaderSection
          userName={portfolio.user.name}
          summary={portfolio.summary}
          resume={portfolio.resume}
        />
        <SkillsSection
          skills={portfolio.skills}
          capitalizeFirstLetter={capitalizeFirstLetter}
        />
        <ExperienceSection experiences={portfolio.experiences} />
        <ProjectsSection projects={portfolio.projects} />
        <EducationSection educations={portfolio.educations} />
        <ContactSection
          contactForm={contactForm}
          formStatus={formStatus}
          handleContactSubmit={handleContactSubmit}
          handleInputChange={handleInputChange}
          user={portfolio.user}
        />
      </main>
      <Footer socialLinks={portfolio.socialLinks} />
    </div>
  );
}

export default Portfolio;
