import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";


function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token');
    // enqueueSnackbar('Logged out!', { variant: 'info' });
    navigate('/');
  };
  return (
    <>

      <nav className="navbar">
        {/* Left Side - Website Name */}
        <div className="website-name">
          Student Performance Prediction
        </div>

        {/* Right Side - Navigation Links */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/predict">Predict</Link>
          {!token ? ( <>
              <Link to="/signup">
                <button className="btn signup-btn">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="btn login-btn">Login</button>
              </Link>
            </>
          ) : (
            <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
          )}
        </div>
        
        
      </nav>
    </>
  )
}

export default Navbar