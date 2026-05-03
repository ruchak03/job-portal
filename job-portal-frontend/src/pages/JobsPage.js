import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllJobs, searchJobs, filterJobs } from '../services/api';
import JobCard from '../components/JobCard';
import { FaSearch, FaFilter } from 'react-icons/fa';
import './JobsPage.css';

const CATEGORIES = ['', 'IT', 'Marketing', 'Finance', 'Design', 'Sales', 'HR', 'Engineering', 'Healthcare'];
const JOB_TYPES  = ['', 'FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE'];

const JobsPage = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs]          = useState([]);
  const [loading, setLoading]    = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage]          = useState(0);
  const [keyword, setKeyword]    = useState(searchParams.get('q') || '');
  const [category, setCategory]  = useState(searchParams.get('category') || '');
  const [jobType, setJobType]    = useState('');
  const [location, setLocation]  = useState('');

  const fetchJobs = async (pg = 0) => {
    setLoading(true);
    try {
      let res;
      if (keyword) {
        res = await searchJobs(keyword, pg);
      } else if (category || jobType || location) {
        res = await filterJobs({ category: category || null, jobType: jobType || null, location: location || null, page: pg, size: 9 });
      } else {
        res = await getAllJobs(pg, 9);
      }
      setJobs(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
      setPage(pg);
    } catch (e) {
      setJobs([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchJobs(0); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(0);
  };

  return (
    <div className="jobs-page">
      <div className="page-header">
        <h1>Browse Jobs</h1>
        <p>Find the best opportunities that match your skills</p>
      </div>

      <div className="container jobs-layout">
        {/* Filters Sidebar */}
        <aside className="filters-panel card">
          <h3><FaFilter /> Filters</h3>
          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c || 'All Categories'}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Job Type</label>
            <select value={jobType} onChange={e => setJobType(e.target.value)}>
              {JOB_TYPES.map(t => <option key={t} value={t}>{t ? t.replace('_', ' ') : 'All Types'}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" placeholder="City or Remote" value={location} onChange={e => setLocation(e.target.value)} />
          </div>
          <button className="btn-primary w-full" onClick={() => fetchJobs(0)}>Apply Filters</button>
          <button className="btn-secondary w-full mt-sm" onClick={() => { setCategory(''); setJobType(''); setLocation(''); setKeyword(''); fetchJobs(0); }}>Clear</button>
        </aside>

        {/* Jobs List */}
        <div className="jobs-list">
          <form className="search-bar" onSubmit={handleSearch}>
            <div className="search-input-wrap">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search jobs, companies, skills..."
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary">Search</button>
          </form>

          {loading ? (
            <div className="spinner" />
          ) : jobs.length > 0 ? (
            <>
              <p className="results-count">{jobs.length} job(s) found</p>
              <div className="jobs-grid">
                {jobs.map(job => <JobCard key={job.id} job={job} />)}
              </div>
              {totalPages > 1 && (
                <div className="pagination">
                  <button className="btn-secondary" disabled={page === 0} onClick={() => fetchJobs(page - 1)}>Previous</button>
                  <span>Page {page + 1} of {totalPages}</span>
                  <button className="btn-secondary" disabled={page >= totalPages - 1} onClick={() => fetchJobs(page + 1)}>Next</button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <h3>No jobs found</h3>
              <p>Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
