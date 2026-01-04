import { test, expect } from '@playwright/test';

test('custom assertion', async ({ page }) => {
    // await page.context().tracing.start({ screenshots: true, snapshots: true })

    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('problem_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    const price = await page.locator('[data-test="inventory-item-price"]').first().textContent();

    await page.context().tracing.stop({ path: 'test-tracing-1.zip' });
    expect(price).toBe('$19.99');
});