import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from './components/userProfile';
import SignUp from './components/signup';
import Data from './components/data';
import Navbar from './components/navbar';
import { Link } from 'react-router-dom';
import Login from './components/Login';
import Users from './components/Crud'
import UpdateUser from './components/Userupdate'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/register" element={<UserProfile />} />
        <Route path="/data" element={<Data />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/userdata" element={<Users />}/>
        <Route path="/update/:id" element={<UpdateUser />} />
      </Routes>
    </Router>
  );
}

export default App;