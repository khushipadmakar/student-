import React, { useState } from 'react';
import axios from 'axios';

 function Login({ setToken }) {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await axios.post('http://127.0.0.1:5000/api/login', formData);
    // if (response.data.token) {
      // localStorage.setItem('token', response.data.token);
      // setToken(response.data.token);
    // }

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/login", formData);
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      alert(error.response?.data?.message || "Login failed.");
    }
   };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="text" name="username" onChange={handleChange} placeholder="Username" required />
      <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}


export default Login