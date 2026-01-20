import { Locator, Page } from "@playwright/test";

export class BurgerMenu {
    private readonly containerLocator: Locator;
    private readonly closeMenuButton: Locator;
    readonly burgerMenuButton: Locator;
    readonly allItemsLink: Locator;
    readonly aboutLink: Locator;
    readonly logoutLink: Locator;
    readonly resetAppStateLink: Locator;

    constructor(page: Page) {
        this.containerLocator = page.locator('.bm-menu-wrap');
        this.burgerMenuButton = page.locator('#react-burger-menu-btn');
        this.closeMenuButton = this.containerLocator.locator('.bm-cross-button');
        this.allItemsLink = this.containerLocator.locator('[data-test="inventory-sidebar-link"]');
        this.aboutLink = this.containerLocator.locator('[data-test="about-sidebar-link"]');
        this.logoutLink = this.containerLocator.locator('[data-test="logout-sidebar-link"]');
        this.resetAppStateLink = this.containerLocator.locator('[data-test="reset-sidebar-link"]');
        this
    }

    async isMenuOpen(): Promise<boolean> {
        return await this.containerLocator.isVisible()
    }

    async waitForMenuStatus(state: 'visible' | 'hidden') {
        await this.containerLocator.waitFor({ state });
    }

    async closeMenu() {
        if (await this.isMenuOpen()) {
            await this.closeMenuButton.click();
            return await this.waitForMenuStatus('hidden');
        }

        throw new Error('Burger menu is already closed');
    }

    async openMenu() {
        if (await this.isMenuOpen()) return

        await this.burgerMenuButton.click();
        return await this.waitForMenuStatus('visible');
    }
}