import { test } from '@playwright/test';

test('test Fire Chat Event on Chromium, Firefox, and Webkit', async ({
  page
}) => {
  const responsePromise = page.waitForResponse((res) => res.status() == 202 || res.status() == 200);
  await page.goto('http://localhost:3000');
  await page.click('button:has-text("Fire Chat Event")');
  await responsePromise;
});

test('test Fire Search Event on Chromium, Firefox, and Webkit', async ({
  page
}) => {
  const responsePromise = page.waitForResponse((res) => res.status() == 202 || res.status() == 200);
  await page.goto('http://localhost:3000');
  await page.click('button:has-text("Fire Search Event")');
  await responsePromise;
});

test('test Fire CTA Event on Chromium, Firefox, and Webkit', async ({
  page
}) => {
  const responsePromise = page.waitForResponse((res) => res.status() == 202 || res.status() == 200);
  await page.goto('http://localhost:3000');
  await page.click('button:has-text("Fire CTA Event")');
  await responsePromise;
});

test('test Fire Event w/ Session Tracking on Chromium, Firefox, and Webkit', async ({
  page
}) => {
  const responsePromise = page.waitForResponse((res) => res.status() == 202 || res.status() == 200);
  await page.goto('http://localhost:3000');
  await page.click('button:has-text("Fire Event w/ Session Tracking")');
  await responsePromise;
});
