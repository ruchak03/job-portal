import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById, applyForJob } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaMoneyBillWave, FaBuilding } from 'react-icons/fa';
import './JobDetailPage.css';

const JobDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob]               = useState(null);
  const [loading, setLoading]       = useState(true);
  const [applyModal, setApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying]     = useState(false);

  useEffect(() => {
    getJobById(id)
      .then(res => setJob(res.data))
      .catch(() => toast.error('Job not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApply = async () => {
    if (!user) { navigate('/login'); return; }
    setApplying(true);
    try {
      await applyForJob({ jobId: id, coverLetter });
      toast.success('Application submitted successfully! 🎉');
      setApplyModal(false);
    } catch (e) {
      toast.error(e.response?.data || 'Failed to apply');
    }
    setApplying(false);
  };

  if (loading) return <div className="spinner" />;
  if (!job) return <div className="container" style={{padding:'3rem', textAlign:'center'}}>Job not found.</div>;

  return (
    <div className="job-detail-page">
      <div className="container job-detail-layout">

        {/* Main */}
        <article className="job-detail-main card">
          <div className="jd-header">
            <div className="jd-logo">{job.companyName?.charAt(0)}</div>
            <div>
              <h1>{job.title}</h1>
              <p className="jd-company"><FaBuilding /> {job.companyName}</p>
            </div>
          </div>

          <div className="jd-meta">
            <span><FaMapMarkerAlt /> {job.location}</span>
            {job.salaryRange && <span><FaMoneyBillWave /> {job.salaryRange}</span>}
            {job.experienceLevel && <span><FaBriefcase /> {job.experienceLevel}</span>}
            <span><FaClock /> {new Date(job.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="jd-tags">
            {job.jobType  && <span className="badge badge-blue">{job.jobType.replace('_',' ')}</span>}
            {job.workMode && <span className="badge badge-green">{job.workMode}</span>}
            <span className="badge badge-gray">{job.category}</span>
          </div>

          <hr className="jd-divider" />

          <section>
            <h2>Job Description</h2>
            <p>{job.description}</p>
          </section>

          {job.requirements && (
            <section>
              <h2>Requirements</h2>
              <p style={{whiteSpace:'pre-line'}}>{job.requirements}</p>
            </section>
          )}

          {job.responsibilities && (
            <section>
              <h2>Responsibilities</h2>
              <p style={{whiteSpace:'pre-line'}}>{job.responsibilities}</p>
            </section>
          )}
        </article>

        {/* Sidebar */}
        <aside className="job-detail-sidebar">
          <div className="card apply-card">
            <h3>Interested in this role?</h3>
            <p>Apply now before it's too late!</p>
            {user?.role === 'JOB_SEEKER' ? (
              <button className="btn-primary w-full" onClick={() => setApplyModal(true)}>Apply Now</button>
            ) : !user ? (
              <button className="btn-primary w-full" onClick={() => navigate('/login')}>Login to Apply</button>
            ) : (
              <p className="text-muted">Employers cannot apply for jobs.</p>
            )}
          </div>

          {job.deadline && (
            <div className="card sidebar-info">
              <p><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
            </div>
          )}
        </aside>
      </div>

      {/* Apply Modal */}
      {applyModal && (
        <div className="modal-overlay" onClick={() => setApplyModal(false)}>
          <div className="modal-box card" onClick={e => e.stopPropagation()}>
            <h2>Apply for {job.title}</h2>
            <p className="modal-sub">at {job.companyName}</p>
            <div className="form-group">
              <label>Cover Letter (optional)</label>
              <textarea
                rows={6}
                placeholder="Tell the employer why you're a great fit..."
                value={coverLetter}
                onChange={e => setCoverLetter(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setApplyModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleApply} disabled={applying}>
                {applying ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;
