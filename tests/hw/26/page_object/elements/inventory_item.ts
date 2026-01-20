import { Locator, Page } from "@playwright/test";

export class InventoryItem {
    readonly container: Locator;
    readonly itemPicture: Locator;
    readonly itemName: Locator;
    readonly itemDescription: Locator;
    readonly itemPrice: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page, container: Locator | null = null) {
        this.container = (container ?? page).locator('[data-test="inventory-item"]');
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
}
