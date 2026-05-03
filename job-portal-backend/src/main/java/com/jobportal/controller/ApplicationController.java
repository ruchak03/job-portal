package com.jobportal.controller;

import com.jobportal.entity.Application;
import com.jobportal.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/apply")
    public ResponseEntity<?> applyForJob(@RequestBody Map<String, Object> body,
                                         Authentication authentication) {
        try {
            Long jobId = Long.valueOf(body.get("jobId").toString());
            String coverLetter = (String) body.getOrDefault("coverLetter", "");
            String resumeUrl = (String) body.getOrDefault("resumeUrl", "");
            Application app = applicationService.applyForJob(jobId, coverLetter, resumeUrl, authentication.getName());
            return ResponseEntity.ok(app);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/my-applications")
    public ResponseEntity<List<Application>> getMyApplications(Authentication authentication) {
        return ResponseEntity.ok(applicationService.getMyApplications(authentication.getName()));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<?> getApplicationsForJob(@PathVariable Long jobId,
                                                   Authentication authentication) {
        try {
            List<Application> apps = applicationService.getApplicationsForJob(jobId, authentication.getName());
            return ResponseEntity.ok(apps);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{appId}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long appId,
                                          @RequestBody Map<String, String> body,
                                          Authentication authentication) {
        try {
            Application.ApplicationStatus status = Application.ApplicationStatus.valueOf(body.get("status"));
            Application app = applicationService.updateApplicationStatus(appId, status, authentication.getName());
            return ResponseEntity.ok(app);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
