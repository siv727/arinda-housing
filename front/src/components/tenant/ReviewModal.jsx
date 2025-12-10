import { useState } from 'react';

const ReviewModal = ({ isOpen, onClose, onSubmit, initialRating = 0, initialComment = '' }) => {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);
  const [error, setError] = useState('');

  const handleStarClick = (star) => {
    setRating(star);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) {
      setError('Please select a star rating.');
      return;
    }
    onSubmit({ rating, comment });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-[2px]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex gap-2">
            {[1,2,3,4,5].map(star => (
              <button
                type="button"
                key={star}
                className={`text-2xl fa-solid fa-star ${star <= rating ? 'text-yellow-500' : 'text-gray-300'} cursor-pointer`}
                onClick={() => handleStarClick(star)}
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                style={{ background: 'none', border: 'none', padding: 0 }}
              >
              </button>
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none mb-4"
            rows={4}
            placeholder="Share your experience (optional)"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white font-bold hover:opacity-90 cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
