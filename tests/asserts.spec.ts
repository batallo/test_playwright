// import { test, expect } from '@playwright/test';
import { test } from '@playwright/test';
import { expect } from '../libs/asserts/custom-asserts';

test('test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="login-credentials"]').click();
    await page.locator('div').filter({ hasText: 'Accepted usernames are:' }).nth(4).click();
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('problem_user');
    await page.locator('[data-test="username"]').press('Tab');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.getByText('$29.99').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
});

test('navigates to login', async ({ page }) => {
    const response = await page.request.get('https://api.restful-api.dev/objects')
    const status = response.status()
    const statusText = response.statusText()
    const data = await response.json()
    expect(status).toBe(200)
    await expect(response).toBeOK()
});

test('assert a value', async ({ page }) => {
    const value = 1;
    expect(value).toBe(1)
});

test('Locator: status becomes "sumbitted"', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('problem_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('button#react-burger-menu-btn').click();
    await expect(page.locator('.bm-menu-wrap')).toBeHidden();
});

test('page assertion', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('problem_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    expect(page).toHaveURL(/inventory\.html$/)
});

test('custom assertion', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('problem_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    const price = await page.locator('[data-test="inventory-item-price"]').first().textContent()
    expect(price).toUseCharmPracing()
});