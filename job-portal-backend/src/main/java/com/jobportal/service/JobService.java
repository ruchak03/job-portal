package com.jobportal.service;

import com.jobportal.dto.JobRequest;
import com.jobportal.entity.Job;
import com.jobportal.entity.User;
import com.jobportal.repository.JobRepository;
import com.jobportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    public Job postJob(JobRequest request, String employerEmail) {
        User employer = userRepository.findByEmail(employerEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Job job = Job.builder()
                .title(request.getTitle())
                .companyName(request.getCompanyName())
                .location(request.getLocation())
                .jobType(request.getJobType())
                .workMode(request.getWorkMode())
                .description(request.getDescription())
                .requirements(request.getRequirements())
                .responsibilities(request.getResponsibilities())
                .salaryRange(request.getSalaryRange())
                .experienceLevel(request.getExperienceLevel())
                .category(request.getCategory())
                .deadline(request.getDeadline())
                .status(Job.JobStatus.ACTIVE)
                .postedBy(employer)
                .build();

        return jobRepository.save(job);
    }

    public Page<Job> getAllActiveJobs(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return jobRepository.findByStatus(Job.JobStatus.ACTIVE, pageable);
    }

    public Page<Job> searchJobs(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return jobRepository.searchByKeyword(keyword, pageable);
    }

    public Page<Job> filterJobs(String category, String jobType, String location, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return jobRepository.findWithFilters(category, jobType, location, pageable);
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
    }

    public List<Job> getMyPostedJobs(String employerEmail) {
        User employer = userRepository.findByEmail(employerEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return jobRepository.findByPostedBy(employer);
    }

    public Job updateJob(Long jobId, JobRequest request, String employerEmail) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getPostedBy().getEmail().equals(employerEmail)) {
            throw new RuntimeException("You are not authorized to update this job");
        }

        job.setTitle(request.getTitle());
        job.setCompanyName(request.getCompanyName());
        job.setLocation(request.getLocation());
        job.setJobType(request.getJobType());
        job.setWorkMode(request.getWorkMode());
        job.setDescription(request.getDescription());
        job.setRequirements(request.getRequirements());
        job.setResponsibilities(request.getResponsibilities());
        job.setSalaryRange(request.getSalaryRange());
        job.setExperienceLevel(request.getExperienceLevel());
        job.setCategory(request.getCategory());
        job.setDeadline(request.getDeadline());

        return jobRepository.save(job);
    }

    public void deleteJob(Long jobId, String employerEmail) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getPostedBy().getEmail().equals(employerEmail)) {
            throw new RuntimeException("You are not authorized to delete this job");
        }

        jobRepository.delete(job);
    }
}
