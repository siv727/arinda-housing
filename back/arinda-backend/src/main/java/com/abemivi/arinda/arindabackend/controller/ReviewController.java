package com.abemivi.arinda.arindabackend.controller;

import com.abemivi.arinda.arindabackend.entity.Review;
import com.abemivi.arinda.arindabackend.repository.ReviewRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listings/{listingId}/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewRepository reviewRepository;
    private final com.abemivi.arinda.arindabackend.repository.ApplicationRepository applicationRepository;
    private final com.abemivi.arinda.arindabackend.repository.ListingRepository listingRepository;
    private final com.abemivi.arinda.arindabackend.repository.UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Review>> getReviews(@PathVariable Long listingId) {
        List<Review> reviews = reviewRepository.findByListingIdOrderByCreatedatDesc(listingId);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping
    public ResponseEntity<?> createReview(
            @PathVariable Long listingId,
            @Valid @RequestBody Review review,
            Authentication authentication) {
        String email = authentication.getName();
        var userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty() || !(userOpt.get() instanceof com.abemivi.arinda.arindabackend.entity.Student student)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only tenants can review listings.");
        }
        var listingOpt = listingRepository.findById(listingId);
        if (listingOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Listing not found.");
        }
        var listing = listingOpt.get();
        // Check if student has booked this listing
        boolean hasBooked = applicationRepository.existsByStudentAndListing(student, listing);
        if (!hasBooked) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You must book this listing before reviewing.");
        }
        // Prevent duplicate reviews
        boolean alreadyReviewed = reviewRepository.existsByListingIdAndStudentId(listingId, student.getId());
        if (alreadyReviewed) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("You have already reviewed this listing.");
        }
        review.setListing(listing);
        review.setStudent(student);
        Review savedReview = reviewRepository.save(review);
        return savedReview != null ? ResponseEntity.status(HttpStatus.CREATED).body(savedReview)
            : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<?> updateReview(
            @PathVariable Long listingId,
            @PathVariable Long reviewId,
            @Valid @RequestBody Review reviewDetails,
            Authentication authentication) {
        String email = authentication.getName();
        var userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty() || !(userOpt.get() instanceof com.abemivi.arinda.arindabackend.entity.Student student)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only tenants can update reviews.");
        }
        var reviewOpt = reviewRepository.findById(reviewId);
        if (reviewOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found.");
        }
        var review = reviewOpt.get();
        if (!review.getStudent().getId().equals(student.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only update your own review.");
        }
        review.setRating(reviewDetails.getRating());
        review.setComment(reviewDetails.getComment());
        Review updatedReview = reviewRepository.save(review);
        return updatedReview != null ? ResponseEntity.ok(updatedReview)
            : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(
            @PathVariable Long listingId,
            @PathVariable Long reviewId,
            Authentication authentication) {
        String email = authentication.getName();
        var userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty() || !(userOpt.get() instanceof com.abemivi.arinda.arindabackend.entity.Student student)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only tenants can delete reviews.");
        }
        var reviewOpt = reviewRepository.findById(reviewId);
        if (reviewOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found.");
        }
        var review = reviewOpt.get();
        if (!review.getStudent().getId().equals(student.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only delete your own review.");
        }
        try {
            reviewRepository.deleteById(reviewId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
