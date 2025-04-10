import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

export default function Signup() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/signup", formData);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed.");
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <p>Create your account to get started with Student Performance Prediction.</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" name="username" onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} required />

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="auth-footer">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
