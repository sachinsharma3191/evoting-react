import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="header">
      <div className="navigationclass row">
        <ul className="navbar-nav" id="navg">
          <li className="nav-item">
            <Link to="/Register">
              <a className="nav-link register" id="reg">
                Register
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Login">
              <a className="nav-link" id="log">
                Login
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Election">
              <a className="nav-link" id="log">
                Election
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Result">
              <a className="nav-link" id="log">
                Result
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link active" id="hom">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className=" brand">Electronic</a>
          </li>
          <li className="nav-item">
            <a className="colorb">Ballot</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
