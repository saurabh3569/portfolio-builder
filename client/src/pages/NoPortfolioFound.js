import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/NoPortfolioFound.css";

function NoPortfolioFound() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="no-portfolio-container">
      <div className="content-wrapper">
        <h1 className="error-title">No Portfolio Found</h1>
        <p className="error-message">
          Oops! It seems like your portfolio isn’t set up yet or couldn’t be
          loaded.
        </p>
        <button className="back-btn" onClick={handleBackClick}>
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NoPortfolioFound;
