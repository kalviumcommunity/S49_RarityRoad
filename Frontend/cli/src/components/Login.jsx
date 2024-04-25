import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [local,setLocal] = useState(localStorage.getItem('localuser'))
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to retrieve user data based on the entered email
      const response = await axios.get('http://localhost:3005/getUserData');
      

      console.log(response.data,"fdfdf");
      // Check if a user with the entered email exists in the response data
      const userData = response.data.filter((elem)=>{
           return  elem.email == email && elem.password==password;
      });
      console.log(userData)
      if(userData.length>0){
        console.log("yess",userData[0].Name)
        localStorage.setItem('localuser', userData[0].Name);
        navigate('/data')

      }else{
        console.log("no")                

        alert("Please enter the correct credentials")
      }


    } catch (err) {
      // Handle any errors that occur during the request
      setError('Error logging in. Please try again.');
      console.error(err);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('localuser'); // Remove the user's name from local storage
    navigate('/');
  };

  const isLoggedIn = !!localStorage.getItem('localuser');


  return (
    <div>
    {isLoggedIn ? ( // If the user is logged in, show the sign-out button
      <button type="button" onClick={handleLogOut}>Sign Out</button>
    ): (
       (
        <div>
          <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <div>{error}</div>}
          <button type="submit">Login</button>
          <Link to="/" ><button type="button">Close</button></Link>
        </form>
        </div>
      )
    )}
    </div>
  );


}

export default Login;