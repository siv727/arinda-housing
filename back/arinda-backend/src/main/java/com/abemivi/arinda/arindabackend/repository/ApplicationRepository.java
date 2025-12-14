package com.abemivi.arinda.arindabackend.repository;

import java.util.List;
import java.util.Optional;

import com.abemivi.arinda.arindabackend.entity.enums.ApplicationStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.abemivi.arinda.arindabackend.entity.Application;
import com.abemivi.arinda.arindabackend.entity.Landlord;
import com.abemivi.arinda.arindabackend.entity.Listing;
import com.abemivi.arinda.arindabackend.entity.Student;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByStudent(Student student);
    
    // Optimized query with JOIN FETCH to load listing and landlord
    @Query("SELECT a FROM Application a " +
           "JOIN FETCH a.listing l " +
           "JOIN FETCH l.landlord " +
           "WHERE a.student = :student " +
           "ORDER BY a.createdAt DESC")
    List<Application> findByStudentWithDetails(@Param("student") Student student);
    
    boolean existsByStudentAndListing(Student student, Listing listing);
    Optional<Application> findByStudentAndListing(Student student, Listing listing);
    
    @Query("SELECT a FROM Application a WHERE a.student = :student AND a.listing = :listing AND a.status = 'REJECTED' ORDER BY a.updatedAt DESC")
    Optional<Application> findMostRecentRejectedApplication(@Param("student") Student student, @Param("listing") Listing listing);
    
    @Query("SELECT a FROM Application a WHERE a.listing.landlord = :landlord ORDER BY a.createdAt DESC")
    List<Application> findByListingLandlord(@Param("landlord") Landlord landlord);
    
    // Check if student has an approved application for a listing (for review validation)
    boolean existsByStudentAndListingAndStatus(Student student, Listing listing, com.abemivi.arinda.arindabackend.entity.enums.ApplicationStatus status);
    
    // Find pending application for eligibility check
    @Query("SELECT a FROM Application a WHERE a.student = :student AND a.listing = :listing AND a.status = 'PENDING'")
    Optional<Application> findPendingApplication(@Param("student") Student student, @Param("listing") Listing listing);
    
    // Find approved application with active lease (lease status is ACTIVE) - blocks until lease ends
    @Query("SELECT a FROM Application a JOIN a.lease l " +
           "WHERE a.student = :student AND a.listing = :listing " +
           "AND a.status = 'APPROVED' AND l.leaseStatus = 'ACTIVE'")
    Optional<Application> findActiveApprovedApplicationWithLease(@Param("student") Student student, @Param("listing") Listing listing);

    // 1. Stats Counts (Using the relationship path listing.landlord.id)
    long countByListingLandlordId(Long landlordId);

    long countByListingLandlordIdAndStatus(Long landlordId, ApplicationStatus status);

    // 2. Get Top 3 Recent Applications (Fetching Student and Listing details eagerly)
    @EntityGraph(attributePaths = {"student", "listing"})
    List<Application> findTop3ByListingLandlordIdOrderByCreatedAtDesc(Long landlordId);

    // Find all applications for a student-listing pair (handles multiple applications)
    List<Application> findAllByStudentAndListing(Student student, Listing listing);
}
