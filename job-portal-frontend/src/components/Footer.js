import React from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaGithub, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div className="footer-brand">
        <FaBriefcase />
        <span>JobPortal</span>
        <p>Connecting talent with opportunity.</p>
      </div>
      <div className="footer-links">
        <h4>Quick Links</h4>
        <Link to="/">Home</Link>
        <Link to="/jobs">Browse Jobs</Link>
        <Link to="/register">Get Started</Link>
      </div>
      <div className="footer-social">
        <h4>Connect</h4>
        <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2024 JobPortal. Built with React & Spring Boot.</p>
    </div>
  </footer>
);

export default Footer;
