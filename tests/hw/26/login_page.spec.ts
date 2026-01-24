import { expect } from '@playwright/test';
import { test } from '../../../fixtures/custom-fixture';

test.describe('Login page', async () => {
    test.beforeEach(async ({ swagLabs }) => {
        await swagLabs.loginPage.navigate();
    });

    test('Validate components', async ({ swagLabs }) => {
        const loginPage = swagLabs.loginPage

        await test.step('Error is not visible by default', async () => {
            expect(await swagLabs.loginPage.errorMessage.isVisible()).toBeFalsy();
            expect(await swagLabs.loginPage.isErrorVisible()).toBeFalsy();
        });

        await test.step('Has expected placeholders for fields', async () => {
            expect.soft(await loginPage.userNameInput.getAttribute('placeholder')).toBe('Username');
            expect.soft(await loginPage.passwordInput.getAttribute('placeholder')).toBe('Password');
        });

        await test.step('Has expected footer labels', async () => {
            expect.soft(await loginPage.footer.usernameBlockTitle.textContent()).toBe('Accepted usernames are:');
            expect.soft(await loginPage.footer.passwordBlockTitle.textContent()).toBe('Password for all users:');
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
