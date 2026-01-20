import { Page, Locator } from '@playwright/test';
import { FooterLoginPage } from './elements/footer_login';

export class LoginPage {
    readonly page: Page;
    readonly url: string;
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly footer: FooterLoginPage;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = 'https://www.saucedemo.com/';
        this.userNameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.footer = new FooterLoginPage(page)
    }

    async navigate() {
        if (!this.url) throw new Error('URL is not defined for this page');

        await this.page.goto(this.url);
    }

    get title() {
        return this.page.title();
    }

    async login(username: string, password: string) {
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async isErrorVisible(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }

    async closeErrorMessage() {
        if (!(await this.isErrorVisible())) {
            throw new Error('Error message is not visible');
        }
        const closeButton = this.errorMessage.locator('[data-test="error-button"]');
        await closeButton.click();
    }
}
