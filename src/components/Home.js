import React, { useState } from "react";
import "./Home.css";
import Feature from "./Features";
import History from "./History";
import Charts from "./Charts";
import Profile from "./Profile";

const Home = ({ onLogout, onBack }) => {
  const [active, setActive] = useState("Dashboard");

  const tabs = ["Features", "History", "Charts", "Profile"];

  const renderContent = () => {
    switch (active) {
      case "Features":
        return <Feature />;
      case "History":
        return <History />;
      case "Charts":
        return <Charts />;
      case "Profile":
        return <Profile />;
      default:
        return (
          <div className="content-grid">
            <div className="card-sm">Weekly Summary</div>
            <div className="card-sm">Calories</div>
            <div className="card-sm">Workouts</div>
            <div className="card-sm">Progress</div>
          </div>
        );
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="brand-and-nav">
          <div className="brand-block">
            <h1 className="brand">Fit-Track</h1>
            <p className="subtitle">Track progress. Stay healthy.</p>
          </div>

          <nav
            className="top-nav"
            role="navigation"
            aria-label="Main navigation"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`nav-button ${active === tab ? "active" : ""}`}
                onClick={() => setActive(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="header-actions">
          {onBack && (
            <button className="ghost-button" onClick={onBack}>
              Back
            </button>
          )}
          {onLogout && (
            <button className="logout-button" onClick={onLogout}>
              Logout
            </button>
          )}
        </div>
      </header>

      <main className="home-card" role="main">
        <h2 className="view-title">
          {active === "Dashboard" ? "Dashboard" : active}
        </h2>
        <div className="view-content">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Home;
