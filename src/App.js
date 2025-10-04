import React, { useState, useEffect } from "react";
import Login from "./components/Login"; // Ensure this matches the export type
import Advertisement from "./components/Advertisement"; // Ensure this matches the export type
import AdvertisementPopup from "./components/AdvertisementPopup"; // Ensure this matches the export type
import FrontendLogger from "./components/FrontendLogger"; // Ensure this matches the export type
import Logger from "./components/Logger"; // Ensure this matches the export type
import Home from "./components/Home";

const App = () => {
  const [currentStep, setCurrentStep] = useState("popup"); // Manage the current step in the flow
  const [bmiHistory, setBmiHistory] = useState([]);
  const [activities, setActivities] = useState([]);
  const [foodHistory, setFoodHistory] = useState([]);
  const [datasets, setDatasets] = useState([]);

  const addBmi = (entry) => {
    // entry: { value: number, timestamp: string }
    setBmiHistory((prev) => [...prev, entry]);
  };
  const addActivity = (entry) => {
    // entry: { bmi, weight, height, exerciseType, duration, calories, timestamp }
    setActivities((prev) => [...prev, entry]);
  };
  const addFood = (entry) => {
    // entry: { foodType, calories, timestamp }
    setFoodHistory((prev) => [...prev, entry]);
  };

  const addDataset = (entry) => {
    // entry: { bmi, weight, height, caloriesBurned, caloriesIntake, timestamp }
    setDatasets((prev) => [...prev, entry]);
  };

  useEffect(() => {
    console.log("Current step:", currentStep); // Debug log for state transitions
  }, [currentStep]);

  const handlePopupClose = () => {
    console.log("AdvertisementPopup close button pressed"); // Debug log
    setCurrentStep("login"); // Transition to the login step
    console.log("Navigating to login step"); // Debug log
  };

  const handleLogin = () => {
    // After successful login, show a simple choice screen so user can pick Home or the FrontendLogger
    setCurrentStep("postLoginChoice");
  };

  const handleFrontendLoggerComplete = () => {
    setCurrentStep("logger"); // Transition to the Logger step
  };

  return (
    <div>
      {/* Render components based on the current step */}
      {currentStep === "popup" && (
        <AdvertisementPopup
          onClose={() => {
            console.log("onClose callback triggered"); // Debug log
            handlePopupClose();
          }}
        />
      )}
      {currentStep === "login" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px",
            }}
          >
            <Login onLogin={handleLogin} />
          </div>
          <Advertisement />
        </div>
      )}
      {currentStep === "postLoginChoice" && (
        <div style={{ padding: 24, textAlign: "center" }}>
          <h2>Where would you like to go?</h2>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              marginTop: 12,
            }}
          >
            <button
              onClick={() => setCurrentStep("home")}
              style={{
                padding: "10px 18px",
                background: "#3B82F6",
                color: "#fff",
                border: "none",
                borderRadius: 6,
              }}
            >
              Go to Home
            </button>
            <button
              onClick={() => setCurrentStep("frontendLogger")}
              style={{
                padding: "10px 18px",
                background: "#10B981",
                color: "#fff",
                border: "none",
                borderRadius: 6,
              }}
            >
              Go to Frontend Logger
            </button>
            <button
              onClick={() => setCurrentStep("login")}
              style={{
                padding: "10px 18px",
                background: "#EF4444",
                color: "#fff",
                border: "none",
                borderRadius: 6,
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {currentStep === "frontendLogger" && (
        <FrontendLogger
          onComplete={handleFrontendLoggerComplete}
          onBack={() => setCurrentStep("postLoginChoice")}
          onLogout={() => setCurrentStep("login")}
        />
      )}

      {currentStep === "home" && (
        <Home
          onBack={() => setCurrentStep("postLoginChoice")}
          onLogout={() => setCurrentStep("login")}
          bmiHistory={bmiHistory}
          addBmi={addBmi}
          activities={activities}
          addActivity={addActivity}
          foodHistory={foodHistory}
          addFood={addFood}
          datasets={datasets}
          addDataset={addDataset}
        />
      )}

      {currentStep === "logger" && <Logger />}
    </div>
  );
};

export default App;
