import { test, expect } from '@playwright/test';
import path from 'path'


test('drag and drop', async ({ page }) => {
    await page.goto('https://codepen.io/Goldfsh/pen/zBbOqm');
    const frame = page.frameLocator('#result');

    await frame.locator('#dd1').dragTo(frame.locator('#dz3'));
    const a = 1
});


test('drag and drop with mouse', async ({ page }) => {
    await page.goto('https://codepen.io/Goldfsh/pen/zBbOqm');
    const frame = page.frameLocator('#result');
    const item = frame.locator('#dd1');
    const zone = frame.locator('#dz3');

    const zoneBox = await zone.boundingBox();

    if (zoneBox) {
        await item.hover();
        await page.mouse.down();
        await page.mouse.move(zoneBox.x, zoneBox.y);
        await page.mouse.up();
    } else {
        throw Error('');
    }

    const a = 1;
});

test('hover', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('input#login-button').click();

    await page.locator('[data-test="inventory-item-name"]').first().hover();
    const a = 1;
});

test('path', async ({ page, context }) => {
    // const a = path.join(__dirname, '/upload_files/test_me_please/first_file.pdf')
    // // /Users/anton.shautsou/pet/test_playwright/tests/23  
    // const b = 1

    const pagePromise = context.waitForEvent('page')
    // some action to open new window
    await page.locator('some-locator-to-open-new-page').click();
    const someNewPage = await pagePromise
    await someNewPage.locator('some-locator-on-a-new-page').click();
    await expect(someNewPage).toHaveURL('...')
});
