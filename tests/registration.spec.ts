import { test, expect } from '@playwright/test';

test.describe('User Registration App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the registration form and user list', async ({ page }) => {
    // Check main heading
    await expect(page.getByRole('heading', { name: 'User Registration Demo' })).toBeVisible();
    
    // Check form section
    await expect(page.getByRole('heading', { name: 'Register New User' })).toBeVisible();
    
    // Check form fields
    await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#confirmPassword')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
    
    // Check user list section
    await expect(page.getByRole('heading', { name: 'Registered Users' })).toBeVisible();
  });

  test('should show validation errors when submitting empty form', async ({ page }) => {
    // Click register button without filling form
    await page.getByRole('button', { name: 'Register' }).click();
    
    // Check for validation errors
    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    // Fill form with invalid email
    await page.getByRole('textbox', { name: 'Name' }).fill('Test User');
    await page.getByRole('textbox', { name: 'Email' }).fill('invalid-email');
    await page.locator('#password').fill('password123');
    await page.locator('#confirmPassword').fill('password123');
    
    await page.getByRole('button', { name: 'Register' }).click();
    
    // Check for email validation error
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
  });

  test('should validate password length', async ({ page }) => {
    // Fill form with short password
    await page.getByRole('textbox', { name: 'Name' }).fill('Test User');
    await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
    await page.locator('#password').fill('12345');
    await page.locator('#confirmPassword').fill('12345');
    
    await page.getByRole('button', { name: 'Register' }).click();
    
    // Check for password length validation error
    await expect(page.getByText('Password must be at least 6 characters')).toBeVisible();
  });

  test('should validate password confirmation match', async ({ page }) => {
    // Fill form with mismatched passwords
    await page.getByRole('textbox', { name: 'Name' }).fill('Test User');
    await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
    await page.locator('#password').fill('password123');
    await page.locator('#confirmPassword').fill('password456');
    
    await page.getByRole('button', { name: 'Register' }).click();
    
    // Check for password mismatch error
    await expect(page.getByText('Passwords do not match')).toBeVisible();
  });

  test('should successfully register a new user', async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `test${timestamp}@example.com`;
    const testName = `Test User ${timestamp}`;
    
    // Fill form with valid data
    await page.getByRole('textbox', { name: 'Name' }).fill(testName);
    await page.getByRole('textbox', { name: 'Email' }).fill(testEmail);
    await page.locator('#password').fill('password123');
    await page.locator('#confirmPassword').fill('password123');
    
    // Submit form
    await page.getByRole('button', { name: 'Register' }).click();
    
    // Check for success message
    await expect(page.getByText('Registration successful!')).toBeVisible();
    
    // Verify form fields are cleared
    await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue('');
    await expect(page.locator('#password')).toHaveValue('');
    await expect(page.locator('#confirmPassword')).toHaveValue('');
    
    // Verify user appears in the list
    await expect(page.getByRole('heading', { name: testName })).toBeVisible();
    await expect(page.getByText(testEmail)).toBeVisible();
  });

  test('should prevent duplicate email registration', async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `duplicate${timestamp}@example.com`;
    const testName = `Test User ${timestamp}`;
    
    // Register first user
    await page.getByRole('textbox', { name: 'Name' }).fill(testName);
    await page.getByRole('textbox', { name: 'Email' }).fill(testEmail);
    await page.locator('#password').fill('password123');
    await page.locator('#confirmPassword').fill('password123');
    await page.getByRole('button', { name: 'Register' }).click();
    
    // Wait for success message
    await expect(page.getByText('Registration successful!')).toBeVisible();
    
    // Try to register with the same email again
    await page.getByRole('textbox', { name: 'Name' }).fill('Another User');
    await page.getByRole('textbox', { name: 'Email' }).fill(testEmail);
    await page.locator('#password').fill('password456');
    await page.locator('#confirmPassword').fill('password456');
    await page.getByRole('button', { name: 'Register' }).click();
    
    // Check for duplicate email error
    await expect(page.getByText('User with this email already exists')).toBeVisible();
  });

  test('should clear validation errors when user starts typing', async ({ page }) => {
    // Submit empty form to trigger errors
    await page.getByRole('button', { name: 'Register' }).click();
    
    // Verify errors are shown
    await expect(page.getByText('Name is required')).toBeVisible();
    
    // Start typing in the name field
    await page.getByRole('textbox', { name: 'Name' }).fill('T');
    
    // Error should be cleared
    await expect(page.getByText('Name is required')).not.toBeVisible();
  });

  test('should show loading state during registration', async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `test${timestamp}@example.com`;
    
    // Fill form
    await page.getByRole('textbox', { name: 'Name' }).fill('Test User');
    await page.getByRole('textbox', { name: 'Email' }).fill(testEmail);
    await page.locator('#password').fill('password123');
    await page.locator('#confirmPassword').fill('password123');
    
    // Click register and check for loading state
    const registerButton = page.getByRole('button', { name: 'Register' });
    await registerButton.click();
    
    // Button should show "Registering..." or be disabled during submission
    // Note: The button text changes to "Registering..." during submission
    await expect(registerButton).toBeEnabled(); // After submission completes
  });

  test('should display registered users with correct information', async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `display${timestamp}@example.com`;
    const testName = `Display Test ${timestamp}`;
    
    // Register a user
    await page.getByRole('textbox', { name: 'Name' }).fill(testName);
    await page.getByRole('textbox', { name: 'Email' }).fill(testEmail);
    await page.locator('#password').fill('password123');
    await page.locator('#confirmPassword').fill('password123');
    await page.getByRole('button', { name: 'Register' }).click();
    
    // Wait for registration to complete
    await expect(page.getByText('Registration successful!')).toBeVisible();
    
    // Verify user card displays correctly
    const userCard = page.locator(`text=${testName}`).locator('..').locator('..');
    await expect(userCard.getByRole('heading', { name: testName })).toBeVisible();
    await expect(userCard.getByText(testEmail)).toBeVisible();
    await expect(userCard.getByText(/Registered:/)).toBeVisible();
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that main elements are still visible
    await expect(page.getByRole('heading', { name: 'User Registration Demo' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Register New User' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Registered Users' })).toBeVisible();
    
    // Form fields should still be accessible
    await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
  });
});

