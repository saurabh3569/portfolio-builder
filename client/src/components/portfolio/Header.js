import React, { useState } from "react";
import { Link } from "react-scroll";
import "./css/Header.css";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link
          to="header-section"
          smooth={true}
          duration={500}
          offset={-90}
          delay={300}
          className="navbar-brand header-logo"
          onClick={() => setIsNavOpen(false)}
        >
          <img
            src="/logo.jpg"
            alt="Logo"
            style={{ height: "40px", width: "40px" }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNav}
          aria-controls="navbarNav"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto header-links">
            <li className="nav-item">
              <Link
                to="header-section"
                smooth={true}
                duration={500}
                offset={-90}
                delay={300}
                className="nav-link header-link"
                onClick={() => setIsNavOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="skills-section"
                smooth={true}
                duration={500}
                offset={-90}
                delay={300}
                className="nav-link header-link"
                onClick={() => setIsNavOpen(false)}
              >
                Skills
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="experience-section"
                smooth={true}
                duration={500}
                offset={-90}
                delay={300}
                className="nav-link header-link"
                onClick={() => setIsNavOpen(false)}
              >
                Experience
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="projects-section"
                smooth={true}
                duration={500}
                offset={-90}
                delay={300}
                className="nav-link header-link"
                onClick={() => setIsNavOpen(false)}
              >
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="contact-section"
                smooth={true}
                duration={500}
                offset={-90}
                delay={300}
                className="nav-link header-link"
                onClick={() => setIsNavOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
