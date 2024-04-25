import React, { useState } from 'react';
import axios from 'axios';
import "./userprofile.css"
import { Navigate } from 'react-router-dom';
import './navbar'
import Navbar from './navbar';
import { Link } from 'react-router-dom';




function UserProfile() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the specified API endpoint
      await axios.post('http://localhost:3005/postUserData', formData);
      alert('User profile saved successfully!');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };
  
  if (isSubmitted) {
    return <Navigate to='/data' />;
  }

  return (
    <div>
        <h2>User Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
          <label>Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          <button type="submit">Save Profile</button>
          <button type="button">Close</button>
          <div><h3>If already a user <Link to="/login">Login</Link></h3></div>
        </form>
    </div>
  );
}

export default UserProfile;
