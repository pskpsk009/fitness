import React from "react";
import "./History.css";

const History = ({ bmiHistory = [] }) => {
  return (
    <div className="history-container">
      <h3>History</h3>
      {bmiHistory.length === 0 ? (
        <p>No BMI entries yet.</p>
      ) : (
        <ul>
          {bmiHistory.map((b, i) => (
            <li key={i}>
              {b.timestamp} — BMI: <strong>{b.value}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
