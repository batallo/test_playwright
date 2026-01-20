import { expect } from '@playwright/test';
import { test } from '../../../fixtures/custom-fixture';

test('Mocking requests', async ({ page }) => {
    await test.step('Make request', async () => {
        page.route('**/BookStore/v1/Books', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    "books": [
                        {
                            "isbn": "1",
                            "title": "Successfully mocked book",
                            "subTitle": "mock subtitle",
                            "author": "no author here",
                            "publish_date": "2026-01-12T08:48:39.000Z",
                            "publisher": "Test publisher",
                            "pages": 1,
                            "description": "Exciting test book",
                            "website": "you_are_awesome"
                        }
                    ]
                })
            });
        });

        await page.goto('https://demoqa.com/books');

        const names = await page.locator('.rt-tbody a').allInnerTexts();
        expect(names).toEqual(["Successfully mocked book"]);
    });
});

test('Mocking requests based on actual content', async ({ page }) => {
    await test.step('Make request and reading response', async () => {
        page.route('**/BookStore/v1/Books', async (route) => {
            const data = await route.fetch();
            const json = await data.json();
            json.books.splice(1)

            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(json)
            });
        });

        await page.goto('https://demoqa.com/books');

        await expect(page.locator('.rt-tbody a')).toHaveCount(1);
    });
});

test('Mock block requests', async ({ page }) => {
    await test.step('Make request', async () => {
        page.route('**/BookStore/v1/Books', route => {
            route.abort();
        });

        await page.goto('https://demoqa.com/books');

        const loadingState = page.locator('#loading-label');
        expect(loadingState).toHaveText('Loading...');
    });
});
