import { test, expect } from '@playwright/test';
import { readFileSync, rmSync } from 'fs'
import path from 'path'

// Task7: Для сайта https://the-internet.herokuapp.com/download
// 1. Скачать файл sample_upload.txt
// 2. Проверить что его содержимое это "This is a test file for Selenium upload automation."

const filePath = './tests/test-browser-actions/downloaded/test.txt'

test.afterAll(() => {
    rmSync(path.dirname(filePath), { recursive: true, force: true })
})

test('Task 7 - Download', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/download');
    await page.getByText('temp_test_file.txt').click();

    await (await page.waitForEvent('download')).saveAs(filePath);

    const fileData = readFileSync(filePath, 'utf-8')
    expect(fileData).toEqual('This is a test file for Playwright upload automation.')
});
