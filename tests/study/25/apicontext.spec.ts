import { expect } from '@playwright/test';
import { test } from '../../../fixtures/custom-fixture';

test('Test auth', async ({ youngestUser }) => {
    await test.step('Check eye color', () => {
        expect(youngestUser.eyeColor).toEqual('Amber');
    });
});

test('Test auth - negative', async ({ request }) => {
    await test.step('Check non-auth', async () => {
        const response = await request.get(`https://dummyjson.com/user/me`)
        const { message } = await response.json()
        expect(response.status()).toBe(401);
        expect(message).toBe('Access Token is required');
    });
});

test('Test auth - negative with browser', async ({ page }) => {
    await test.step('Check non-auth with browser', async () => {
        const response = await page.request.get(`https://dummyjson.com/user/me`)
        const { message } = await response.json()
        expect(response.status()).toBe(401);
        expect(message).toBe('Access Token is required');
    });
});


test('Test fixture', async ({ testFixture }) => {
    const a = testFixture
    const b = 1
});