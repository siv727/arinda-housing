package com.abemivi.arinda.arindabackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "leases")
public class Lease {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name="student_id")
    private Student student;
    private LocalDate startDate;
    private LocalDate endDate;
    @Column(name = "document_url")
    private String documentUrl;

    // RELATIONSHIP
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", referencedColumnName = "id", unique = true)
    @ToString.Exclude
    private Application application;
}
