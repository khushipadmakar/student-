import { useState } from "react";
import axios from "axios";
import "./Predict.css";

export default function Predict() {
  const [formData, setFormData] = useState({
    CGPA: "",
    Attendance: "",
    Backlogs: "",
    Coding_Skills: "",
    Projects: "",
    Internships: "",
    Certifications: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, Number(value)])
      );

      const response = await axios.post("http://127.0.0.1:5000/api/predict", formattedData);
      setResult(response.data);
    } catch (error) {
      setResult({ error: "Prediction failed. Please try again." });
    }
    
    setLoading(false);
  };

  return (
    <div className="predict-container">
      <h2>Student Placement Prediction</h2>
      <p>Enter student details to predict placement chances.</p>

      <form className="predict-form" onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="form-group">
            <label>{key.replace("_", " ")}:</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="predict-btn" disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {result && (
        <div className="predict-result">
          <h3>Prediction Result</h3>
          <p>{result.message}</p>

          {result.suggestions && Object.keys(result.suggestions).length > 0 && (
            <div className="improvement-section">
              <h4>Areas to Improve:</h4>
              <ul>
                {Object.entries(result.suggestions).map(([feature, suggestion]) => (
                  <li key={feature}>
                    <strong>{feature.replace("_", " ")}:</strong> {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
