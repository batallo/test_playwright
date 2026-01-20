import { Page, Locator } from '@playwright/test';
import { BasePage } from './base_page';

export class CartPage extends BasePage {
    readonly cartBadge: Locator;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly removeButtons: Locator;
    readonly cartItemNames: Locator;
    readonly cartItemPrices: Locator;
    readonly cartItemQuantities: Locator;

    constructor(page: Page) {
        super(page, 'https://www.saucedemo.com/cart.html');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.removeButtons = page.locator('[data-test^="remove-"]');
        this.cartItemNames = page.locator('.inventory_item_name');
        this.cartItemPrices = page.locator('.inventory_item_price');
        this.cartItemQuantities = page.locator('.cart_quantity');
    }

    async getCartItemsCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async getCartBadgeCount(): Promise<string> {
        return await this.cartBadge.textContent() || '0';
    }

    async removeItemByName(itemName: string) {
        const item = this.page.locator('.cart_item', { hasText: itemName });
        const removeButton = item.locator('[data-test^="remove-"]');
        await removeButton.click();
    }

    async removeItemByIndex(index: number) {
        await this.removeButtons.nth(index).click();
    }

    async getItemNames(): Promise<string[]> {
        return await this.cartItemNames.allTextContents();
    }

    async getItemPrices(): Promise<string[]> {
        return await this.cartItemPrices.allTextContents();
    }

    async getTotalPrice(): Promise<number> {
        const prices = await this.getItemPrices();
        return prices.reduce((sum, price) => {
            return sum + parseFloat(price.replace('$', ''));
        }, 0);
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async isCartEmpty(): Promise<boolean> {
        return await this.getCartItemsCount() === 0;
    }

    async verifyItemInCart(itemName: string): Promise<boolean> {
        const items = await this.getItemNames();
        return items.includes(itemName);
    }
}
