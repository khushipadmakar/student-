import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Predict from "./Components/Predict";
import About from "./Components/About"

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/About" element={<About Token = {token}/>} />
          {!token ? (
            <>
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          ) : (
            <>
              <Route path="/predict" element={<Predict />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}
