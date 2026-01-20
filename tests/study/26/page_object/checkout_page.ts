import { Page, Locator } from '@playwright/test';
import { BasePage } from './base_page';

export class CheckoutPage extends BasePage {
    // Step One - Information
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;

    // Step Two - Overview
    readonly cartItems: Locator;
    readonly itemNames: Locator;
    readonly itemPrices: Locator;
    readonly paymentInformation: Locator;
    readonly shippingInformation: Locator;
    readonly subtotal: Locator;
    readonly tax: Locator;
    readonly total: Locator;
    readonly finishButton: Locator;

    // Complete
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        super(page, 'https://www.saucedemo.com/checkout-step-one.html');

        // Step One
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.errorMessage = page.locator('[data-test="error"]');

        // Step Two
        this.cartItems = page.locator('.cart_item');
        this.itemNames = page.locator('.inventory_item_name');
        this.itemPrices = page.locator('.inventory_item_price');
        this.paymentInformation = page.locator('.summary_info_label', { hasText: 'Payment Information' });
        this.shippingInformation = page.locator('.summary_info_label', { hasText: 'Shipping Information' });
        this.subtotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
        this.finishButton = page.locator('[data-test="finish"]');

        // Complete
        this.completeHeader = page.locator('.complete-header');
        this.completeText = page.locator('.complete-text');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    // Step One Methods
    async fillShippingInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() || '';
    }

    async isErrorVisible(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }

    // Step Two Methods
    async getItemNames(): Promise<string[]> {
        return await this.itemNames.allTextContents();
    }

    async getSubtotal(): Promise<number> {
        const text = await this.subtotal.textContent() || '';
        return parseFloat(text.replace('Item total: $', ''));
    }

    async getTax(): Promise<number> {
        const text = await this.tax.textContent() || '';
        return parseFloat(text.replace('Tax: $', ''));
    }

    async getTotal(): Promise<number> {
        const text = await this.total.textContent() || '';
        return parseFloat(text.replace('Total: $', ''));
    }

    async clickFinish() {
        await this.finishButton.click();
    }

    async verifyPriceCalculation(): Promise<boolean> {
        const subtotal = await this.getSubtotal();
        const tax = await this.getTax();
        const total = await this.getTotal();
        const calculatedTotal = Math.round((subtotal + tax) * 100) / 100;
        return Math.abs(calculatedTotal - total) < 0.01;
    }

    // Complete Methods
    async getCompleteHeader(): Promise<string> {
        return await this.completeHeader.textContent() || '';
    }

    async getCompleteText(): Promise<string> {
        return await this.completeText.textContent() || '';
    }

    async isOrderComplete(): Promise<boolean> {
        return await this.completeHeader.isVisible();
    }

    async clickBackHome() {
        await this.backHomeButton.click();
    }

    // Combined flow method
    async completeCheckout(firstName: string, lastName: string, postalCode: string) {
        await this.fillShippingInformation(firstName, lastName, postalCode);
        await this.clickContinue();
        await this.page.waitForURL('**/checkout-step-two.html');
        await this.clickFinish();
        await this.page.waitForURL('**/checkout-complete.html');
    }
}
