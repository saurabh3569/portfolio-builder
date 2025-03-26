import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";
import AOS from "aos";
import "aos/dist/aos.css";
import "./css/Login.css";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    // phone: "",
    // location: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      disable: "mobile",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await signup(formData);
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError("Signup failed. Please check your details and try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card" data-aos="fade-up">
        <h2 className="login-title">Create Account</h2>
        <p className="login-subtitle">
          Sign up to start managing your portfolio
        </p>

        {error && (
          <div className="alert alert-danger" role="alert" data-aos="fade-up">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label login-label">
              Name
            </label>
            <input
              type="text"
              className="form-control login-input"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label login-label">
              Username
            </label>
            <input
              type="text"
              className="form-control login-input"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label login-label">
              Email
            </label>
            <input
              type="email"
              className="form-control login-input"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label login-label">
              Password
            </label>
            <input
              type="password"
              className="form-control login-input"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="mb-3">
            <label htmlFor="phone" className="form-label login-label">
              Phone
            </label>
            <input
              type="tel"
              className="form-control login-input"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label login-label">
              Location
            </label>
            <input
              type="text"
              className="form-control login-input"
              id="location"
              name="location"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div> */}
          <button type="submit" className="btn login-btn w-100">
            Sign Up
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="login-footer-text">
            Already have an account?{" "}
            <a href="/login" className="login-link">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
