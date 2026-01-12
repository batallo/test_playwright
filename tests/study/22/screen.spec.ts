import { test, expect } from '@playwright/test';

test('screenshot testing', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('problem_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await expect(page.locator('[data-test="login-button"]')).toHaveScreenshot();
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveScreenshot();
});