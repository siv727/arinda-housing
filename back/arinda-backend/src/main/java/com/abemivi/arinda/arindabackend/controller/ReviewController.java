package com.abemivi.arinda.arindabackend.controller;

import com.abemivi.arinda.arindabackend.dto.support.ReviewDetails;
import com.abemivi.arinda.arindabackend.dto.support.ReviewSummary;
import com.abemivi.arinda.arindabackend.entity.Review;
import com.abemivi.arinda.arindabackend.entity.Student;
import com.abemivi.arinda.arindabackend.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/listings/{listingId}/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    /**
     * Get all reviews for a listing (returns DTOs, not entities)
     */
    @GetMapping
    public ResponseEntity<List<ReviewDetails>> getReviews(@PathVariable Long listingId) {
        List<ReviewDetails> reviews = reviewService.getReviewsForListing(listingId);
        return ResponseEntity.ok(reviews);
    }

    /**
     * Get rating summary for a listing (NEW ENDPOINT)
     */
    @GetMapping("/rating")
    public ResponseEntity<ReviewSummary> getListingRating(@PathVariable Long listingId) {
        if (!reviewService.listingExists(listingId)) {
            return ResponseEntity.notFound().build();
        }
        ReviewSummary summary = reviewService.getRatingSummary(listingId);
        return ResponseEntity.ok(summary);
    }

    /**
     * Create a new review
     */
    @PostMapping
    public ResponseEntity<?> createReview(
            @PathVariable Long listingId,
            @Valid @RequestBody Map<String, Object> requestBody,
            Authentication authentication) {

        // Validate user
        String email = authentication.getName();
        Optional<Student> studentOpt = reviewService.findStudentByEmail(email);
        if (studentOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Only tenants can review listings."));
        }
        Student student = studentOpt.get();

        // Validate listing exists
        if (!reviewService.listingExists(listingId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Listing not found."));
        }

        // Prevent duplicate reviews
        if (reviewService.hasStudentReviewed(listingId, student.getId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "You have already reviewed this listing."));
        }

        // Validate that student has an approved application for this listing
        if (!reviewService.hasApprovedApplication(listingId, student)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "You need an approved application to review this property."));
        }

        // Extract rating and comment from request body
        int rating = (int) requestBody.get("rating");
        String comment = (String) requestBody.getOrDefault("comment", "");

        ReviewDetails savedReview = reviewService.createReview(listingId, rating, comment, student);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReview);
    }

    /**
     * Update an existing review
     */
    @PutMapping("/{reviewId}")
    public ResponseEntity<?> updateReview(
            @PathVariable Long listingId,
            @PathVariable Long reviewId,
            @Valid @RequestBody Map<String, Object> requestBody,
            Authentication authentication) {

        // Validate user
        String email = authentication.getName();
        Optional<Student> studentOpt = reviewService.findStudentByEmail(email);
        if (studentOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Only tenants can update reviews."));
        }
        Student student = studentOpt.get();

        // Find the review
        Optional<Review> reviewOpt = reviewService.findById(reviewId);
        if (reviewOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Review not found."));
        }
        Review review = reviewOpt.get();

        // Check ownership
        if (!review.getStudent().getId().equals(student.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "You can only update your own review."));
        }

        // Validate that the review belongs to the specified listing
        if (!review.getListing().getId().equals(listingId)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Review does not belong to this listing."));
        }

        // Extract rating and comment from request body
        int rating = (int) requestBody.get("rating");
        String comment = (String) requestBody.getOrDefault("comment", "");

        ReviewDetails updatedReview = reviewService.updateReview(reviewId, rating, comment);
        return ResponseEntity.ok(updatedReview);
    }

    /**
     * Delete a review
     */
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(
            @PathVariable Long listingId,
            @PathVariable Long reviewId,
            Authentication authentication) {

        // Validate user
        String email = authentication.getName();
        Optional<Student> studentOpt = reviewService.findStudentByEmail(email);
        if (studentOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Only tenants can delete reviews."));
        }
        Student student = studentOpt.get();

        // Find the review
        Optional<Review> reviewOpt = reviewService.findById(reviewId);
        if (reviewOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Review not found."));
        }
        Review review = reviewOpt.get();

        // Check ownership
        if (!review.getStudent().getId().equals(student.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "You can only delete your own review."));
        }

        // Validate that the review belongs to the specified listing
        if (!review.getListing().getId().equals(listingId)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Review does not belong to this listing."));
        }

        reviewService.deleteReview(reviewId);
        return ResponseEntity.noContent().build();
    }
}
