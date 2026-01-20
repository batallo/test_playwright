import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly url: string;

    constructor(page: Page, url: string = '') {
        this.page = page;
        this.url = url;
    }

    async navigate() {
        if (this.url) {
            await this.page.goto(this.url);
        }
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async clickElement(selector: string) {
        await this.page.click(selector);
    }

    async fillInput(selector: string, text: string) {
        await this.page.fill(selector, text);
    }

    async getText(selector: string): Promise<string> {
        return await this.page.textContent(selector) || '';
    }
}
