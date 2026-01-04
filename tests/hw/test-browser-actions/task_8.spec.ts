import { test, expect } from '@playwright/test';

// Task8: Для сайта https://the-internet.herokuapp.com/javascript_alerts
// 1. Вызвать JS confirm через соответствующую опцию(проверить что алерт появился)
// 2. Закрыть его через accept / dismiss и проверить результат

test.describe('Task 8 - Alerts', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    })

    test('Task 8 - Alerts - accept', async ({ page }) => {
        page.on('dialog', di => di.accept())
        await page.getByText('Click for JS Confirm').click();
        await expect(page.locator('#result')).toHaveText('You clicked: Ok');
    });

    test('Task 8 - Alerts - decline', async ({ page }) => {
        page.on('dialog', di => di.dismiss())
        await page.getByText('Click for JS Confirm').click();
        await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
    });
});
