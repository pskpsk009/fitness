import React, { useState } from "react";
import "./Features.css";

const Feature = ({
  addBmi,
  addActivity,
  addFood,
  addDataset,
  foodHistory = [],
}) => {
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

    // Also create a dataset entry so Charts (if using datasets) sees burned calories
    if (typeof addDataset === "function") {
      const intakeParsed = parseInt(foodCalories, 10);
      const dataset = {
        bmi,
        weight: weight ? Number(weight) : null,
        height: height ? Number(height) : null,
        caloriesBurned: Number.isFinite(cal) ? cal : null,
        // include current foodCalories if user entered it, otherwise null
        caloriesIntake: Number.isFinite(intakeParsed) ? intakeParsed : null,
        timestamp: new Date().toLocaleString(),
      };
      addDataset(dataset);
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

  const handleSaveDataset = () => {
    setError("");
    // require bmi to be present
    if (bmi === null) {
      setError("Calculate BMI first before saving a dataset.");
      return;
    }

    const burned = parseInt(calories, 10);
    const intake = parseInt(foodCalories, 10);

    const dataset = {
      bmi,
      weight: weight ? Number(weight) : null,
      height: height ? Number(height) : null,
      caloriesBurned: Number.isFinite(burned) ? burned : null,
      caloriesIntake: Number.isFinite(intake) ? intake : null,
      timestamp: new Date().toLocaleString(),
    };

    if (typeof addDataset === "function") {
      addDataset(dataset);
      setSavedMessage("Dataset saved.");
      // clear activity and food fields
      setExerciseType("");
      setDuration("");
      setCalories("");
      setFoodType("");
      setFoodCalories("");
    } else {
      // fallback
      // eslint-disable-next-line no-console
      console.log("Saved dataset (no handler):", dataset);
      setSavedMessage("Dataset saved locally (no handler).");
    }
  };

  // Unified save: save activity (if provided), food (if provided), and a combined dataset
  const handleSaveBoth = () => {
    setError("");
    setSavedMessage("");
    setSavedFoodMessage("");

    if (bmi === null) {
      setError("Calculate BMI first before saving entries.");
      return;
    }

    const burned = parseInt(calories, 10);
    const intake = parseInt(foodCalories, 10);
    const dur = parseInt(duration, 10);

    const hasActivityData = !Number.isNaN(burned) || exerciseType.trim() || duration.trim();
    if (hasActivityData) {
      if (!exerciseType.trim()) {
        setError("Please enter an exercise type for activity.");
        return;
      }
      if (!Number.isFinite(dur) || dur <= 0) {
        setError("Please enter a valid duration in minutes (> 0).");
        return;
      }
      if (!Number.isFinite(burned) || burned < 0) {
        setError("Please enter valid calories burned (0 or more).");
        return;
      }
    }

    const hasFoodData = !Number.isNaN(intake) || foodType.trim();
    if (hasFoodData) {
      if (!foodType.trim()) {
        setError("Please enter a food name/type for food entry.");
        return;
      }
      if (!Number.isFinite(intake) || intake < 0) {
        setError("Please enter valid calorie intake (0 or more).");
        return;
      }
    }

    // Save activity if present
    if (hasActivityData && Number.isFinite(burned)) {
      const activityEntry = {
        bmi,
        weight: Number(weight) || null,
        height: Number(height) || null,
        exerciseType: exerciseType.trim(),
        duration: dur,
        calories: burned,
        timestamp: new Date().toLocaleString(),
      };
      if (typeof addActivity === "function") addActivity(activityEntry);
      setSavedMessage("Activity saved.");
    }

    // Save food if present
    if (hasFoodData && Number.isFinite(intake)) {
      const foodEntry = {
        foodType: foodType.trim(),
        calories: intake,
        timestamp: new Date().toLocaleString(),
      };
      if (typeof addFood === "function") addFood(foodEntry);
      setSavedFoodMessage("Food saved.");
    }

    // Save combined dataset
    const dataset = {
      bmi,
      weight: weight ? Number(weight) : null,
      height: height ? Number(height) : null,
      caloriesBurned: Number.isFinite(burned) ? burned : null,
      caloriesIntake: Number.isFinite(intake) ? intake : null,
      timestamp: new Date().toLocaleString(),
    };
    if (typeof addDataset === "function") {
      addDataset(dataset);
      // clear activity/food fields
      setExerciseType("");
      setDuration("");
      setCalories("");
      setFoodType("");
      setFoodCalories("");
    }

    if (!savedMessage && !savedFoodMessage) {
      setSavedMessage("Data saved.");
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

          {/* Unified Save for both activity & food */}
          <div style={{ marginTop: 14 }}>
            <button type="button" className="calc-button" onClick={handleSaveBoth}>
              Save Entry
            </button>
            <button
              type="button"
              className="clear-button"
              onClick={() => {
                setSavedMessage("");
                setSavedFoodMessage("");
              }}
            >
              Clear Messages
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feature;
