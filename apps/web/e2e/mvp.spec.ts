import { expect, test } from '@playwright/test';

test('navigates from home to Explore', async ({ page }) => {
  await page.route('**/places?**', (route) => route.fulfill({ json: { data: [], nextCursor: null } }));
  await page.route('**/events', (route) => route.fulfill({ json: [] }));
  await page.goto('/');
  await page.getByRole('link', { name: 'Khám phá địa điểm' }).click();
  await expect(page).toHaveURL(/\/explore$/);
  await expect(page.getByRole('heading', { name: 'Đi đâu hôm nay?' })).toBeVisible();
});

test('redirects a guest from authenticated Favorites to Login', async ({ page }) => {
  await page.goto('/favorites');
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('heading', { name: 'Đăng nhập' })).toBeVisible();
});

test('validates the Login form before sending an API request', async ({ page }) => {
  let requests = 0;
  await page.route('**/auth/login', (route) => { requests += 1; return route.abort(); });
  await page.goto('/login');
  await page.getByLabel('Email').fill('invalid');
  await page.getByLabel('Mật khẩu').fill('short');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  await expect.poll(() => requests).toBe(0);
});
