import { test, expect } from '@playwright/test';

test('test Fire Chat Event on chrome, firefox, and webkit', async ({
  page
}) => {
  await page.goto('http://localhost:3000');

  await Promise.all([
    page.waitForResponse((res) => res.status() == 202),
    page.click('button:has-text("Fire Chat Event")'),
    page.waitForTimeout(3000)
  ])
    .then((responses) => {
      expect(responses.at(0)?.status()).toBe(202);
    })
    .catch((e) => {
      console.log(e);
      test.fail(e);
    });
});

test('test Fire Search Event on chrome, firefox, and webkit', async ({
  page
}) => {
  await page.goto('http://localhost:3000');

  await Promise.all([
    page.waitForResponse((res) => res.status() == 202),
    page.click('button:has-text("Fire Search Event")')
  ])
    .then((responses) => {
      expect(responses.at(0)?.status()).toBe(202);
    })
    .catch((e) => {
      console.log(e);
      test.fail(e);
    });
});

test('test Fire CTA Event on chrome, firefox, and webkit', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await Promise.all([
    page.waitForResponse((res) => res.status() == 202),
    page.click('button:has-text("Fire CTA Event")')
  ])
    .then((responses) => {
      expect(responses.at(0)?.status()).toBe(202);
    })
    .catch((e) => {
      console.log(e);
      test.fail(e);
    });
});

test('test Fire Event w/ Session Tracking on chrome, firefox, and webkit', async ({
  page
}) => {
  await page.goto('http://localhost:3000');

  await Promise.all([
    page.waitForResponse((res) => res.status() == 202),
    page.click('button:has-text("Fire Event w/ Session Tracking")')
  ])
    .then((responses) => {
      expect(responses.at(0)?.status()).toBe(202);
    })
    .catch((e) => {
      console.log(e);
      test.fail(e);
    });
});
