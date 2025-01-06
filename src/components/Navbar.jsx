// src/components/Navbar.js

import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => (
  <nav>
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/favorites">Favorites</NavLink>
      </li>
    </ul>
  </nav>
);

export default Navbar;
