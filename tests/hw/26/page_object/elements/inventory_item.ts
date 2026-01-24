import { Locator, Page } from "@playwright/test";

export class InventoryItem {
    readonly container: Locator;
    readonly itemPicture: Locator;
    readonly itemName: Locator;
    readonly itemDescription: Locator;
    readonly itemPrice: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page, input_container: Locator | null = null) {
        this.container = (input_container ?? page).locator('[data-test="inventory-item"]');
        this.itemPicture = this.container.locator('.inventory_item_img a');
        this.itemName = this.container.locator('a [data-test="inventory-item-name"]');
        this.itemDescription = this.container.locator('[data-test="inventory-item-desc"]');
        this.itemPrice = this.container.locator('[data-test="inventory-item-price"]');
        this.addToCartButton = this.container.locator('.pricebar button');
    }

    async isItemInCart(item: Locator): Promise<boolean> {
        const buttonAttribute = await item.getAttribute('data-test');
        return buttonAttribute?.includes('remove') ?? false;
    }

    async addItemsToCartByIndexes(indexes: number[]) {
        for (const index of indexes) {
            const item = this.addToCartButton.nth(index);
            if (!(await this.isItemInCart(item))) {
                const addButton = this.addToCartButton.nth(index);
                await addButton.click();
            }
        }
    }

    async getItemsContainingText(name: string): Promise<Locator> {
        return this.container.filter({ hasText: name });
    }

    async removeItemsFromCartByIndexes(indexes: number[]) {
        for (const index of indexes) {
            const item = this.addToCartButton.nth(index);
            if (await this.isItemInCart(item)) {
                const addButton = this.addToCartButton.nth(index);
                await addButton.click();
            }
        }
    }
}
