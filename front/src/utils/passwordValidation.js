/**
 * Validates password strength
 * Requirements:
 * - At least 8 characters
 * - At least 1 number
 * - At least 1 letter
 * 
 * @param {string} password - The password to validate
 * @returns {Object} - { isValid: boolean, errors: string[] }
 */
export const validatePassword = (password) => {
  const errors = [];

  // Check minimum length
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least 1 number");
  }

  // Check for at least one letter
  if (!/[a-zA-Z]/.test(password)) {
    errors.push("Password must contain at least 1 letter");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Get password strength indicator
 * @param {string} password - The password to check
 * @returns {string} - 'weak', 'medium', or 'strong'
 */
export const getPasswordStrength = (password) => {
  const { isValid } = validatePassword(password);
  
  if (!isValid) return 'weak';
  
  let strength = 0;
  
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
  
  if (strength >= 2) return 'strong';
  if (strength >= 1) return 'medium';
  return 'medium';
};
