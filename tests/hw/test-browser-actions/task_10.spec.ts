import { test, expect } from '@playwright/test';

// Task10: Для сайта https://the-internet.herokuapp.com/iframe
// 1. Создать тест для проверки кнопок в верхнем меню эдитора()
// 2. Проверить что кнопки неактивны(disabled)
// 3. Проверить текст в форме("Your content goes here.")
// 4.(опционально, сложная задача) Сделать возможным редактировать текст в форме.
//    Дописать свое имя в форму и проверить что форма была модифицирована

test('Task 10 - Iframe', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    await page.locator('.tox-notification__dismiss').click();

    await test.step('Validate menu', async () => {
        await expect(page.locator('.tox-menubar button')).toHaveText(["File", "Edit", "View", "Format"])
    })

    await test.step('Validate menu is disabled', async () => {
        await expect(page.locator(".tox-menubar")).toBeDisabled();
    })

    const iFrame = page.frameLocator("#mce_0_ifr");
    const textElement = iFrame.locator("#tinymce p")

    await test.step('Validate text in iFrame', async () => {
        await expect(textElement).toHaveText("Your content goes here.");
    })

    await test.step('Update text in iFrame', async () => {
        await textElement.evaluate((element) => element.setAttribute('contenteditable', 'true'));

        await textElement.focus();
        await page.keyboard.type('Anton.')
        await page.keyboard.press('Space')

        await expect(textElement).toHaveText("Anton. Your content goes here.");
    })
});
