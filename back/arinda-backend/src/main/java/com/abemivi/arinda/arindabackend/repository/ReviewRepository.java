package com.abemivi.arinda.arindabackend.repository;

import com.abemivi.arinda.arindabackend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Find all reviews for a listing
    List<Review> findByListingId(Long listingId);

    // Find reviews by student
    List<Review> findByStudentId(Long studentId);

    // Calculate average rating for specific listing
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.listing.id = :listingId")
    Double findAverageRatingByListingId(@Param("listingId") Long listingId);

    // Count reviews for specific listing
    long countByListingId(Long listingId);

    // Find reviews ordered by date (newest first)
    List<Review> findByListingIdOrderByCreatedatDesc(Long listingId);

    // Find reviews by rating
    List<Review> findByListingIdAndRating(Long listingId, int rating);

    // Check if student has already reviewed a listing
    boolean existsByListingIdAndStudentId(Long listingId, Long studentId);
}
