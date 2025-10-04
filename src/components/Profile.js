import React from "react";
import "./Profile.css";

const Profile = ({ bmiHistory = [] }) => {
  const last = bmiHistory.length ? bmiHistory[bmiHistory.length - 1] : null;

  const formatNumber = (v, decimals = 1) => {
    if (v == null || v === "") return "N/A";
    const n = Number(v);
    return Number.isFinite(n) ? n.toFixed(decimals) : "N/A";
  };

  return (
    <div className="profile-container">
      <h3>Profile</h3>

      {last ? (
        <div>
          <p>
            Latest BMI: <strong>{last.value ?? "N/A"}</strong>{" "}
            {last.timestamp ? <span>({last.timestamp})</span> : null}
          </p>

          <p>
            Weight:{" "}
            <strong>
              {last.weight != null
                ? `${formatNumber(last.weight, 1)} kg`
                : "N/A"}
            </strong>
          </p>

          <p>
            Height:{" "}
            <strong>
              {last.height != null
                ? `${formatNumber(last.height, 0)} cm`
                : "N/A"}
            </strong>
          </p>
        </div>
      ) : (
        <p>No BMI recorded yet.</p>
      )}
    </div>
  );
};

export default Profile;
