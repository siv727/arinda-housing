import React from 'react';

/**
 * Reusable confirmation dialog component
 * Styled consistently with the app's orange gradient theme
 */
const ConfirmDialog = ({ 
  isOpen, 
  title = 'Confirm Action', 
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm, 
  onCancel,
  variant = 'danger' // 'danger' | 'warning' | 'info'
}) => {
  if (!isOpen) return null;

  const getConfirmButtonStyles = () => {
    switch (variant) {
      case 'danger':
        return 'bg-red-500 hover:bg-red-600 text-white';
      case 'warning':
        return 'bg-gradient-to-r from-[#DD4912] to-[#FFA500] text-white hover:opacity-90';
      default:
        return 'bg-gray-800 hover:bg-gray-900 text-white';
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case 'danger':
        return { icon: 'fa-triangle-exclamation', bg: 'bg-red-100', color: 'text-red-500' };
      case 'warning':
        return { icon: 'fa-circle-exclamation', bg: 'bg-orange-100', color: 'text-orange-500' };
      default:
        return { icon: 'fa-circle-info', bg: 'bg-blue-100', color: 'text-blue-500' };
    }
  };

  const iconStyles = getIconStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-[2px]">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm mx-4 animate-in fade-in zoom-in duration-200">
        {/* Icon */}
        <div className={`w-12 h-12 ${iconStyles.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <i className={`fa-solid ${iconStyles.icon} ${iconStyles.color} text-xl`}></i>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
          {title}
        </h3>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors cursor-pointer"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all cursor-pointer ${getConfirmButtonStyles()}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
