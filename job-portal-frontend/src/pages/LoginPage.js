import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock, FaBriefcase } from 'react-icons/fa';
import './AuthPage.css';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginApi(form);
      login(res.data);
      toast.success(`Welcome back, ${res.data.fullName}!`);
      if (res.data.role === 'EMPLOYER') navigate('/employer/dashboard');
      else navigate('/seeker/dashboard');
    } catch (err) {
      toast.error(err.response?.data || 'Login failed. Please check your credentials.');
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
        <h2>Welcome Back</h2>
        <p className="auth-sub">Sign in to your account to continue</p>

        <form onSubmit={handleSubmit} className="auth-form">
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
              <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
            </div>
          </div>
          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Sign up free</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
