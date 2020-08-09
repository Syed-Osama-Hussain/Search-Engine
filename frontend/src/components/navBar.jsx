import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ( {user} ) => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark m-auto">
      <Link className="navbar-brand" to="/">
      <span id="findColor">Find</span><span id="myColor">My</span><span id="wikiColor">Wiki</span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {!user && <React.Fragment>
          <NavLink className="nav-item nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-item nav-link" to="/register">
            Register
          </NavLink>
          </React.Fragment>}
          { user && user.isAdmin && <NavLink className="nav-item nav-link mr-auto" to="/content/index">
          Add Wiki
          </NavLink>}
          {user && <React.Fragment>
          <NavLink className="nav-item nav-link mr-auto" to="/user/history">
          History
          </NavLink>

          <NavLink className="nav-item nav-link mr-auto" to="/logout">
            Logout
          </NavLink>
          </React.Fragment>}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
