import React from "react";
import "./css/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="home-wrapper">
      <header className="hero-section">
        <img
          src="/logo.jpg"
          alt="Portfolio Logo"
          className="hero-logo"
          data-aos="zoom-in"
        />
        <h1 className="hero-title" data-aos="fade-down" data-aos-delay="200">
          Build Your Portfolio
        </h1>
        <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="400">
          Showcase your skills, experiences, and projects with ease—completely
          free!
        </p>
        <div className="hero-buttons" data-aos="fade-up" data-aos-delay="600">
          <button
            className="back-btn btn-outline-light"
            onClick={handleSignupClick}
            data-aos="fade-up"
            data-aos-delay="600"
          >
            Get Started
          </button>

          <button
            className="back-btn btn-outline-light"
            onClick={handleLoginClick}
            data-aos="fade-up"
            data-aos-delay="600"
          >
            Login
          </button>
        </div>
      </header>
    </div>
  );
}

export default Home;
