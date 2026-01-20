import { Locator, Page } from "@playwright/test";

export class Footer {
    private readonly footerContainer: Locator;
    readonly socialIconLinks: Locator;
    readonly copyRightText: Locator;
    readonly socialIconTwitter: Locator;
    readonly socialIconFacebook: Locator;
    readonly socialIconLinkedIn: Locator;

    constructor(page: Page) {
        this.footerContainer = page.locator('[data-test="footer"]');
        this.socialIconLinks = this.footerContainer.locator('.social a');
        this.socialIconTwitter = this.socialIconLinks.locator('[data-test="social-twitter"]');
        this.socialIconFacebook = this.socialIconLinks.locator('[data-test="social-facebook"]');
        this.socialIconLinkedIn = this.socialIconLinks.locator('[data-test="social-linkedin"]');
        this.copyRightText = this.footerContainer.locator('[data-test="footer-copy"]');
    }

    async getCopyRightTextYear() {
        const text = await this.copyRightText.textContent();
        const yearMatch = text?.match(/\d{4}/);
        return yearMatch ? +yearMatch : null;
    }
}
