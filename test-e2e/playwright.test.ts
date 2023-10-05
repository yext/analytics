import { expect, test } from '@playwright/test';

test.beforeAll(async () => {
  expect(process.env.YEXT_API_KEY).toBeDefined();
});

test('test Fire Chat Event on Chromium, Firefox, and Webkit', async ({
  page
}) => {
  const responsePromise = page.waitForResponse((res) => res.status() == 202);
  await page.goto('/');
  await page.click('button:has-text("Fire Chat Event")');
  await responsePromise;
});

test('test Fire Search Event on Chromium, Firefox, and Webkit', async ({
  page
}) => {
  const responsePromise = page.waitForResponse((res) => res.status() == 202);
  await page.goto('/');
  await page.click('button:has-text("Fire Search Event")');
  await responsePromise;
});

test('test Fire Sites Event on Chromium, Firefox, and Webkit', async ({
  page
}) => {
  const responsePromise = page.waitForResponse((res) => res.status() == 202);
  await page.goto('/');
  await page.click('button:has-text("Fire Sites Event")');
  await responsePromise;
});

test('test Fire CTA Event on Chromium, Firefox, and Webkit', async ({
  page
}) => {
  const responsePromise = page.waitForResponse((res) => res.status() == 202);
  await page.goto('/');
  await page.click('button:has-text("Fire CTA Event")');
  await responsePromise;
});

test('test Fire Event w/ Session Tracking on Chromium, Firefox, and Webkit', async ({
  page
}) => {
  const responsePromise = page.waitForResponse((res) => res.status() == 202);
  await page.goto('/');
  await page.click('button:has-text("Fire Event w/ Session Tracking")');
  await responsePromise;
});
