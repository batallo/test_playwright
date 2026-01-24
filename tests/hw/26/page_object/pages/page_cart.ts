import { Page, Locator } from '@playwright/test';
import { InventoryItem } from '../elements/inventory_item';
import { BaseLoggedInPage } from './page_base_logged_in';

export class CartPage extends BaseLoggedInPage {
    readonly cartQuantityLabel: Locator;
    readonly cartDescriptionLabel: Locator;
    readonly inventoryItem: InventoryItem;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;


    constructor(page: Page) {
        super(page, 'https://www.saucedemo.com/cart.html');
        this.cartQuantityLabel = page.locator('[data-test="cart-quantity-label"]');
        this.cartDescriptionLabel = page.locator('[data-test="cart-desc-label"]');
        this.inventoryItem = new InventoryItem(page, page.locator('[data-test="cart-list"]'));
        this.continueShoppingButton = page.locator('button[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('button[data-test="checkout"]');
    }
}
