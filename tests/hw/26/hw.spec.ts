import { expect } from '@playwright/test';
import { test } from '../../../fixtures/custom-fixture';

test.describe('Test Pages', () => {
    test.describe('Login  page', async () => {
        test.beforeEach(async ({ swagLabs }) => {
            await swagLabs.loginPage.navigate();
        });

        test('Validate components', async ({ swagLabs }) => {
            await test.step('Error is not visible by default', async () => {
                expect(await swagLabs.loginPage.isErrorVisible()).toBeFalsy();
            });

            await test.step('Has expected placeholders for fields', async () => {
                expect.soft(await swagLabs.loginPage.userNameInput.getAttribute('placeholder')).toBe('Username');
                expect.soft(await swagLabs.loginPage.passwordInput.getAttribute('placeholder')).toBe('Password');
            });

            await test.step('Has expected footer labels', async () => {
                expect.soft(await swagLabs.loginPage.footer.usernameBlockTitle.textContent()).toBe('Accepted usernames are:');
                expect.soft(await swagLabs.loginPage.footer.passwordBlockTitle.textContent()).toBe('Password for all users:');
            });
        });

        test('Error on invalid input', async ({ swagLabs }) => {
            await swagLabs.loginPage.login('invalid_user', 'invalid_password');

            await test.step('Error message is visible', async () => {
                expect(await swagLabs.loginPage.isErrorVisible()).toBeTruthy();
            });

            await test.step('Error message is expected', async () => {
                await expect(swagLabs.loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
            });

            await test.step('Close error message', async () => {
                await swagLabs.loginPage.closeErrorMessage();
                expect(await swagLabs.loginPage.isErrorVisible()).toBeFalsy();
            });
        });

    });

    test.describe('Inventory  page', async () => {
        test.beforeEach(async ({ standardUser, swagLabs }) => {
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
                await expect.soft(swagLabs.inventoryPage.footer.copyRightText).toHaveText("© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
                await expect.soft(swagLabs.inventoryPage.footer.socialIconLinks).toHaveCount(3);

            });

            await test.step('Validate Header', async () => {
                await swagLabs.inventoryPage.header.burgerMenu.openMenu();
                expect.soft(await swagLabs.inventoryPage.header.burgerMenu.isMenuOpen()).toBeTruthy();
                await swagLabs.inventoryPage.header.burgerMenu.closeMenu();
                expect.soft(await swagLabs.inventoryPage.header.burgerMenu.isMenuOpen()).toBeFalsy();
            });

        });
    });
});