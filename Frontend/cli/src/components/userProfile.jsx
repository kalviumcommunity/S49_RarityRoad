import React, { useState } from 'react';
import axios from 'axios';
import "./userprofile.css"



function UserProfile() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the specified API endpoint
      const Response = await axios.post('http://localhost:3005/postUserData', formData);
      alert('User profile saved successfully!');


      // Fetch the user data after saving
      const userDataResponse = await axios.get('http://localhost:3005/getUserData');
      console.log('User data:', userDataResponse.data);
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };
  

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
          <button type="submit" onClick={handleSubmit} >Save Profile</button>
          <button type="button">Close</button>
        </form>
    </div>
  );
}

export default UserProfile;