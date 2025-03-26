import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import "./App.css";
import NoPortfolioFound from "./pages/NoPortfolioFound";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/portfolio/:username" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<NoPortfolioFound />} />
      </Routes>
    </Router>
  );
}

export default App;
