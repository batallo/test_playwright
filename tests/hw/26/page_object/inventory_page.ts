import { Page } from '@playwright/test';
import { BasePage } from './base_page';
import { InventoryItem } from './elements/inventory_item';

export class InventoryPage extends BasePage {
    readonly inventoryItem: InventoryItem;

    constructor(page: Page) {
        super(page, 'https://www.saucedemo.com/inventory.html');
        this.inventoryItem = new InventoryItem(page);
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
