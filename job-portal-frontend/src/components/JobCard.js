import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaBriefcase, FaMoneyBillWave } from 'react-icons/fa';
import './JobCard.css';

const jobTypeBadge = { FULL_TIME: 'badge-blue', PART_TIME: 'badge-yellow', CONTRACT: 'badge-purple', INTERNSHIP: 'badge-green', FREELANCE: 'badge-gray' };
const workModeBadge = { ONSITE: 'badge-gray', REMOTE: 'badge-green', HYBRID: 'badge-blue' };

const JobCard = ({ job }) => {
  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr);
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  return (
    <Link to={`/jobs/${job.id}`} className="job-card">
      <div className="job-card-header">
        <div className="company-logo">{job.companyName?.charAt(0).toUpperCase()}</div>
        <div>
          <h3 className="job-title">{job.title}</h3>
          <p className="company-name">{job.companyName}</p>
        </div>
      </div>

      <div className="job-card-meta">
        <span><FaMapMarkerAlt /> {job.location}</span>
        {job.salaryRange && <span><FaMoneyBillWave /> {job.salaryRange}</span>}
        {job.experienceLevel && <span><FaBriefcase /> {job.experienceLevel}</span>}
      </div>

      <div className="job-card-tags">
        {job.jobType && <span className={`badge ${jobTypeBadge[job.jobType] || 'badge-gray'}`}>{job.jobType?.replace('_', ' ')}</span>}
        {job.workMode && <span className={`badge ${workModeBadge[job.workMode] || 'badge-gray'}`}>{job.workMode}</span>}
        <span className="badge badge-gray">{job.category}</span>
      </div>

      <div className="job-card-footer">
        <span className="job-time"><FaClock /> {timeAgo(job.createdAt)}</span>
        <span className="apply-link">View Details →</span>
      </div>
    </Link>
  );
};

export default JobCard;
