package com.abemivi.arinda.arindabackend.service;

import com.abemivi.arinda.arindabackend.dto.support.ReviewDetails;
import com.abemivi.arinda.arindabackend.dto.support.ReviewSummary;
import com.abemivi.arinda.arindabackend.entity.Listing;
import com.abemivi.arinda.arindabackend.entity.Review;
import com.abemivi.arinda.arindabackend.entity.Student;
import com.abemivi.arinda.arindabackend.entity.enums.ApplicationStatus;
import com.abemivi.arinda.arindabackend.repository.ApplicationRepository;
import com.abemivi.arinda.arindabackend.repository.ListingRepository;
import com.abemivi.arinda.arindabackend.repository.ReviewRepository;
import com.abemivi.arinda.arindabackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ListingRepository listingRepository;
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;

    /**
     * Get all reviews for a listing as DTOs (no circular reference)
     */
    public List<ReviewDetails> getReviewsForListing(Long listingId) {
        List<Review> reviews = reviewRepository.findByListingIdOrderByCreatedatDesc(listingId);
        return reviews.stream()
                .map(this::toReviewDetails)
                .collect(Collectors.toList());
    }

    /**
     * Get rating summary for a listing
     */
    public ReviewSummary getRatingSummary(Long listingId) {
        List<Review> reviews = reviewRepository.findByListingId(listingId);
        Double avgRating = reviewRepository.findAverageRatingByListingId(listingId);

        return ReviewSummary.builder()
                .averagerating(avgRating)
                .totalreviews(reviews.size())
                .fivestarcount((int) reviews.stream().filter(r -> r.getRating() == 5).count())
                .fourstarcount((int) reviews.stream().filter(r -> r.getRating() == 4).count())
                .threestarcount((int) reviews.stream().filter(r -> r.getRating() == 3).count())
                .twostarcount((int) reviews.stream().filter(r -> r.getRating() == 2).count())
                .onestarcount((int) reviews.stream().filter(r -> r.getRating() == 1).count())
                .build();
    }

    /**
     * Create a new review and return as DTO
     */
    public ReviewDetails createReview(Long listingId, int rating, String comment, Student student) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        Review review = new Review();
        review.setRating(rating);
        review.setComment(comment);
        review.setListing(listing);
        review.setStudent(student);

        Review savedReview = reviewRepository.save(review);
        return toReviewDetails(savedReview);
    }

    /**
     * Update an existing review and return as DTO
     */
    public ReviewDetails updateReview(Long reviewId, int rating, String comment) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        review.setRating(rating);
        review.setComment(comment);

        Review updatedReview = reviewRepository.save(review);
        return toReviewDetails(updatedReview);
    }

    /**
     * Delete a review
     */
    public void deleteReview(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }

    /**
     * Find a review by ID
     */
    public Optional<Review> findById(Long reviewId) {
        return reviewRepository.findById(reviewId);
    }

    /**
     * Check if student already reviewed this listing
     */
    public boolean hasStudentReviewed(Long listingId, Long studentId) {
        return reviewRepository.existsByListingIdAndStudentId(listingId, studentId);
    }

    /**
     * Check if listing exists
     */
    public boolean listingExists(Long listingId) {
        return listingRepository.existsById(listingId);
    }

    /**
     * Check if student has been a tenant at this listing (for review validation)
     * Allows APPROVED, COMPLETED, or EVICTED tenants to leave reviews
     */
    public boolean hasApprovedApplication(Long listingId, Student student) {
        Listing listing = listingRepository.findById(listingId).orElse(null);
        if (listing == null) {
            return false;
        }
        // Allow current tenants (APPROVED) and past tenants (COMPLETED, EVICTED) to review
        return applicationRepository.existsByStudentAndListingAndStatus(student, listing, ApplicationStatus.APPROVED)
            || applicationRepository.existsByStudentAndListingAndStatus(student, listing, ApplicationStatus.COMPLETED)
            || applicationRepository.existsByStudentAndListingAndStatus(student, listing, ApplicationStatus.EVICTED);
    }

    /**
     * Find student by email
     */
    public Optional<Student> findStudentByEmail(String email) {
        return userRepository.findByEmail(email)
                .filter(user -> user instanceof Student)
                .map(user -> (Student) user);
    }

    /**
     * Convert Review entity to ReviewDetails DTO (breaks circular reference)
     */
    private ReviewDetails toReviewDetails(Review review) {
        String reviewerName = "Anonymous";
        String reviewerProfile = null;

        if (review.getStudent() != null) {
            reviewerName = review.getStudent().getFirstname() + " " + review.getStudent().getLastname();
            // Use student's profile photo if available (assuming getProfilephoto() exists)
            // reviewerProfile = review.getStudent().getProfilephoto();
        }

        return ReviewDetails.builder()
                .id(review.getId())
                .listingId(review.getListing().getId())
                .rating(review.getRating())
                .comment(review.getComment())
                .reviewername(reviewerName)
                .reviewerprofile(reviewerProfile)
                .createdat(review.getCreatedat())
                .build();
    }
}
