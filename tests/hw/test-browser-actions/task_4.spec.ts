import { test, expect } from '@playwright/test';

// Task4: Для сайта https://the-internet.herokuapp.com/drag_and_drop
// 1. Перетащить элемент А на элемент В
// 2. Проверить что они поменялись местами

test('Task 4 - Drag And Drop', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    await page.dragAndDrop('#column-a', '#column-b');
    const texts = await page.locator('.column').allTextContents();
    expect(texts).toEqual(['B', 'A']);
});
