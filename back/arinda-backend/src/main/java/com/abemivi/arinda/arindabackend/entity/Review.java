package com.abemivi.arinda.arindabackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "reviews")
@EqualsAndHashCode(exclude = "listing")
@ToString(exclude = "listing")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int rating;

    @Lob
    private String comment;

    // RELATIONSHIP
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "listing_id", nullable = false) // Creates the 'listing_id' column
    private Listing listing;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id") // optional: explicit FK column name
    private Student student;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdat;

    @Column(name = "updated_at")
    private LocalDateTime updatedat;

    @PrePersist
    protected void onCreate() {
        createdat = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedat = LocalDateTime.now();
    }

}
