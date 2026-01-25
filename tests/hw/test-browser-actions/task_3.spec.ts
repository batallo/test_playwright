import { test, expect } from '@playwright/test';

// Task3: Для сайта https://the-internet.herokuapp.com/hovers
// 1. Навести на любую из картинок
// 2. Проверить, что ожидаемый текст под картинкой появился

test('Task 3 - Hover', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');
    const n = Math.floor(Math.random() * 3);
    await page.locator('.figure').nth(n).hover();
    const txt = page.locator('.figcaption h5').nth(n);

    await expect(txt).toBeVisible();
    await expect(txt).toHaveText(`name: user${n + 1}`);
});

// [] validate that it is visible