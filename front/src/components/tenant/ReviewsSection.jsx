import React, { useState, useEffect } from 'react';
import { getReviews, getRatingSummary, submitReview, updateReview, deleteReview } from '../../api/reviewApi';
import { isAuthenticated, getUserRole } from '../../api/authApi';
import ReviewModal from './ReviewModal';
import ConfirmDialog from '../common/ConfirmDialog';

// Skeleton loader component for reviews
const ReviewSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex gap-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
      <div className="flex-1 space-y-3">
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  </div>
);

// Empty state illustration
const EmptyState = ({ onWriteReview, canReview }) => (
  <div className="text-center py-12">
    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center">
      <i className="fa-solid fa-star text-4xl text-orange-400"></i>
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">No Reviews Yet</h3>
    <p className="text-gray-500 mb-6 max-w-sm mx-auto">
      Be the first to share your experience with this property!
    </p>
    {canReview && (
      <button
        onClick={onWriteReview}
        className="px-6 py-3 bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
      >
        <i className="fa-solid fa-pen mr-2"></i>
        Write a Review
      </button>
    )}
  </div>
);

// Error banner component
const ErrorBanner = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <i className="fa-solid fa-circle-exclamation text-red-500"></i>
      <p className="text-red-700">{message}</p>
    </div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="text-red-600 hover:text-red-800 font-medium text-sm cursor-pointer"
      >
        Try Again
      </button>
    )}
  </div>
);

const ReviewsSection = ({ listing }) => {
  // State
  const [reviews, setReviews] = useState([]);
  const [ratingSummary, setRatingSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [modalError, setModalError] = useState(null);

  // Get current user info from JWT token
  const currentUserEmail = (() => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || payload.email;
    } catch {
      return null;
    }
  })();

  const isLoggedIn = isAuthenticated();
  const userRole = getUserRole();
  const isTenant = userRole === 'STUDENT';

  // Check if user has already reviewed (based on their name matching)
  const userReview = reviews.find(r => {
    // Since we don't have user ID in the review, we check by matching the email from the reviewerId
    // For now, we'll check if the user has already reviewed based on the review list
    // The backend prevents duplicate reviews, so we rely on error handling
    return false; // Will be updated when we have proper user identification
  });

  // Fetch reviews and rating summary
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [reviewsRes, ratingRes] = await Promise.all([
        getReviews(listing.id),
        getRatingSummary(listing.id)
      ]);
      setReviews(reviewsRes.data);
      setRatingSummary(ratingRes.data);
    } catch (err) {
      setError('Failed to load reviews. Please try again.');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [listing.id]);

  // Handle review submission
  const handleSubmitReview = async (data) => {
    setSubmitting(true);
    setModalError(null);
    try {
      if (editingReview) {
        await updateReview(listing.id, editingReview.id, data);
      } else {
        await submitReview(listing.id, data);
      }
      setModalOpen(false);
      setEditingReview(null);
      await fetchData();
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Something went wrong';
      
      // Handle specific error cases - show in modal
      if (err.response?.status === 403) {
        setModalError('You need an approved application to review this property.');
      } else if (err.response?.status === 409) {
        setModalError('You have already reviewed this listing.');
      } else {
        setModalError(errorMsg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Handle edit click
  const handleEdit = (review) => {
    setEditingReview(review);
    setActionError(null);
    setModalOpen(true);
  };

  // Handle delete
  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    
    setSubmitting(true);
    try {
      const reviewToDelete = reviews.find(r => r.id === confirmDeleteId);
      await deleteReview(listing.id, confirmDeleteId);
      setConfirmDeleteId(null);
      await fetchData();
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to delete review';
      setActionError(errorMsg);
      setConfirmDeleteId(null);
    } finally {
      setSubmitting(false);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingReview(null);
    setModalError(null);
  };

  // Helper functions
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fa-solid fa-star text-sm ${
          i < rating ? 'text-yellow-500' : 'text-gray-300'
        }`}
      ></i>
    ));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getRatingPercentage = (count) => {
    const total = ratingSummary?.totalreviews || 0;
    return total > 0 ? (count / total) * 100 : 0;
  };

  const averageRating = ratingSummary?.averagerating || 0;
  const totalReviews = ratingSummary?.totalreviews || reviews.length;

  // Check if current user can review (logged in tenant who hasn't reviewed yet)
  const canReview = isLoggedIn && isTenant;

  // Loading state
  if (loading) {
    return (
      <div>
        <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
        <div className="space-y-6">
          {[1, 2, 3].map(i => <ReviewSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return <ErrorBanner message={error} onRetry={fetchData} />;
  }

  // Empty state
  if (!reviews || reviews.length === 0) {
    return (
      <div>
        <EmptyState 
          onWriteReview={() => setModalOpen(true)} 
          canReview={canReview} 
        />
        
        {/* Action Error */}
        {actionError && (
          <div className="mt-4">
            <ErrorBanner message={actionError} />
          </div>
        )}

        {/* Review Modal */}
        <ReviewModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitReview}
          isSubmitting={submitting}
          externalError={modalError}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
        {averageRating.toFixed(1)} · {totalReviews} review{totalReviews !== 1 ? 's' : ''}
      </h2>

      {/* Action Error */}
      {actionError && (
        <div className="mb-6">
          <ErrorBanner message={actionError} onRetry={() => setActionError(null)} />
        </div>
      )}

      {/* Write Review Button */}
      {canReview && (
        <button
          className="mb-6 px-6 py-2.5 bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-2"
          onClick={() => {
            setActionError(null);
            setModalOpen(true);
          }}
        >
          <i className="fa-solid fa-pen"></i>
          Write a Review
        </button>
      )}

      {/* Rating Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Left side - Rating bars */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-12">{star} star{star !== 1 ? 's' : ''}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gray-900 h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${getRatingPercentage(
                      ratingSummary?.[`${['one','two','three','four','five'][star-1]}starcount`] || 0
                    )}%` 
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-8 text-right">
                {ratingSummary?.[`${['one','two','three','four','five'][star-1]}starcount`] || 0}
              </span>
            </div>
          ))}
        </div>

        {/* Right side - Overall rating */}
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-6">
          <div className="text-5xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex gap-1 mb-2">{renderStars(Math.round(averageRating))}</div>
          <p className="text-sm text-gray-600">Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-200 mb-8" />

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-4 group">
            {/* Reviewer Avatar */}
            <img
              src={review.reviewerprofile || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.reviewername || 'User')}&background=f97316&color=fff`}
              alt={review.reviewername}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />

            {/* Review Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">{review.reviewername}</h4>
                  <p className="text-sm text-gray-500">{formatDate(review.createdat)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">{renderStars(review.rating)}</div>
                  
                  {/* Edit/Delete buttons - always visible for logged in tenants */}
                  {isLoggedIn && isTenant && (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(review)}
                        className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit review"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(review.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete review"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {review.comment && (
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Show more button if many reviews */}
      {totalReviews > 6 && reviews.length < totalReviews && (
        <button className="mt-8 w-full py-3 border border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          Show all {totalReviews} reviews
        </button>
      )}

      {/* Review Modal */}
      <ReviewModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitReview}
        initialRating={editingReview?.rating || 0}
        initialComment={editingReview?.comment || ''}
        isEditing={!!editingReview}
        isSubmitting={submitting}
        externalError={modalError}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!confirmDeleteId}
        title="Delete Review"
        message="Are you sure you want to delete this review? This action cannot be undone."
        confirmText="Delete"
        cancelText="Keep Review"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </div>
  );
};

export default ReviewsSection;
