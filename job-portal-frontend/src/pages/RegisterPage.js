import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaBuilding, FaBriefcase, FaUserTie } from 'react-icons/fa';
import './AuthPage.css';

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [role, setRole]     = useState('JOB_SEEKER');
  const [form, setForm]     = useState({ fullName: '', email: '', password: '', phone: '', companyName: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerApi({ ...form, role });
      login(res.data);
      toast.success('Account created successfully! 🎉');
      if (role === 'EMPLOYER') navigate('/employer/dashboard');
      else navigate('/seeker/dashboard');
    } catch (err) {
      toast.error(err.response?.data || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-logo">
          <FaBriefcase />
          <span>JobPortal</span>
        </div>
        <h2>Create Account</h2>
        <p className="auth-sub">Join thousands of job seekers and employers</p>

        {/* Role Selector */}
        <div className="role-selector">
          <div className={`role-option ${role === 'JOB_SEEKER' ? 'active' : ''}`} onClick={() => setRole('JOB_SEEKER')}>
            <div className="role-icon"><FaUser /></div>
            Job Seeker
          </div>
          <div className={`role-option ${role === 'EMPLOYER' ? 'active' : ''}`} onClick={() => setRole('EMPLOYER')}>
            <div className="role-icon"><FaUserTie /></div>
            Employer
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-icon-wrap">
              <FaUser className="input-icon" />
              <input type="text" name="fullName" placeholder="John Doe" value={form.fullName} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-icon-wrap">
              <FaEnvelope className="input-icon" />
              <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="input-icon-wrap">
              <FaLock className="input-icon" />
              <input type="password" name="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} required minLength={6} />
            </div>
          </div>
          <div className="form-group">
            <label>Phone (optional)</label>
            <div className="input-icon-wrap">
              <FaPhone className="input-icon" />
              <input type="text" name="phone" placeholder="+1 234 567 890" value={form.phone} onChange={handleChange} />
            </div>
          </div>
          {role === 'EMPLOYER' && (
            <div className="form-group">
              <label>Company Name</label>
              <div className="input-icon-wrap">
                <FaBuilding className="input-icon" />
                <input type="text" name="companyName" placeholder="Acme Corp" value={form.companyName} onChange={handleChange} required />
              </div>
            </div>
          )}
          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
