import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <h1>Student Performance Prediction</h1>
        <p>Predict your placement chances and improve your skills!</p>
      </header>

      <div className="buttons">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/signup" className="btn">Signup</Link>
        <Link to="/predict" className="btn">Predict</Link>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>Accurate Predictions</h3>
          <p>Analyze key factors like CGPA, coding skills, and attendance.</p>
        </div>
        <div className="feature-card">
          <h3>Personalized Suggestions</h3>
          <p>Get improvement tips based on your performance.</p>
        </div>
        <div className="feature-card">
          <h3>Career Guidance</h3>
          <p>Enhance your skills with curated learning sessions.</p>
        </div>
      </div>
    </div>
  );
}
