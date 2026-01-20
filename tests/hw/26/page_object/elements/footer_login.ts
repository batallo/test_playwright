import { Locator, Page } from "@playwright/test";

export class FooterLoginPage {
    private readonly footerContainer: Locator;
    private readonly credentialsBlock: Locator;
    private readonly passwordBlock: Locator;
    readonly usernameBlockTitle: Locator;
    readonly usernames: Locator;
    readonly passwordBlockTitle: Locator;
    readonly passwords: Locator;


    constructor(page: Page) {
        this.footerContainer = page.locator('[data-test="login-credentials-container"]');
        this.credentialsBlock = this.footerContainer.locator('[data-test="login-credentials"]');
        this.passwordBlock = this.footerContainer.locator('[data-test="login-password"]');
        this.usernameBlockTitle = this.credentialsBlock.locator('h4');
        this.usernames = this.credentialsBlock.locator('li');
        this.passwordBlockTitle = this.passwordBlock.locator('h4');
        this.passwords = this.passwordBlock.locator('li');
    }
}
