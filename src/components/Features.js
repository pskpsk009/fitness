import React, { useState } from "react";
import "./Features.css";

const Feature = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [error, setError] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();
    setError("");
    setBmi(null);

    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      setError(
        "Please enter valid positive numbers for weight (kg) and height (cm)."
      );
      return;
    }

    const bmiValue = w / (h / 100) ** 2;
    setBmi(Number(bmiValue.toFixed(2)));
  };

  const clearForm = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setError("");
  };

  const category = (val) => {
    if (val == null) return "";
    if (val < 18.5) return "Underweight";
    if (val < 25) return "Normal weight";
    if (val < 30) return "Overweight";
    return "Obesity";
  };

  return (
    <div className="feature-container">
      <h3 className="feature-title">Body Mass Index (BMI) Calculator</h3>

      <form className="bmi-form" onSubmit={calculateBMI}>
        <label className="bmi-label">
          Body weight (kg)
          <input
            className="bmi-input"
            type="number"
            step="any"
            min="0"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 70"
          />
        </label>

        <label className="bmi-label">
          Height (cm)
          <input
            className="bmi-input"
            type="number"
            step="any"
            min="0"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 175"
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="calc-button">
            Calculate BMI
          </button>
          <button type="button" className="clear-button" onClick={clearForm}>
            Clear
          </button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      {bmi !== null && (
        <div className="bmi-result" role="status" aria-live="polite">
          <p>
            Your BMI: <strong>{bmi}</strong>
          </p>
          <p>
            Category: <strong>{category(bmi)}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Feature;
