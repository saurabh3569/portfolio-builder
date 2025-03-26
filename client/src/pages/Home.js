import React from "react";
import { Link } from "react-router-dom";
import "./css/Home.css";

function Home() {
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
          <Link to="/signup" className="btn btn-primary me-3">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-outline-light">
            Login
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Home;
