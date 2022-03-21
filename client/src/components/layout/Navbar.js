import React from 'react'
import { Link } from 'react-router-dom';
const Navbar= ()=> {
    return(
    <nav className="navbar bg-dark">
      <h1>
        <a href='/'><i className="fas fa-code"></i> DevSoc</a>
      </h1>
      <ul>
        <li><a href="!#">Developers</a></li>
        <li><a href='/register'>Register</a></li>
        <li><a href='/login'>Login</a></li>
      </ul>
    </nav>
  );
};
export default Navbar;
