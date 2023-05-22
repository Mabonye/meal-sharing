import React from "react";
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import "./Header.css";


function Header() {
  return (
    <div className="header-container">
      <div id="header">
        <h1><Link to="/about">Meal Sharing</Link></h1>

        {/* ======= menu ======= */}
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/meals">Meals</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header;