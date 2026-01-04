import { test as extendTest, expect } from '@playwright/test';

const test = extendTest.extend<{ testIdGenerator: number }>({
    testIdGenerator: async ({ }, use) => {
        const randomId = Math.floor(Math.random() * 1000);
        console.log(`randomId is ${randomId}`);
        await use(randomId);
    }
});

test('Check that random Id is displayed if user click Add to cart button', async ({ page, testIdGenerator }) => {
    await page.goto("https://www.saucedemo.com/inventory.html");
    const consolePromise = page.waitForEvent('console');
    // await page.locator("[data-test=\"add-to-cart-sauce-labs-backpack\"]").click();
    // await page.evaluate((testIdGenerator) => console.log(`Added item with test ID: ${testIdGenerator}`), testIdGenerator);
    const consoleMessage = await consolePromise;
    expect(consoleMessage.text()).toEqual(`Added item with test ID: ${testIdGenerator}`);
    // await expect(page.locator("[data-test=\"remove-sauce-labs-backpack\"]")).toHaveText("Remove");
})