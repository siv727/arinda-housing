package com.abemivi.arinda.arindabackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "reviews")
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

}
