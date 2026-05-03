package com.jobportal.service;

import com.jobportal.entity.Application;
import com.jobportal.entity.Job;
import com.jobportal.entity.User;
import com.jobportal.repository.ApplicationRepository;
import com.jobportal.repository.JobRepository;
import com.jobportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    public Application applyForJob(Long jobId, String coverLetter, String resumeUrl, String applicantEmail) {
        User applicant = userRepository.findByEmail(applicantEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (applicationRepository.existsByJobAndApplicant(job, applicant)) {
            throw new RuntimeException("You have already applied for this job");
        }

        Application application = Application.builder()
                .job(job)
                .applicant(applicant)
                .coverLetter(coverLetter)
                .resumeUrl(resumeUrl)
                .status(Application.ApplicationStatus.PENDING)
                .build();

        return applicationRepository.save(application);
    }

    public List<Application> getMyApplications(String applicantEmail) {
        User applicant = userRepository.findByEmail(applicantEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return applicationRepository.findByApplicant(applicant);
    }

    public List<Application> getApplicationsForJob(Long jobId, String employerEmail) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getPostedBy().getEmail().equals(employerEmail)) {
            throw new RuntimeException("Not authorized");
        }

        return applicationRepository.findByJob(job);
    }

    public Application updateApplicationStatus(Long appId, Application.ApplicationStatus status, String employerEmail) {
        Application application = applicationRepository.findById(appId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        if (!application.getJob().getPostedBy().getEmail().equals(employerEmail)) {
            throw new RuntimeException("Not authorized");
        }

        application.setStatus(status);
        return applicationRepository.save(application);
    }
}
