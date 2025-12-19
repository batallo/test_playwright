import { test, expect } from '@playwright/test';

// Task5: Для сайта https://the-internet.herokuapp.com/key_presses
// 1. Проверить нажатие клавиши "Control"
// 2. Проверить что отображается последняя буква вашего имени после ввода через клавиатуру

test('Task 5 - Keyboard - Control', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');
    await page.keyboard.press('Control')
    const texts = await page.locator('#result').textContent()
    expect(texts).toEqual('You entered: CONTROL')
});

test('Task 5 - Keyboard - Name', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');
    await page.locator('#target').click()
    await page.keyboard.type('Anton')
    const texts = await page.locator('#result').textContent()
    expect(texts).toEqual('You entered: N')
});
