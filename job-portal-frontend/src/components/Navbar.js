import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBriefcase, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const dashboardPath = user?.role === 'EMPLOYER' ? '/employer/dashboard' : '/seeker/dashboard';

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <FaBriefcase className="brand-icon" />
          <span>JobPortal</span>
        </Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/jobs" className="nav-link" onClick={() => setMenuOpen(false)}>Browse Jobs</Link>

          {user ? (
            <>
              <Link to={dashboardPath} className="nav-link" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              {user.role === 'EMPLOYER' && (
                <Link to="/employer/post-job" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Post a Job
                </Link>
              )}
              <div className="nav-user">
                <span className="nav-username">Hi, {user.fullName?.split(' ')[0]}</span>
                <button className="btn-logout" onClick={handleLogout}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="btn-primary" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
