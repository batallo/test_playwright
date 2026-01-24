import { Page } from '@playwright/test';
import { Header } from '../elements/header';
import { Footer } from '../elements/footer';
import { BasePage } from './page_base';

export class BaseLoggedInPage extends BasePage {
    readonly header: Header;
    readonly footer: Footer;

    constructor(page: Page, url: string = '') {
        super(page, url)
        this.header = new Header(page);
        this.footer = new Footer(page);
    }

    async logOut() {
        await this.header.burgerMenu.openMenu();
        await this.header.burgerMenu.logoutLink.click();
    }

    // async logOutWithHttp() {
    //     await this.page.request.post('.../logout')
    // }
}
