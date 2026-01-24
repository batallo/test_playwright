import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly url: string;

    constructor(page: Page, url: string = '') {
        this.page = page;
        this.url = url;
    }

    async navigate() {
        if (!this.url) throw new Error('URL is not defined for this page');

        await this.page.goto(this.url);
    }

    get title() {
        return this.page.title();
    }
}
