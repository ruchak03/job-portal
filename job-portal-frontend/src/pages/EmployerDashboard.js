import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyJobs, deleteJob, getJobApplications, updateApplicationStatus } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaBriefcase, FaPlus, FaTrash, FaUsers, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Dashboard.css';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs]             = useState([]);
  const [loading, setLoading]       = useState(true);
  const [expandedJob, setExpandedJob] = useState(null);
  const [applicantsMap, setApplicantsMap] = useState({});

  useEffect(() => {
    getMyJobs()
      .then(res => setJobs(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (jobId) => {
    if (!window.confirm('Delete this job posting?')) return;
    try {
      await deleteJob(jobId);
      setJobs(jobs.filter(j => j.id !== jobId));
      toast.success('Job deleted');
    } catch (e) {
      toast.error(e.response?.data || 'Delete failed');
    }
  };

  const toggleApplicants = async (jobId) => {
    if (expandedJob === jobId) { setExpandedJob(null); return; }
    setExpandedJob(jobId);
    if (!applicantsMap[jobId]) {
      try {
        const res = await getJobApplications(jobId);
        setApplicantsMap({ ...applicantsMap, [jobId]: res.data });
      } catch (e) {
        toast.error('Could not load applicants');
      }
    }
  };

  const updateStatus = async (appId, status, jobId) => {
    try {
      await updateApplicationStatus(appId, status);
      const updated = applicantsMap[jobId].map(a => a.id === appId ? { ...a, status } : a);
      setApplicantsMap({ ...applicantsMap, [jobId]: updated });
      toast.success('Status updated');
    } catch (e) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Employer Dashboard</h1>
        <p>Manage your job postings and review applicants</p>
      </div>

      <div className="container dashboard-container">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-number">{jobs.length}</div><div className="stat-label">Posted Jobs</div></div>
          <div className="stat-card"><div className="stat-number">{jobs.filter(j => j.status === 'ACTIVE').length}</div><div className="stat-label">Active</div></div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>My Job Postings</h2>
            <Link to="/employer/post-job" className="btn-primary"><FaPlus /> Post New Job</Link>
          </div>

          {loading ? <div className="spinner" /> : jobs.length === 0 ? (
            <div className="empty-state card">
              <FaBriefcase className="empty-icon" />
              <h3>No jobs posted yet</h3>
              <Link to="/employer/post-job" className="btn-primary" style={{marginTop:'1rem'}}>Post Your First Job</Link>
            </div>
          ) : (
            <div className="jobs-manage-list">
              {jobs.map(job => (
                <div key={job.id} className="job-manage-card card">
                  <div className="jm-header">
                    <div>
                      <h3>{job.title}</h3>
                      <p>{job.companyName} · {job.location} · <span className={`badge ${job.status === 'ACTIVE' ? 'badge-green' : 'badge-gray'}`}>{job.status}</span></p>
                    </div>
                    <div className="jm-actions">
                      <button className="btn-icon" onClick={() => toggleApplicants(job.id)} title="View Applicants">
                        <FaUsers /> {expandedJob === job.id ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                      <button className="btn-danger" onClick={() => handleDelete(job.id)} title="Delete Job">
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  {expandedJob === job.id && (
                    <div className="applicants-section">
                      <h4>Applicants</h4>
                      {!applicantsMap[job.id] ? <div className="spinner" /> :
                       applicantsMap[job.id].length === 0 ? <p className="no-applicants">No applications yet.</p> :
                       applicantsMap[job.id].map(app => (
                        <div key={app.id} className="applicant-row">
                          <div>
                            <p className="applicant-name">{app.applicant?.fullName}</p>
                            <p className="applicant-email">{app.applicant?.email}</p>
                            {app.coverLetter && <p className="applicant-cover"><em>"{app.coverLetter.substring(0, 100)}..."</em></p>}
                          </div>
                          <div className="applicant-actions">
                            <span className="badge">{app.status}</span>
                            <select
                              value={app.status}
                              onChange={e => updateStatus(app.id, e.target.value, job.id)}
                              className="status-select"
                            >
                              {['PENDING','REVIEWED','SHORTLISTED','REJECTED','HIRED'].map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
