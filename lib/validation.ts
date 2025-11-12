/**
 * Validation and sanitization utilities
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 255;
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 128;

/**
 * Sanitize and validate name
 */
export function validateName(name: string): ValidationResult {
  const trimmed = name.trim();
  
  if (!trimmed) {
    return { isValid: false, error: 'Name is required' };
  }
  
  if (trimmed.length > MAX_NAME_LENGTH) {
    return { 
      isValid: false, 
      error: `Name must be less than ${MAX_NAME_LENGTH} characters` 
    };
  }
  
  return { isValid: true };
}

/**
 * Sanitize and validate email
 */
export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();
  
  if (!trimmed) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (trimmed.length > MAX_EMAIL_LENGTH) {
    return { 
      isValid: false, 
      error: `Email must be less than ${MAX_EMAIL_LENGTH} characters` 
    };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
}

/**
 * Normalize email (lowercase and trim)
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Sanitize name (trim and limit length)
 */
export function sanitizeName(name: string): string {
  return name.trim().slice(0, MAX_NAME_LENGTH);
}

/**
 * Validate password
 */
export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { 
      isValid: false, 
      error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` 
    };
  }
  
  if (password.length > MAX_PASSWORD_LENGTH) {
    return { 
      isValid: false, 
      error: `Password must be less than ${MAX_PASSWORD_LENGTH} characters` 
    };
  }
  
  return { isValid: true };
}

/**
 * Validate password confirmation
 */
export function validatePasswordConfirmation(
  password: string, 
  confirmPassword: string
): ValidationResult {
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }
  
  return { isValid: true };
}

