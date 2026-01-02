import { test, expect } from '@playwright/test';

test('PlaneTransition appears after initial choice', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByText('行き先は決まっていますか？')).toBeVisible();
  await page.getByRole('button', { name: /決まっていない/ }).click();
  const planeContainer = page.locator('div[style*="fly-across"]');
  await expect(planeContainer).toBeAttached();
  await expect(planeContainer).toBeVisible();
});
