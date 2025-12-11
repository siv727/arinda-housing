import { useState, useEffect } from 'react';

const ReviewModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialRating = 0, 
  initialComment = '',
  isEditing = false,
  isSubmitting = false,
  externalError = null 
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState(initialComment);
  const [error, setError] = useState('');

  // Reset form when modal opens/closes or initial values change
  useEffect(() => {
    if (isOpen) {
      setRating(initialRating);
      setComment(initialComment);
      setError('');
      setHoverRating(0);
    }
  }, [isOpen, initialRating, initialComment]);

  const handleStarClick = (star) => {
    setRating(star);
    setError('');
  };

  const handleStarHover = (star) => {
    setHoverRating(star);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) {
      setError('Please select a star rating.');
      return;
    }
    onSubmit({ rating, comment });
  };

  // Get the label text for current hover/rating
  const getRatingLabel = (value) => {
    const labels = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    };
    return labels[value] || '';
  };

  const displayRating = hoverRating || rating;
  const displayError = externalError || error;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-[2px]">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            {isEditing ? 'Edit Your Review' : 'Write a Review'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            disabled={isSubmitting}
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Star Rating */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Your Rating
            </label>
            <div className="flex items-center gap-4">
              <div 
                className="flex gap-1"
                onMouseLeave={handleStarLeave}
              >
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    className={`text-3xl transition-all duration-150 cursor-pointer hover:scale-110 ${
                      star <= displayRating 
                        ? 'text-yellow-400 drop-shadow-sm' 
                        : 'text-gray-300 hover:text-yellow-200'
                    }`}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                    style={{ background: 'none', border: 'none', padding: '2px' }}
                    disabled={isSubmitting}
                  >
                    <i className="fa-solid fa-star"></i>
                  </button>
                ))}
              </div>
              {displayRating > 0 && (
                <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {getRatingLabel(displayRating)}
                </span>
              )}
            </div>
          </div>

          {/* Error Message */}
          {displayError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation text-red-500"></i>
              <p className="text-red-600 text-sm">{displayError}</p>
            </div>
          )}

          {/* Comment Textarea */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all"
              rows={4}
              placeholder="Share your experience with this property..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors cursor-pointer disabled:opacity-50"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white font-bold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Submitting...
                </>
              ) : (
                isEditing ? 'Update Review' : 'Submit Review'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
