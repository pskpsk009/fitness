import React from "react";
import "./Charts.css";

const Charts = ({ activities = [], foodHistory = [] }) => {
  // Calculate totals
  const totalBurned = activities.reduce(
    (s, a) => s + (Number(a.calories) || 0),
    0
  );
  const totalIntake = foodHistory.reduce(
    (s, f) => s + (Number(f.calories) || 0),
    0
  );

  return (
    <div className="charts-container">
      <h3>Calories</h3>

      <section style={{ marginBottom: 18 }}>
        <h4>Calories Burned (Activities)</h4>
        {activities.length === 0 ? (
          <p>No activity records yet.</p>
        ) : (
          <div className="list-grid">
            {activities.map((a, i) => (
              <div key={i} className="list-item">
                <div style={{ fontWeight: 600 }}>
                  {a.exerciseType || "Exercise"}
                </div>
                <div style={{ fontSize: 13, opacity: 0.85 }}>
                  {a.duration} min · {a.calories} kcal
                </div>
                <div style={{ fontSize: 11, opacity: 0.7 }}>{a.timestamp}</div>
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: 8, fontWeight: 700 }}>
          Total burned: {totalBurned} kcal
        </div>
      </section>

      <section>
        <h4>Calorie Intake (Food)</h4>
        {foodHistory.length === 0 ? (
          <p>No food records yet.</p>
        ) : (
          <div className="list-grid">
            {foodHistory.map((f, i) => (
              <div key={i} className="list-item">
                <div style={{ fontWeight: 600 }}>{f.foodType || "Food"}</div>
                <div style={{ fontSize: 13, opacity: 0.85 }}>
                  {f.calories} kcal
                </div>
                <div style={{ fontSize: 11, opacity: 0.7 }}>{f.timestamp}</div>
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: 8, fontWeight: 700 }}>
          Total intake: {totalIntake} kcal
        </div>
      </section>
    </div>
  );
};

export default Charts;
