import { Page, Locator } from '@playwright/test';
import { BasePage } from './base_page';
import { singletonFooter } from './footer';

export class InventoryPage extends BasePage {
    readonly inventoryItems: Locator;
    readonly addToCartButtons: Locator;
    readonly removeButtons: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;
    readonly itemNames: Locator;
    readonly itemPrices: Locator;
    readonly menuButton: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        super(page, 'https://www.saucedemo.com/inventory.html');
        this.inventoryItems = page.locator('.inventory_item');
        this.addToCartButtons = page.locator('[data-test^="add-to-cart-"]');
        this.removeButtons = page.locator('[data-test^="remove-"]');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
        this.itemNames = page.locator('.inventory_item_name');
        this.itemPrices = page.locator('.inventory_item_price');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
    }

    async getInventoryItemsCount(): Promise<number> {
        return await this.inventoryItems.count();
    }

    async addToCartByName(itemName: string) {
        const item = this.page.locator('.inventory_item', { hasText: itemName });
        const addButton = item.locator('[data-test^="add-to-cart-"]');
        await addButton.click();
    }

    async addToCartByIndex(index: number) {
        await this.addToCartButtons.nth(index).click();
    }

    async removeFromCartByIndex(index: number) {
        await this.removeButtons.nth(index).click();
    }

    async getCartBadgeCount(): Promise<string> {
        return await this.cartBadge.textContent() || '0';
    }

    async isCartBadgeVisible(): Promise<boolean> {
        return await this.cartBadge.isVisible();
    }

    async openCart() {
        await this.cartLink.click();
    }

    async getItemNames(): Promise<string[]> {
        return await this.itemNames.allTextContents();
    }

    async getItemPrices(): Promise<string[]> {
        return await this.itemPrices.allTextContents();
    }

    async logout() {
        await this.menuButton.click();
        await this.logoutLink.click();
    }

    get footer() {
        return singletonFooter
    }
}

// export const inventoryPage = (page: Page) => new InventoryPage(page)
