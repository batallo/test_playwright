import { test, expect } from '@playwright/test';
import { mkdirSync, rmSync, writeFileSync } from 'fs'
import path from 'path'

// Task6: Для сайта https://the-internet.herokuapp.com/upload
// 1. Проверить загрузку файла test.txt(любой файл) на сайт
const filePath = './tests/test-browser-actions/upload/test.txt'

test.describe('Task 6', () => {
    test.beforeAll(() => {
        mkdirSync(path.dirname(filePath))
        writeFileSync(filePath, 'Test my test file', 'utf-8');
    })

    test.afterAll(() => {
        rmSync(path.dirname(filePath), { recursive: true, force: true })
    })

    test('Task 6 - Upload from drive', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/upload');
        await page.locator('#file-upload').setInputFiles(filePath);
        await page.locator('#file-submit').click();

        await expect(page.locator('.example h3')).toHaveText('File Uploaded!');
        await expect(page.locator('#uploaded-files')).toHaveText(path.basename(filePath));
    });
})

test('Task 6 - Upload from buffer', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    await page.locator('#file-upload').setInputFiles({
        name: path.basename(filePath),
        mimeType: 'application/json',
        buffer: Buffer.from(JSON.stringify('Test my test file'))
    });
    await page.locator('#file-submit').click();

    await expect(page.locator('.example h3')).toHaveText('File Uploaded!');
    await expect(page.locator('#uploaded-files')).toHaveText(path.basename(filePath));
});

// [] two approaches with\wo file on drive