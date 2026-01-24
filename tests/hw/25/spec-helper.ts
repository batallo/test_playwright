import { test, expect, } from '@playwright/test';

export function validateErrorResponse(baseUrl: string, statusCode: number, errorMessage: string) {
    return test(`should display error message on ${statusCode}`, async ({ page }) => {
        await page.route(baseUrl + '?action=getData', route => {
            route.fulfill({
                status: statusCode,
                contentType: 'application/json',
                body: JSON.stringify({ message: errorMessage })
            });
        });

        await page.goto(baseUrl);
        await page.locator('.card #fetchBtn').click();

        await expect.soft(page.locator('#result')).toHaveClass('error');
        await expect.soft(page.locator('#result')).toHaveText(`Error ${statusCode}: ${errorMessage}`);
    });
}