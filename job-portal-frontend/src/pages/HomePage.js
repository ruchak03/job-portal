import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllJobs } from '../services/api';
import JobCard from '../components/JobCard';
import { FaSearch, FaRocket, FaBriefcase, FaUsers, FaCheckCircle } from 'react-icons/fa';
import './HomePage.css';

const CATEGORIES = ['IT', 'Marketing', 'Finance', 'Design', 'Sales', 'HR', 'Engineering', 'Healthcare'];

const HomePage = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getAllJobs(0, 6)
      .then(res => setFeaturedJobs(res.data.content || []))
      .catch(() => {});
  }, []);

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your <span className="highlight">Dream Job</span> Today</h1>
          <p>Thousands of jobs from top companies. Start your search and land the perfect role.</p>
          <div className="hero-search">
            <div className="search-input-wrap">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Job title, skill, or company..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <Link to={`/jobs${searchQuery ? `?q=${searchQuery}` : ''}`} className="btn-primary">
              Search Jobs
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat"><FaBriefcase /><span><strong>500+</strong> Active Jobs</span></div>
            <div className="stat"><FaUsers /><span><strong>200+</strong> Companies</span></div>
            <div className="stat"><FaCheckCircle /><span><strong>1000+</strong> Hired</span></div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Browse by Category</h2>
            <p>Explore opportunities across industries</p>
          </div>
          <div className="categories-grid">
            {CATEGORIES.map(cat => (
              <Link key={cat} to={`/jobs?category=${cat}`} className="category-chip">
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Latest Job Openings</h2>
            <Link to="/jobs" className="see-all-link">View all →</Link>
          </div>
          {featuredJobs.length > 0 ? (
            <div className="grid-3">
              {featuredJobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          ) : (
            <p className="no-jobs">No jobs available yet. Check back soon!</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container cta-inner">
          <div>
            <h2>Are You an Employer?</h2>
            <p>Post your job openings and find the best talent fast.</p>
          </div>
          <Link to="/register" className="btn-primary">
            <FaRocket /> Post a Job Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
