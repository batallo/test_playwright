import { Page, Locator } from '@playwright/test';
import { BasePage } from './base_page';
import { InventoryItem } from './elements/inventory_item';

export class CartPage extends BasePage {
    readonly cartQuantityLabel: Locator;
    readonly cartDescriptionLabel: Locator;
    readonly inventoryItem: InventoryItem;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;


    constructor(page: Page) {
        super(page, 'https://www.saucedemo.com/cart.html');
        this.cartQuantityLabel = page.locator('[data-test="cart-quantity-label"]');
        this.cartDescriptionLabel = page.locator('[data-test="cart-desc-label"]');
        this.inventoryItem = new InventoryItem(page);
        this.continueShoppingButton = page.locator('button[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('button[data-test="checkout"]');
    }
}
