import { Page } from '@playwright/test';
import { LoginPage } from './login_page';
import { InventoryPage } from './inventory_page';
import { CartPage } from './cart_page';
import { CheckoutPage } from './checkout_page';

export class PageFactory {
    private static instance: PageFactory;
    private _page: Page;
    private _loginPage?: LoginPage;
    private _inventoryPage?: InventoryPage;
    private _cartPage?: CartPage;
    private _checkoutPage?: CheckoutPage;

    private constructor(page: Page) {
        this._page = page;
    }

    public static getInstance(page: Page): PageFactory {
        if (!PageFactory.instance) {
            PageFactory.instance = new PageFactory(page);
        }
        PageFactory.instance._page = page;
        return PageFactory.instance;
    }

    public static resetInstance(): void {
        PageFactory.instance = null as any;
    }

    get loginPage(): LoginPage {
        if (!this._loginPage) {
            this._loginPage = new LoginPage(this._page);
        }
        return this._loginPage;
    }

    get inventoryPage(): InventoryPage {
        if (!this._inventoryPage) {
            this._inventoryPage = new InventoryPage(this._page);
        }
        return this._inventoryPage;
    }

    get cartPage(): CartPage {
        if (!this._cartPage) {
            this._cartPage = new CartPage(this._page);
        }
        return this._cartPage;
    }

    get checkoutPage(): CheckoutPage {
        if (!this._checkoutPage) {
            this._checkoutPage = new CheckoutPage(this._page);
        }
        return this._checkoutPage;
    }

    public recreatePages(): void {
        this._loginPage = new LoginPage(this._page);
        this._inventoryPage = new InventoryPage(this._page);
        this._cartPage = new CartPage(this._page);
        this._checkoutPage = new CheckoutPage(this._page);
    }
}
