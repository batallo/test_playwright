import { test, expect, type Page } from '@playwright/test';

// Три главных правила Page Object:
// 1. Селекторы живут только в PO. Тест не должен знать, что кнопка называется .btn-submit.
// 2. Действия — это методы. Вместо click и fill в тесте должны быть login(), addToCart(), searchForProduct().
// 3. PO не делает проверок. Page Object — это просто карта страницы. Проверки (expect) должны оставаться в файле теста.

// В чем профит ?
// Если завтра разработчики перекрасят кнопку или изменят её ID, ты поправишь одну строчку в классе PizzaMenuPage, и все твои 50 тестов, которые заказывают пиццу, снова заработают.


class PizzaMenuPage {
  page: Page
  pepperoniButton: ReturnType<Page['locator']>; //
  checkoutButton: ReturnType<Page['locator']>;

  constructor(page: Page) {
    this.page = page;
    // Описываем ингредиенты (селекторы) в одном месте
    this.pepperoniButton = page.locator('#add-pepperoni');
    this.checkoutButton = page.locator('.cart-submit');
  }

  // Описываем действие (понятное человеку)
  async orderPepperoni() {
    await this.pepperoniButton.click();
    await this.checkoutButton.click();
  }
}


test('Заказ пиццы через меню', async ({ page }) => {
  const menu = new PizzaMenuPage(page);

  await page.goto('/pizzeria');
  // Мы просто вызываем "блюдо" из меню
  await menu.orderPepperoni();

  await expect(page.getByText('Заказ принят')).toBeVisible();
});