import React from "react";
import "./css/Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="content-wrapper">
        <h1 className="home-title">Welcome!</h1>
        <p className="home-message">
          You can create your portfolio for free here.
        </p>
        <p className="home-update">
          Work is currently in progress, it will be available very soon!
        </p>
      </div>
    </div>
  );
}

export default Home;
