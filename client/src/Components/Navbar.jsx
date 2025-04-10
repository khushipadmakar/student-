import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './Navbar.css'

export default function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
    };
  
    // Listen to local storage changes
    window.addEventListener("storage", handleStorageChange);
  
    // Also run on mount
    handleStorageChange();
  
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
    navigate("/home");
  };

  return (
    <nav className="navbar">
      <div className="website-name">Student Performance Prediction</div>
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        {token ? (
          <>
            <Link to="/predict">Predict</Link>
            <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup"><button className="btn signup-btn">Sign Up</button></Link>
            <Link to="/login"><button className="btn login-btn">Login</button></Link>
          </>
        )}
      </div>
    </nav>
  );
}
