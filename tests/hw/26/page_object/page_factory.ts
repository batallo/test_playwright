import { Page } from '@playwright/test';
import { LoginPage } from './pages/page_login';
import { CartPage } from './pages/page_cart';
import { InventoryPage } from './pages/page_inventory';
import { CheckoutInfoPage } from './pages/page_checkout_info';

export class SwagLabs {
    readonly loginPage: LoginPage;
    readonly cartPage: CartPage;
    readonly inventoryPage: InventoryPage;
    readonly checkoutInfoPage: CheckoutInfoPage;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
        this.cartPage = new CartPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.checkoutInfoPage = new CheckoutInfoPage(page);
    }
}
