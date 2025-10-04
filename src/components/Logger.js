import React, { useState } from "react";
import "./Logger.css"; // Ensure the correct CSS file is imported

const Logger = () => {
  const [logHistory, setLogHistory] = useState([]);
  const [selectedLogs, setSelectedLogs] = useState({
    first: null,
    second: null,
  });
  const [comparisonResult, setComparisonResult] = useState(null);
  const [newLog, setNewLog] = useState({
    exercise: "",
    duration: "",
    meal: "",
    calories: "",
    weight: "",
    height: "",
    timestamp: "",
  });

  const handleAddLog = () => {
    if (
      !newLog.exercise ||
      !newLog.duration ||
      !newLog.meal ||
      !newLog.calories ||
      !newLog.weight ||
      !newLog.height ||
      !newLog.timestamp
    ) {
      alert("Please fill in all fields.");
      return;
    }
    setLogHistory((prevLogs) => [...prevLogs, newLog]);
    setNewLog({
      exercise: "",
      duration: "",
      meal: "",
      calories: "",
      weight: "",
      height: "",
      timestamp: "",
    });
  };

  const handleCompare = () => {
    const { first, second } = selectedLogs;
    if (
      first === null ||
      second === null ||
      isNaN(first) ||
      isNaN(second) ||
      first === second
    ) {
      setComparisonResult("Please select two different logged entries.");
      return;
    }

    const log1 = logHistory[first];
    const log2 = logHistory[second];

    const parseNumber = (v) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    };

    const w1 = parseNumber(log1.weight);
    const h1 = parseNumber(log1.height);
    const w2 = parseNumber(log2.weight);
    const h2 = parseNumber(log2.height);

    const bmi1 = w1 && h1 ? w1 / (h1 / 100) ** 2 : null;
    const bmi2 = w2 && h2 ? w2 / (h2 / 100) ** 2 : null;

    if (bmi1 == null || bmi2 == null) {
      setComparisonResult("BMI not available for one or both logs.");
      return;
    }

    const diff = parseFloat((bmi1 - bmi2).toFixed(2));
    const recommendation =
      diff > 0
        ? "Consider reducing calorie intake and increasing physical activity."
        : diff < 0
        ? "Great progress! Maintain a balanced diet and regular exercise."
        : "Your BMI is consistent. Keep up the good work!";

    setComparisonResult({
      log1,
      log2,
      bmiDifference: diff.toFixed(2),
      recommendation,
    });
  };

  return (
    <div className="logger-container">
      <h1 className="logger-title">Fitness & Nutrition Tracker</h1>

      <div className="logger-add-log">
        <h2>Add New Log</h2>
        <input
          type="text"
          placeholder="Exercise (e.g., Running)"
          value={newLog.exercise}
          onChange={(e) =>
            setNewLog((prev) => ({ ...prev, exercise: e.target.value }))
          }
          className="logger-input"
        />
        <input
          type="text"
          placeholder="Duration (e.g., 30 mins)"
          value={newLog.duration}
          onChange={(e) =>
            setNewLog((prev) => ({ ...prev, duration: e.target.value }))
          }
          className="logger-input"
        />
        <input
          type="text"
          placeholder="Meal (e.g., Breakfast)"
          value={newLog.meal}
          onChange={(e) =>
            setNewLog((prev) => ({ ...prev, meal: e.target.value }))
          }
          className="logger-input"
        />
        <input
          type="text"
          placeholder="Calories (e.g., 500)"
          value={newLog.calories}
          onChange={(e) =>
            setNewLog((prev) => ({ ...prev, calories: e.target.value }))
          }
          className="logger-input"
        />
        <input
          type="text"
          placeholder="Weight (e.g., 70 kg)"
          value={newLog.weight}
          onChange={(e) =>
            setNewLog((prev) => ({ ...prev, weight: e.target.value }))
          }
          className="logger-input"
        />
        <input
          type="text"
          placeholder="Height (e.g., 170 cm)"
          value={newLog.height}
          onChange={(e) =>
            setNewLog((prev) => ({ ...prev, height: e.target.value }))
          }
          className="logger-input"
        />
        <input
          type="text"
          placeholder="Timestamp (e.g., 2023-10-01 10:00 AM)"
          value={newLog.timestamp}
          onChange={(e) =>
            setNewLog((prev) => ({ ...prev, timestamp: e.target.value }))
          }
          className="logger-input"
        />
        <button onClick={handleAddLog} className="logger-button">
          Add Log
        </button>
      </div>

      <h2>Logged Items</h2>
      <div>
        {logHistory.length > 0 ? (
          logHistory.map((log, index) => (
            <div key={index} className="logger-log-item">
              <h3>Logged Data {index + 1}</h3>
              <p>
                <strong>Exercise:</strong> {log.exercise}
              </p>
              <p>
                <strong>Duration:</strong> {log.duration}
              </p>
              <p>
                <strong>Meal:</strong> {log.meal}
              </p>
              <p>
                <strong>Calories:</strong> {log.calories}
              </p>
              <p>
                <strong>Weight:</strong> {log.weight}
              </p>
              <p>
                <strong>Height:</strong> {log.height}
              </p>
              <p>
                <strong>Timestamp:</strong> {log.timestamp}
              </p>
            </div>
          ))
        ) : (
          <p>No logged items yet.</p>
        )}
      </div>

      {logHistory.length > 1 && (
        <div className="logger-compare-section">
          <h3>Compare BMI</h3>
          <div className="logger-select-container">
            <select
              onChange={(e) => {
                const v = e.target.value;
                setSelectedLogs((prev) => ({
                  ...prev,
                  first: v === "" ? null : parseInt(v, 10),
                }));
              }}
              className="logger-select"
            >
              <option value="">Select First Log</option>
              {logHistory.map((_, index) => (
                <option key={index} value={index}>
                  Logged Data {index + 1}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => {
                const v = e.target.value;
                setSelectedLogs((prev) => ({
                  ...prev,
                  second: v === "" ? null : parseInt(v, 10),
                }));
              }}
              className="logger-select"
            >
              <option value="">Select Second Log</option>
              {logHistory.map((_, index) => (
                <option key={index} value={index}>
                  Logged Data {index + 1}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleCompare} className="logger-button">
            Compare
          </button>
        </div>
      )}

      {comparisonResult && (
        <div className="logger-comparison-result">
          {typeof comparisonResult === "string" ? (
            <p>{comparisonResult}</p>
          ) : (
            <>
              <h3>Comparison Result</h3>
              <p>
                <strong>Log 1 Value:</strong> {comparisonResult.log1.value}
              </p>
              <p>
                <strong>Log 2 Value:</strong> {comparisonResult.log2.value}
              </p>
              <p>
                <strong>BMI Difference:</strong>{" "}
                {comparisonResult.bmiDifference}
              </p>
              <p>
                <strong>Recommendation:</strong>{" "}
                {comparisonResult.recommendation}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Logger;
