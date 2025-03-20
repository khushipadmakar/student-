
import './App.css';
import { useState } from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Predict from './Components/Predict'
import Login from './Components/Login'
import Signup from './Components/Signup'



function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          {!token ? (<>
            <Route path="/login" element={<Login setToken={setToken}/>} />
            <Route path = "/signup" element = {<Signup />}/>
          </>
          ) : (
            <Route path="/predict" element={<Predict />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
