import React, { useState } from "react";
import "./Features.css";

const Feature = ({ addBmi, addActivity, addFood, foodHistory = [] }) => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [error, setError] = useState("");

  // Activity fields
  const [exerciseType, setExerciseType] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  // Food fields
  const [foodType, setFoodType] = useState("");
  const [foodCalories, setFoodCalories] = useState("");
  const [savedFoodMessage, setSavedFoodMessage] = useState("");

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
    const final = Number(bmiValue.toFixed(2));
    setBmi(final);
    if (typeof addBmi === "function") {
      addBmi({
        value: final,
        weight: Number(w),
        height: Number(h),
        timestamp: new Date().toLocaleString(),
      });
    }
  };

  const clearForm = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setError("");
    setExerciseType("");
    setDuration("");
    setCalories("");
    setSavedMessage("");
    setFoodType("");
    setFoodCalories("");
    setSavedFoodMessage("");
  };

  const handleSaveActivity = () => {
    setError("");
    setSavedMessage("");

    if (bmi === null) {
      setError("Calculate BMI first before saving an activity.");
      return;
    }

    if (!exerciseType.trim()) {
      setError("Please enter an exercise type.");
      return;
    }

    const dur = parseInt(duration, 10);
    const cal = parseInt(calories, 10);

    if (!Number.isFinite(dur) || dur <= 0) {
      setError("Please enter a valid duration in minutes (> 0).");
      return;
    }

    if (!Number.isFinite(cal) || cal < 0) {
      setError("Please enter valid calories burned (0 or more).");
      return;
    }

    const entry = {
      bmi,
      weight: Number(weight) || null,
      height: Number(height) || null,
      exerciseType: exerciseType.trim(),
      duration: dur,
      calories: cal,
      timestamp: new Date().toLocaleString(),
    };

    if (typeof addActivity === "function") {
      addActivity(entry);
      setSavedMessage("Activity saved.");
      setExerciseType("");
      setDuration("");
      setCalories("");
    } else {
      // fallback: log to console
      // eslint-disable-next-line no-console
      console.log("Saved activity (no addActivity provided):", entry);
      setSavedMessage("Activity saved locally (no handler).");
      setExerciseType("");
      setDuration("");
      setCalories("");
    }
  };

  const handleSaveFood = () => {
    setError("");
    setSavedFoodMessage("");

    if (!foodType.trim()) {
      setError("Please enter a food name or type.");
      return;
    }

    const cal = parseInt(foodCalories, 10);
    if (!Number.isFinite(cal) || cal < 0) {
      setError("Please enter valid calories for the food (0 or more).");
      return;
    }

    const entry = {
      foodType: foodType.trim(),
      calories: cal,
      timestamp: new Date().toLocaleString(),
    };

    if (typeof addFood === "function") {
      addFood(entry);
      setSavedFoodMessage("Food saved.");
      setFoodType("");
      setFoodCalories("");
    } else {
      // fallback: log to console
      // eslint-disable-next-line no-console
      console.log("Saved food (no addFood provided):", entry);
      setSavedFoodMessage("Food saved locally (no handler).");
      setFoodType("");
      setFoodCalories("");
    }
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

          <div className="activity-section" style={{ marginTop: 12 }}>
            <label className="bmi-label">
              Exercise type
              <input
                className="bmi-input"
                type="text"
                value={exerciseType}
                onChange={(e) => setExerciseType(e.target.value)}
                placeholder="e.g. Running"
              />
            </label>

            <label className="bmi-label">
              Duration (minutes)
              <input
                className="bmi-input"
                type="number"
                min="0"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 30"
              />
            </label>

            <label className="bmi-label">
              Calories burned
              <input
                className="bmi-input"
                type="number"
                min="0"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="e.g. 250"
              />
            </label>

            <div className="form-actions" style={{ marginTop: 8 }}>
              {/* Save Activity button removed per request; keep Clear Activity */}
              <button
                type="button"
                className="clear-button"
                onClick={() => {
                  setExerciseType("");
                  setDuration("");
                  setCalories("");
                  setSavedMessage("");
                }}
              >
                Clear Activity
              </button>
            </div>

            {savedMessage && (
              <p className="success" style={{ marginTop: 8 }}>
                {savedMessage}
              </p>
            )}
          </div>
          <div className="food-section" style={{ marginTop: 18 }}>
            <h4>Log Food</h4>

            <label className="bmi-label">
              Food / Meal
              <input
                className="bmi-input"
                type="text"
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
                placeholder="e.g. Sandwich"
              />
            </label>

            <label className="bmi-label">
              Calories
              <input
                className="bmi-input"
                type="number"
                min="0"
                value={foodCalories}
                onChange={(e) => setFoodCalories(e.target.value)}
                placeholder="e.g. 450"
              />
            </label>

            <div className="form-actions" style={{ marginTop: 8 }}>
              <button
                type="button"
                className="calc-button"
                onClick={handleSaveFood}
              >
                Save Food
              </button>
              <button
                type="button"
                className="clear-button"
                onClick={() => {
                  setFoodType("");
                  setFoodCalories("");
                  setSavedFoodMessage("");
                }}
              >
                Clear Food
              </button>
            </div>

            {savedFoodMessage && (
              <p className="success" style={{ marginTop: 8 }}>
                {savedFoodMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Feature;
