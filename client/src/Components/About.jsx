import { Link } from "react-router-dom";
import './About.css'

export default function Home(props) {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <h1>Student Performance Prediction</h1>
        <p>Empowering students and educators with AI-driven performance insights.</p>
        <div className="hero-buttons">
            
          <Link to="/predict"><button className="btn primary-btn">Predict Now</button></Link>
          <Link to="/signup"><button className="btn secondary-btn">Sign Up</button></Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Use Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📊 AI-Powered Predictions</h3>
            <p>Get accurate insights based on student performance data.</p>
          </div>
          <div className="feature-card">
            <h3>🔍 Data-Driven Insights</h3>
            <p>Analyze factors affecting student performance.</p>
          </div>
          <div className="feature-card">
            <h3>🚀 Easy to Use</h3>
            <p>Simply enter student details and get predictions instantly.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Predict Student Performance?</h2>
        <p>Start analyzing student progress today!</p>
        <Link to="/predict"><button className="btn primary-btn">Get Started</button></Link>
      </section>
    </div>
  );
}
