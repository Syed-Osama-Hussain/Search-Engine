import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ( {user} ) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        FindMyWiki
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
          { user && user.isAdmin && <NavLink className="nav-item nav-link" to="/content/index">
          Add Wiki
          </NavLink>}
          {user && <React.Fragment>
          <NavLink className="nav-item nav-link" to="/user/history">
          History
          </NavLink>

          <NavLink className="nav-item nav-link" to="/logout">
            Logout
          </NavLink>
          </React.Fragment>}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
