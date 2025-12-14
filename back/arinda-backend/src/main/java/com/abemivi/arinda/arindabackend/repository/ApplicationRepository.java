package com.abemivi.arinda.arindabackend.repository;

import java.util.List;
import java.util.Optional;

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
    
    // Find approved application with active lease (lease not yet ended) - blocks until lease ends
    @Query("SELECT a FROM Application a JOIN a.lease l " +
           "WHERE a.student = :student AND a.listing = :listing " +
           "AND a.status = 'APPROVED' AND l.endDate >= CURRENT_DATE")
    Optional<Application> findActiveApprovedApplicationWithLease(@Param("student") Student student, @Param("listing") Listing listing);
    
    // Find all applications for a student-listing pair (handles multiple applications)
    List<Application> findAllByStudentAndListing(Student student, Listing listing);
}
