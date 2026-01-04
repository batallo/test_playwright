import { expect } from '@playwright/test';
import { test } from '../../../fixtures/custom-fixture'


test('Use storage state @fixture', async ({ page, standardUser }) => {
    const fixtureValue = standardUser

    await page.goto('https://www.saucedemo.com/inventory.html');
    const tableContent = await page.evaluate(() => document.cookie)
    expect(tableContent.split('=')[1]).toEqual('standard_user')
});