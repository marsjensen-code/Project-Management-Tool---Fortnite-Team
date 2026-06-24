import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, setUser }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Sample Code Platform</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/issues">GitHub Issues</Link>
        <Link to="/jira">Jira Issues</Link>
        <Link to="/sync">Sync</Link>
      </div>
      <div className="navbar-user">
        {user ? (
          <span>Authenticated</span>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
