import { expect, test } from '@playwright/test';

test('protected dashboard redirects to login when refresh cookie is missing', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login/);
});

test('login form submits and redirects to dashboard with mocked API', async ({ page }) => {
  await page.route('**/api/auth/login', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ token: 'mock-token' }),
      headers: {
        'set-cookie': 'refreshToken=mock-refresh; Path=/; HttpOnly',
      },
    });
  });

  await page.route('**/api/auth/me', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ userId: '1', email: 'user@example.com', role: 'Admin' }),
    });
  });

  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('Password123!');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('Dashboard Overview')).toBeVisible();
});

test('api test page can execute refresh endpoint with mock response', async ({ page, context }) => {
  await context.addCookies([
    {
      name: 'refreshToken',
      value: 'mock-refresh',
      domain: 'localhost',
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
    },
  ]);

  await page.route('**/api/auth/me', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ userId: '1', email: 'user@example.com', role: 'Admin' }),
    });
  });

  await page.route('**/api/auth/refresh', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ token: 'new-mock-token' }),
    });
  });

  await page.goto('/dashboard/api-test');
  await page.getByRole('button', { name: 'Run' }).nth(1).click();
  await expect(page.getByText('success')).toBeVisible();
});
