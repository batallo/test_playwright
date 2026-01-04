import { test, expect } from '@playwright/test';

test('iframe - fail', async ({ page }) => {
    await page.goto('https://iframetester.com/?url=https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    const a = 1
});

test('iframe - pass', async ({ page }) => {
    await page.goto('https://iframetester.com/?url=https://www.saucedemo.com');
    const frame = page.frameLocator('#iframe-window');
    await frame.locator('#user-name').fill('standard_user');
    await frame.locator('#password').fill('secret_sauce');
    await frame.locator('input#login-button').click();
});

test('inject', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('input#login-button').click();

    const cssLocator = ".inventory_item_price"

    const array = await page.locator(cssLocator).allInnerTexts()
    const a = array[0]
    const b = 1
});

test('shadow DOM', async ({ page }) => {
    await page.goto('https://codepen.io/TLadd/pen/PoGoQeV');

    const frame = page.frameLocator('#result');
    const light = await frame.locator('#app p').textContent();
    const shadow = await frame.locator('#shadow-root p').textContent();


    expect(light).toEqual('Paragraph');
    expect(shadow).toEqual('Shadow Paragraph');
});
