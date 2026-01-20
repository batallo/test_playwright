import { Page } from '@playwright/test';
import { LoginPage } from './login_page';
import { CartPage } from './cart_page';
import { InventoryPage } from './inventory_page';
import { CheckoutInfoPage } from './checkout_info_page';

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
