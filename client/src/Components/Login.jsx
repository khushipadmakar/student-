import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

export default function Login({ setToken }) {
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
      const response = await axios.post("http://127.0.0.1:5000/api/login", formData);
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      window.dispatchEvent(new Event("storage"));
      navigate("/predict");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed.");
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <p>Welcome back! Please enter your credentials to continue.</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" name="username" onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} required />

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="auth-footer">
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}
