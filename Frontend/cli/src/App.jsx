import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from './components/userProfile';
import SignUp from './components/signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="/register" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
