package com.abemivi.arinda.arindabackend.entity;

import com.abemivi.arinda.arindabackend.entity.enums.ListingStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@Table(name = "listing")
@EqualsAndHashCode(exclude = {"leaseterms", "photos", "reviews", "landlord", "applications"})
@ToString(exclude = {"leaseterms", "photos", "reviews", "landlord", "applications"})
public class Listing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String propertytype;

    @Column(nullable = false)
    private String roomtype;

    @OneToMany(mappedBy = "listing", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<LeaseTerm> leaseterms = new HashSet<>();

    @Column(nullable = false)
    private ListingStatus listingstatus;

    @Embedded
    private Location location;

    @Embedded
    private Price price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "landlord_id", nullable = false)
    private Landlord landlord;

    // REFACTORED: Use ElementCollection for simple string lists
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "listing_inclusions", joinColumns = @JoinColumn(name = "listing_id"))
    @Column(name = "name")
    private Set<String> inclusions = new HashSet<>();

    @OneToMany(mappedBy = "listing", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Photo> photos = new HashSet<>();

    // REFACTORED
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "listing_amenities", joinColumns = @JoinColumn(name = "listing_id"))
    @Column(name = "name")
    private Set<String> amenities = new HashSet<>();

    // REFACTORED
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "listing_establishments", joinColumns = @JoinColumn(name = "listing_id"))
    @Column(name = "name")
    private Set<String> establishments = new HashSet<>();

    @OneToMany(mappedBy = "listing", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Review> reviews = new HashSet<>();

    @OneToMany(mappedBy = "listing", fetch = FetchType.LAZY)
    private List<Application> applications = new ArrayList<>();

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