import { Page } from '@playwright/test';
import { Header } from './elements/header';
import { Footer } from './elements/footer';

export class BasePage {
    readonly page: Page;
    readonly url: string;
    protected header: Header;
    protected footer: Footer;

    constructor(page: Page, url: string = '') {
        this.page = page;
        this.url = url;
        this.header = new Header(page);
        this.footer = new Footer(page);
    }

    async navigate() {
        if (!this.url) throw new Error('URL is not defined for this page');

        await this.page.goto(this.url);
    }

    get title() {
        return this.page.title();
    }

    async logOut() {
        await this.header.burgerMenu.openMenu();
        await this.header.burgerMenu.logoutLink.click();
    }


}
