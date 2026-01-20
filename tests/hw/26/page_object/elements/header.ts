import { Locator, Page } from "@playwright/test";
import { BurgerMenu } from "./burger_menu";

export class Header {
    private readonly headerContainer: Locator;
    readonly logo: Locator;
    readonly burgerMenu: BurgerMenu;
    readonly shoppingCartLink: Locator;
    readonly shoppingCardItemsCount: Locator;
    private readonly sortByContainer: Locator;
    readonly activeSortOption: Locator;
    readonly sortBy: Locator;
    readonly pageLabel: Locator;


    constructor(page: Page) {
        this.headerContainer = page.locator('[data-test="header-container"]');
        this.logo = this.headerContainer.locator('.app_logo');
        this.burgerMenu = new BurgerMenu(page);
        this.shoppingCartLink = this.headerContainer.locator('[data-test="shopping-cart-link"]');
        this.shoppingCardItemsCount = this.headerContainer.locator('[data-test="shopping-cart-badge"]');
        this.sortByContainer = this.headerContainer.locator('.select_container');
        this.activeSortOption = this.sortByContainer.locator('[data-test="active-option"]');
        this.sortBy = this.sortByContainer.locator('[data-test="product-sort-container"]');
        this.pageLabel = this.headerContainer.locator('[data-test="title"]');
    }



}
