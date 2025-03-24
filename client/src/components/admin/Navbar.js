import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ user }) {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setIsNavOpen(false);
  };

  const handlePortfolioClick = () => {
    window.open(`/portfolio/${user.username}`, "_blank");
    setIsNavOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <span className="navbar-brand">Admin Dashboard</span>

        {/* Toggler Button for Mobile */}
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

        {/* Collapsible Content */}
        <div
          className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <div className="ms-auto d-flex flex-wrap gap-2">
            <button className="btn btn-primary" onClick={handlePortfolioClick}>
              View Your Portfolio
            </button>
            <button
              className="btn btn-danger logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
