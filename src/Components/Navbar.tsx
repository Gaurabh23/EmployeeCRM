import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Navbar = () => {
  return (
    <nav className="nav-main">
      <Link to="/" style={{ textDecoration: "none" }}>
        <b className="nav-text">Employee Management System</b>
      </Link>
    </nav>
  );
};

export default Navbar;
