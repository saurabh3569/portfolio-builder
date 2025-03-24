import React, { useState, useEffect } from "react"; // Add useEffect
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles
import "./css/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      disable: "mobile",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your email or password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card" data-aos="fade-up">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to manage your portfolio</p>

        {error && (
          <div className="alert alert-danger" role="alert" data-aos="fade-up">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label login-label">
              Email
            </label>
            <input
              type="email"
              className="form-control login-input"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label login-label">
              Password
            </label>
            <input
              type="password"
              className="form-control login-input"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn login-btn w-100">
            Sign In
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="login-footer-text">
            Don't have an account?{" "}
            <a href="/signup" className="login-link">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
