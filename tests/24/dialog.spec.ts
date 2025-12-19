import { test, expect } from "@playwright/test";

test('Alert @alert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on('dialog', dialog_popup => {
        const txt = dialog_popup.message()
        if (txt == 'I am a JS Confirm') dialog_popup.accept()
        if (txt == 'I am a JS prompt') dialog_popup.dismiss()
    });
    await page.getByText('Click for JS Confirm').click();
    await page.getByText('Click for JS Prompt').click();
    const a = 1;
});