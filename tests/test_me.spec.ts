import { test, expect } from "@playwright/test";

const sauceUrl = "https://www.saucedemo.com/";

test.beforeEach(async ({ page }) => {
    await page.goto(sauceUrl);
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
});

test("do items added to cart", async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]')
        .click();
    page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    page.locator('[data-test="shopping-cart-link"]').click();
    await expect(
        page.locator(
            '//div[@class="cart_item_label"][.//div[@data-test="inventory-item-name" and text()="Sauce Labs Bolt T-Shirt"]] //button[starts-with(@data-test,"remove-")]',
        ),
    ).toBeVisible();
});