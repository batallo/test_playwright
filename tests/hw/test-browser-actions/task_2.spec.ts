import { test, expect } from '@playwright/test';

// Task2: Для сайта https://the-internet.herokuapp.com/windows
// 1. Открыть новую страницу
// 2. Проверить что она открылась и имеет ожидаемый ЮРЛ и тайтл

test('Task 2 - Tabs', async ({ page, context }) => {
    await page.goto('https://the-internet.herokuapp.com/windows');
    await page.locator('.example a').click();
    const tab = await context.waitForEvent('page');

    await expect(tab).toHaveTitle("New Window")
    await expect(tab).toHaveURL("https://the-internet.herokuapp.com/windows/new")
});
