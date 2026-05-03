package com.jobportal.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "jobs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String title;

    @NotBlank
    @Column(nullable = false)
    private String companyName;

    @NotBlank
    private String location;

    @Enumerated(EnumType.STRING)
    private JobType jobType; // FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP

    @Enumerated(EnumType.STRING)
    private WorkMode workMode; // ONSITE, REMOTE, HYBRID

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(columnDefinition = "TEXT")
    private String requirements;

    @Column(columnDefinition = "TEXT")
    private String responsibilities;

    private String salaryRange;

    private String experienceLevel; // Entry, Mid, Senior

    @Column(nullable = false)
    private String category; // e.g. IT, Marketing, Finance

    private LocalDateTime deadline;

    @Enumerated(EnumType.STRING)
    private JobStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "posted_by", nullable = false)
    private User postedBy;

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Application> applications;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public enum JobType {
        FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP, FREELANCE
    }

    public enum WorkMode {
        ONSITE, REMOTE, HYBRID
    }

    public enum JobStatus {
        ACTIVE, CLOSED, DRAFT
    }
}
