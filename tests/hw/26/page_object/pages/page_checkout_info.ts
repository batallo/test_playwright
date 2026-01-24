import { Page, Locator } from '@playwright/test';
import { BaseLoggedInPage } from './page_base_logged_in';
import { Header } from '../elements/header';
import { Footer } from '../elements/footer';

export class CheckoutInfoPage extends BaseLoggedInPage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;
    readonly errorMessage: Locator;


    constructor(page: Page) {
        super(page, 'https://www.saucedemo.com/checkout-step-one.html');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueShoppingButton = page.locator('button[data-test="cancel"]');
        this.checkoutButton = page.locator('button[data-test="continue"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async isErrorVisible(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }

    async closeErrorMessage() {
        if (!(await this.isErrorVisible())) {
            throw new Error('Error message is not visible');
        }
        const closeButton = this.errorMessage.locator('[data-test="error-button"]');
        await closeButton.click();
    }
}
