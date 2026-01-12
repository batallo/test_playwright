import { test, expect } from "@playwright/test";

const saucePages = ["/inventory.html", "/cart.html", "/logout.html"];

test("check logout", async ({ page }) => {
    // Если запускаю тест отдельно, то он проходит. Если запускаю вместе с параметризированным тестом, то падает
    await page.goto("https://www.saucedemo.com/inventory.html");
    await page.getByRole("button", { name: "Open Menu" }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});

test("is cart empty @problem", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/inventory.html");
    await expect(page.locator(".shopping_cart_badge")).toHaveCount(0);
});

test.describe("check logo on different pages", () => {
    saucePages.forEach((newPage) => {
        test(`check logo on ${newPage}`, async ({ page }) => {
            await page.goto("https://www.saucedemo.com" + newPage);
            const logoText = await page.locator('[class="app_logo"]').textContent();
            expect(logoText).toEqual("Swag Labs");
        });
    });
});