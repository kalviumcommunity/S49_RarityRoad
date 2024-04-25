import React from 'react';
import { Link } from 'react-router-dom';
import './signup.css'


function signup() {
  return (
    <div>
        <Link to="/register"><button>Sign Up</button></Link>
        <Link to="/userdata"><button>Data</button></Link>

    </div>
  )
}

export default signup