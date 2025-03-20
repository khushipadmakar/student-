import React, { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/signup", formData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed.");
    }
    // await axios.post('http://127.0.0.1:5000/api/signup', formData);
    // alert('Signup Successful! Please login.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input type="text" name="username" onChange={handleChange} placeholder="Username" required />
      <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
      <button type="submit">Signup</button>
    </form>
  );
}
