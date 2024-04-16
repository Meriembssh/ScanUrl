// Navbar.js

import React from 'react';
import '../styles/Navbar.css'; // Import CSS file for styling
import logo from './url-scanner-favicon-color.png';

function Navbar() {
  return (
    <nav className="navbar">
      <a href="/">
        <img src={logo} alt="" className="logo"></img>
      </a>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/report">Report</a>
      </div>
    </nav>
  );
}

export default Navbar;
