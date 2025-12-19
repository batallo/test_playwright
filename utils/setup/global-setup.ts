import { test as setup } from '@playwright/test';
import { readFileSync } from 'fs'

setup('log in as standard user', async ({ page }) => {
    const path = '.auth/standard_user.json'
    // const fileData = readFileSync(path, 'utf-8');
    // const parsedData = JSON.parse(fileData)

    // const expirationTime = parsedData.cookies[0].expires
    // const now = (new Date()).getTime();

    // if (expirationTime > now) return

    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.context().storageState({ path })
});