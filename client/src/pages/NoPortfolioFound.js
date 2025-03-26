import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/NoPortfolioFound.css";

function NoPortfolioFound() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="no-portfolio-wrapper">
      <img
        src="/logo.jpg"
        alt="Portfolio Logo"
        className="error-logo"
        data-aos="zoom-in"
      />
      <h1 className="error-title" data-aos="fade-down" data-aos-delay="200">
        No Portfolio Found
      </h1>
      <p className="error-message" data-aos="fade-up" data-aos-delay="400">
        Oops! It looks like your portfolio isn’t set up yet or couldn’t be
        loaded.
      </p>
      <button
        className="back-btn"
        onClick={handleBackClick}
        data-aos="fade-up"
        data-aos-delay="600"
      >
        Back to Home
      </button>
    </div>
  );
}

export default NoPortfolioFound;
