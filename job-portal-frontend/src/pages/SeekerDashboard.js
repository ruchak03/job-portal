import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyApplications } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaBriefcase, FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaStar } from 'react-icons/fa';
import './Dashboard.css';

const statusConfig = {
  PENDING:     { label: 'Pending',     badge: 'badge-yellow', icon: <FaHourglassHalf /> },
  REVIEWED:    { label: 'Reviewed',    badge: 'badge-blue',   icon: <FaBriefcase /> },
  SHORTLISTED: { label: 'Shortlisted', badge: 'badge-green',  icon: <FaStar /> },
  REJECTED:    { label: 'Rejected',    badge: 'badge-red',    icon: <FaTimesCircle /> },
  HIRED:       { label: 'Hired!',      badge: 'badge-green',  icon: <FaCheckCircle /> },
};

const SeekerDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    getMyApplications()
      .then(res => setApplications(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const counts = {
    total:       applications.length,
    pending:     applications.filter(a => a.status === 'PENDING').length,
    shortlisted: applications.filter(a => a.status === 'SHORTLISTED').length,
    hired:       applications.filter(a => a.status === 'HIRED').length,
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Welcome, {user?.fullName}!</h1>
        <p>Track all your job applications in one place</p>
      </div>

      <div className="container dashboard-container">
        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-number">{counts.total}</div><div className="stat-label">Total Applied</div></div>
          <div className="stat-card"><div className="stat-number">{counts.pending}</div><div className="stat-label">Pending</div></div>
          <div className="stat-card highlight-stat"><div className="stat-number">{counts.shortlisted}</div><div className="stat-label">Shortlisted</div></div>
          <div className="stat-card success-stat"><div className="stat-number">{counts.hired}</div><div className="stat-label">Hired</div></div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>My Applications</h2>
            <Link to="/jobs" className="btn-primary">Browse More Jobs</Link>
          </div>

          {loading ? <div className="spinner" /> : applications.length === 0 ? (
            <div className="empty-state card">
              <FaBriefcase className="empty-icon" />
              <h3>No applications yet</h3>
              <p>Start applying to jobs to track your progress here.</p>
              <Link to="/jobs" className="btn-primary" style={{marginTop:'1rem'}}>Find Jobs</Link>
            </div>
          ) : (
            <div className="applications-list">
              {applications.map(app => {
                const cfg = statusConfig[app.status] || statusConfig.PENDING;
                return (
                  <div key={app.id} className="application-row card">
                    <div className="app-company-logo">{app.job?.companyName?.charAt(0)}</div>
                    <div className="app-info">
                      <h4>{app.job?.title}</h4>
                      <p>{app.job?.companyName} · {app.job?.location}</p>
                      <p className="app-date">Applied: {new Date(app.appliedAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`badge ${cfg.badge}`} style={{display:'flex',alignItems:'center',gap:'0.3rem'}}>
                      {cfg.icon} {cfg.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeekerDashboard;
