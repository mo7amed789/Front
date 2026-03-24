import { expect, test } from '@playwright/test';

test('render login page', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});

test('register form validation', async ({ page }) => {
  await page.goto('/register');
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByText('Name is required')).toBeVisible();
});

test('forgot password page loads', async ({ page }) => {
  await page.goto('/forgot-password');
  await expect(page.getByRole('heading', { name: 'Forgot password' })).toBeVisible();
});

test('reset page token is required', async ({ page }) => {
  await page.goto('/reset-password');
  await page.getByRole('button', { name: 'Reset password' }).click();
  await expect(page.getByText('Token is required')).toBeVisible();
});
