import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postJob } from '../services/api';
import toast from 'react-hot-toast';
import './PostJobPage.css';

const CATEGORIES = ['IT', 'Marketing', 'Finance', 'Design', 'Sales', 'HR', 'Engineering', 'Healthcare', 'Education', 'Other'];

const PostJobPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '', companyName: '', location: '', jobType: 'FULL_TIME',
    workMode: 'ONSITE', description: '', requirements: '', responsibilities: '',
    salaryRange: '', experienceLevel: '', category: 'IT', deadline: '',
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postJob({ ...form, deadline: form.deadline || null });
      toast.success('Job posted successfully! 🎉');
      navigate('/employer/dashboard');
    } catch (err) {
      toast.error(err.response?.data || 'Failed to post job');
    }
    setLoading(false);
  };

  return (
    <div className="post-job-page">
      <div className="page-header">
        <h1>Post a New Job</h1>
        <p>Fill in the details to attract the best candidates</p>
      </div>

      <div className="container">
        <form onSubmit={handleSubmit} className="post-job-form card">
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="grid-2">
              <div className="form-group">
                <label>Job Title *</label>
                <input name="title" placeholder="e.g. Senior React Developer" value={form.title} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Company Name *</label>
                <input name="companyName" placeholder="e.g. Acme Corp" value={form.companyName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Location *</label>
                <input name="location" placeholder="e.g. New York, NY" value={form.location} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Job Type</label>
                <select name="jobType" value={form.jobType} onChange={handleChange}>
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="INTERNSHIP">Internship</option>
                  <option value="FREELANCE">Freelance</option>
                </select>
              </div>
              <div className="form-group">
                <label>Work Mode</label>
                <select name="workMode" value={form.workMode} onChange={handleChange}>
                  <option value="ONSITE">Onsite</option>
                  <option value="REMOTE">Remote</option>
                  <option value="HYBRID">Hybrid</option>
                </select>
              </div>
              <div className="form-group">
                <label>Salary Range</label>
                <input name="salaryRange" placeholder="e.g. $60,000 - $80,000" value={form.salaryRange} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Experience Level</label>
                <select name="experienceLevel" value={form.experienceLevel} onChange={handleChange}>
                  <option value="">Any</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Application Deadline</label>
              <input type="datetime-local" name="deadline" value={form.deadline} onChange={handleChange} />
            </div>
          </div>

          <div className="form-section">
            <h3>Job Details</h3>
            <div className="form-group">
              <label>Job Description *</label>
              <textarea name="description" rows={5} placeholder="Describe the role and your company..." value={form.description} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Requirements</label>
              <textarea name="requirements" rows={4} placeholder="List required skills, experience, education..." value={form.requirements} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Responsibilities</label>
              <textarea name="responsibilities" rows={4} placeholder="Describe key responsibilities..." value={form.responsibilities} onChange={handleChange} />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/employer/dashboard')}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Posting...' : 'Publish Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobPage;
