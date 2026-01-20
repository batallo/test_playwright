import { test, expect } from '@playwright/test';
import { validateErrorResponse } from './spec-helper';

const baseUrl = 'https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks';

test.describe('Mocks page', () => {
    test('should display data on successful response', async ({ page }) => {
        await page.goto(baseUrl);
        await page.locator('.card #fetchBtn').click();

        const response = await page.request.get(baseUrl + '?action=getData');
        const body = await response.json();

        expect(response.status()).toBe(200);
        await expect(page.locator('#result')).toHaveClass('success');
        await expect(page.locator('#result')).toHaveText(body.message);
    });

    test('should display error message on failed request', async ({ page }) => {
        await page.route(baseUrl + '?action=getData', route => {
            route.abort();
        });

        await page.goto(baseUrl);
        await page.locator('.card #fetchBtn').click();

        await expect(page.locator('#result')).toHaveClass('error');
        await expect(page.locator('#result')).toHaveText('Network error');
    });

    test('should display expected loading state on slow response', async ({ page }) => {
        await page.route(baseUrl + '?action=getData', route => {
            setTimeout(() => route.continue(), 5_000);
        });

        await page.goto(baseUrl);
        await page.locator('.card #fetchBtn').click();

        await expect(page.locator('#result')).toHaveText('Loading...', { timeout: 1_000 });
    });

    test('should display error message on 403', async ({ page }) => {
        const errorMessage = 'Forbidden. No access';
        const statusCode = 403;
        await page.route(baseUrl + '?action=getData', route => {
            route.fulfill({
                status: statusCode,
                contentType: 'application/json',
                body: JSON.stringify({ message: errorMessage })
            });
        });

        await page.goto(baseUrl);
        await page.locator('.card #fetchBtn').click();

        await expect(page.locator('#result')).toHaveClass('error');
        await expect(page.locator('#result')).toHaveText(`Error ${statusCode}: ${errorMessage}`);
    });

    test('should display error message on 404', async ({ page }) => {
        const errorMessage = 'Not Found';
        const statusCode = 404;
        await page.route(baseUrl + '?action=getData', route => {
            route.fulfill({
                status: statusCode,
                contentType: 'application/json',
                body: JSON.stringify({ message: errorMessage })
            });
        });

        await page.goto(baseUrl);
        await page.locator('.card #fetchBtn').click();

        await expect(page.locator('#result')).toHaveClass('error');
        await expect(page.locator('#result')).toHaveText(`Error ${statusCode}: ${errorMessage}`);
    });

    validateErrorResponse(baseUrl, 401, 'Unauthorized. No Access');
    validateErrorResponse(baseUrl, 418, "I'm a teapot");
    validateErrorResponse(baseUrl, 500, 'Internal Server Error');
});