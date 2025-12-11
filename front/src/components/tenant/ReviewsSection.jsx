import React, { useState, useEffect } from 'react';
import { submitReview } from '../../api/reviewApi';
import ReviewModal from './ReviewModal';

const ReviewsSection = ({ listing }) => {
  // TODO: Replace with actual tenant check
  const isTenantWhoCanReview = true; // Replace with real logic
  const [modalOpen, setModalOpen] = useState(false);
  // Removed unused loading and error state
  const [reviews, setReviews] = useState(listing.reviews || []);
  const [averageRating, setAverageRating] = useState(listing.rating || 0);

  // Fetch reviews and rating from backend
  useEffect(() => {
    async function fetchReviews() {
      try {
        const { default: axiosClient } = await import('../../api/axiosClient');
        const reviewsRes = await axiosClient.get(`/listings/${listing.id}/reviews`);
        setReviews(reviewsRes.data);
        // Optionally fetch average rating from backend
        const ratingRes = await axiosClient.get(`/listings/${listing.id}/reviews/rating`);
        setAverageRating(ratingRes.data.averagerating || 0);
      } catch {
        // Error handling can be added if needed
      }
    }
    fetchReviews();
  }, [listing.id]);
  if (!reviews || reviews.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
          No reviews yet
        </h2>
        <p className="text-gray-600">Be the first to review this property!</p>
        {isTenantWhoCanReview && (
          <button
            className="mt-4 px-6 py-2 bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            Write a Reviews
          </button>
        )}
        <ReviewModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={async (data) => {
            try {
              await submitReview(listing.id, data);
              // Refresh reviews after submission
              const { default: axiosClient } = await import('../../api/axiosClient');
              const reviewsRes = await axiosClient.get(`/listings/${listing.id}/reviews`);
              setReviews(reviewsRes.data);
              const ratingRes = await axiosClient.get(`/listings/${listing.id}/reviews/rating`);
              setAverageRating(ratingRes.data.averagerating || 0);
              setModalOpen(false);
            } catch {
              // Error handling can be added if needed
            }
          }}
        />
      </div>
    )
  }

  // Calculate rating breakdown
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  reviews.forEach((review) => {
    ratingCounts[review.rating] = (ratingCounts[review.rating] || 0) + 1
  })

  const totalReviews = reviews.length;

  const getRatingPercentage = (count) => {
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0
  }

  // Helper function to render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fa-solid fa-star text-sm ${
          i < rating ? 'text-yellow-500' : 'text-gray-300'
        }`}
      ></i>
    ))
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  }

  return (
    <div>
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
        {averageRating.toFixed(1)} · {totalReviews} review{totalReviews !== 1 ? 's' : ''}
      </h2>

      {isTenantWhoCanReview && (
        <button
          className="mb-6 px-6 py-2 bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          Write a Review
        </button>
      )}
      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={async (data) => {
          await submitReview(listing.id, data);
          // Refresh reviews after submission
          const { default: axiosClient } = await import('../../api/axiosClient');
          const reviewsRes = await axiosClient.get(`/listings/${listing.id}/reviews`);
          setReviews(reviewsRes.data);
          const ratingRes = await axiosClient.get(`/listings/${listing.id}/reviews/rating`);
          setAverageRating(ratingRes.data.averagerating || 0);
          setModalOpen(false);
        }}
      />

      {/* Rating Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Left side - Rating bars */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-12">{star} star{star !== 1 ? 's' : ''}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gray-900 h-full rounded-full transition-all"
                  style={{ width: `${getRatingPercentage(ratingCounts[star])}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-8 text-right">{ratingCounts[star]}</span>
            </div>
          ))}
        </div>

        {/* Right side - Overall rating */}
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-6">
          <div className="text-5xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex gap-1 mb-2">{renderStars(Math.round(averageRating))}</div>
          <p className="text-sm text-gray-600">Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-200 mb-8" />

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={review.id || index} className="flex gap-4">
            {/* Reviewer Avatar */}
            <img
              src={review.reviewerprofile || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(review.reviewername || 'User')}
              alt={review.reviewername}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />

            {/* Review Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">{review.reviewername}</h4>
                  <p className="text-sm text-gray-500">{formatDate(review.createdat)}</p>
                </div>
                <div className="flex gap-1">{renderStars(review.rating)}</div>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Show more button if many reviews */}
      {totalReviews > 3 && (
        <button className="mt-6 px-6 py-2 border border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          Show all {totalReviews} reviews
        </button>
      )}
    </div>
  )
}

export default ReviewsSection
