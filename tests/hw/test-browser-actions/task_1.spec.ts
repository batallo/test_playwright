import { test, expect } from '@playwright/test';

// Task1: Для сайта https://books-pwakit.appspot.com/ найти:
// 1. Локатор для строки "Search the world's most comprehensive index of full-text books."
// 2. Проверить что текст совпадает с ожидаемым

test('Task 1 - Locator', async ({ page }) => {
    await page.goto('https://books-pwakit.appspot.com/');
    const texts = await page.locator('.books-desc').textContent();
    expect(texts).toEqual("Search the world's most comprehensive index of full-text books.");
});
