import { Page } from '@playwright/test';
import { BaseLoggedInPage } from './page_base_logged_in';
import { InventoryItem } from '../elements/inventory_item';

export class InventoryPage extends BaseLoggedInPage {
    readonly inventoryItem: InventoryItem;

    constructor(page: Page) {
        super(page, 'https://www.saucedemo.com/inventory.html');
        this.inventoryItem = new InventoryItem(page, page.locator('[data-test="inventory-list"]'));
    }

    async getInventoryItemsCount() {
        return await this.inventoryItem.container.count();
    }

    async addAllToCart() {
        const itemCount = await this.getInventoryItemsCount();
        for (let i = 0; i < itemCount; i++) {
            const item = this.inventoryItem.container.nth(i);
            if (!(await this.inventoryItem.isItemInCart(item))) {
                const addButton = item.locator('.pricebar button');
                await addButton.click();
            }
        }
    }

}
