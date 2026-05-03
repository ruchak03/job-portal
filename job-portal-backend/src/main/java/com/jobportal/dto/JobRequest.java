package com.jobportal.dto;

import com.jobportal.entity.Job;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class JobRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String companyName;

    @NotBlank
    private String location;

    private Job.JobType jobType;

    private Job.WorkMode workMode;

    @NotBlank
    private String description;

    private String requirements;

    private String responsibilities;

    private String salaryRange;

    private String experienceLevel;

    @NotBlank
    private String category;

    private LocalDateTime deadline;
}
