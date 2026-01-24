import { expect } from '@playwright/test';
import { test } from '../../../fixtures/custom-fixture';

test.describe('Inventory page', async () => {
    test.beforeEach(async ({ standardUser: _standardUser, swagLabs }) => { // to auth
        await swagLabs.inventoryPage.navigate();
    });

    test('Validate components', async ({ swagLabs }) => {
        await test.step('Inventory has title label', async () => {
            const itemsCount = await swagLabs.inventoryPage.header.pageLabel.textContent();
            expect(itemsCount).toBe('Products');
        });

        await test.step('Inventory has expected number of items', async () => {
            const itemsCount = await swagLabs.inventoryPage.getInventoryItemsCount();
            expect(itemsCount).toBe(6);
        });

        await test.step('Validate Footer', async () => {
            const copyRightText = await swagLabs.inventoryPage.footer.copyRightText.textContent()

            expect.soft(copyRightText).toEqual("© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
            await expect.soft(swagLabs.inventoryPage.footer.copyRightText)
                .toHaveText("© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
            await expect.soft(swagLabs.inventoryPage.footer.socialIconLinks).toHaveCount(3);
        });

        await test.step('Validate Header', async () => {
            await swagLabs.inventoryPage.header.burgerMenu.openMenu();
            expect.soft(await swagLabs.inventoryPage.header.burgerMenu.isMenuOpen()).toBeTruthy();
            await swagLabs.inventoryPage.header.burgerMenu.closeMenu();
            expect.soft(await swagLabs.inventoryPage.header.burgerMenu.isMenuOpen()).toBeFalsy();
        });
    });

    test('Validate cart items count', async ({ swagLabs }) => {
        await test.step('Add first every second item to cart', async () => {
            await swagLabs.inventoryPage.inventoryItem.addItemsToCartByIndexes([0, 2, 4])
            await expect(swagLabs.inventoryPage.header.shoppingCardItemsCount).toHaveText('3');
        });

        await test.step('Add first 3 items to cart', async () => {
            await swagLabs.inventoryPage.inventoryItem.removeItemsFromCartByIndexes([0, 2, 4])
            await expect(swagLabs.inventoryPage.header.shoppingCardItemsCount).not.toBeVisible();
        });
    });

    test('Validate T-shirts have same price', async ({ swagLabs }) => {
        const tshirts = await swagLabs.inventoryPage.inventoryItem.getItemsContainingText('T-Shirt')
        const tshirtsPrices = await tshirts.locator('[data-test="inventory-item-price"]').allTextContents();
        expect(tshirtsPrices.reduce((a: string, b: string) => a === b ? a : '')).toBeTruthy()
    });
});
