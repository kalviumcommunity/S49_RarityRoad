import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <nav>
      <div className='login'><Link to="/login">Login</Link></div>
            <div className='login'><Link to="/login">Login</Link></div>

    </nav>
  );
}

export default Navbar;
