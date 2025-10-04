import React from "react";
import "./History.css";

const History = ({ bmiHistory = [], datasets = [] }) => {
  if (datasets && datasets.length > 0) {
    return (
      <div className="history-container">
        <h3>Dataset History</h3>
        <ol>
          {datasets.map((d, i) => (
            <li key={i} style={{ marginBottom: 8 }}>
              <strong>Data {i + 1}</strong> — BMI: {d.bmi ?? "N/A"}{" "}
              {d.weight ? `(${d.weight} kg, ${d.height} cm)` : ""}
              <div>
                Calories burned:{" "}
                {d.caloriesBurned != null ? d.caloriesBurned + " kcal" : "N/A"}
              </div>
              <div>
                Calorie intake:{" "}
                {d.caloriesIntake != null ? d.caloriesIntake + " kcal" : "N/A"}
              </div>
              <div style={{ fontSize: 12, color: "#cbd5e1" }}>
                {d.timestamp}
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }

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
