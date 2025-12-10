package com.abemivi.arinda.arindabackend.entity;

import com.abemivi.arinda.arindabackend.entity.enums.ApplicationStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Data
@Entity
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String applicantMessage;
    
    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    @Column(name = "move_in_date")
    private LocalDate moveInDate;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) {
            status = ApplicationStatus.PENDING;
        }
    }

    // RELATIONSHIP
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    @ToString.Exclude
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "listing_id")
    @ToString.Exclude
    private Listing listing;

    // inverse side of Lease <-> Application (Lease owns application FK)
    @OneToOne(mappedBy = "application")
    @ToString.Exclude
    private Lease lease;
}
