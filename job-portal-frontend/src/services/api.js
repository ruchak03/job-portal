import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jobportal_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login    = (data) => api.post('/auth/login', data);

// Jobs
export const getAllJobs   = (page = 0, size = 10) => api.get(`/jobs?page=${page}&size=${size}`);
export const getJobById  = (id) => api.get(`/jobs/${id}`);
export const searchJobs  = (keyword, page = 0) => api.get(`/jobs/search?keyword=${keyword}&page=${page}`);
export const filterJobs  = (params) => api.get('/jobs/filter', { params });
export const postJob     = (data) => api.post('/jobs/post', data);
export const getMyJobs   = () => api.get('/jobs/my-jobs');
export const updateJob   = (id, data) => api.put(`/jobs/${id}`, data);
export const deleteJob   = (id) => api.delete(`/jobs/${id}`);

// Applications
export const applyForJob            = (data) => api.post('/applications/apply', data);
export const getMyApplications      = () => api.get('/applications/my-applications');
export const getJobApplications     = (jobId) => api.get(`/applications/job/${jobId}`);
export const updateApplicationStatus = (appId, status) =>
  api.put(`/applications/${appId}/status`, { status });

export default api;
