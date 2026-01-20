import { test, expect } from '@playwright/test';
import { LoginPage } from '../page_object/login_page';
import { CheckoutPage } from '../page_object/checkout_page';
import { InventoryPage } from '../page_object/inventory_page';
import { CartPage } from '../page_object/cart_page';
import { helperFunctionExpectedOverallPrice } from '../helpers/helper';

const a = helperFunctionExpectedOverallPrice(1, 2)

test.describe('Saucedemo E2E Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await inventoryPage.navigate();
        await inventoryPage.footer
    });

    test('should open inventory page and verify items are displayed', async ({ page }) => {
        await expect(page).toHaveURL(/.*inventory\.html/);

        const itemsCount = await inventoryPage.getInventoryItemsCount();
        expect(itemsCount).toBeGreaterThan(0);

        const itemNames = await inventoryPage.getItemNames();
        expect(itemNames.length).toBe(itemsCount);
    });

    test('should add items to cart and count items', async () => {
        // Initially, cart badge should not be visible
        const isCartBadgeVisible = await inventoryPage.isCartBadgeVisible();
        expect(isCartBadgeVisible).toBe(false);

        // Add first item to cart
        await inventoryPage.addToCartByIndex(0);
        let cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe('1');

        // Add second item to cart
        await inventoryPage.addToCartByIndex(1);
        cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe('2');

        // Add third item to cart
        await inventoryPage.addToCartByIndex(2);
        cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe('3');
    });

    test('should add items and open cart page', async ({ page }) => {
        // Add items to cart
        await inventoryPage.addToCartByIndex(0);
        await inventoryPage.addToCartByIndex(1);

        // Verify cart badge shows correct count
        const cartBadgeCount = await inventoryPage.getCartBadgeCount();
        expect(cartBadgeCount).toBe('2');

        // Open cart page
        await inventoryPage.openCart();
        await expect(page).toHaveURL(/.*cart\.html/);

        // Verify items in cart
        const cartItemsCount = await cartPage.getCartItemsCount();
        expect(cartItemsCount).toBe(2);

        // Verify cart badge still shows correct count
        const cartPageBadgeCount = await cartPage.getCartBadgeCount();
        expect(cartPageBadgeCount).toBe('2');
    });

    test('should proceed from cart to checkout', async ({ page }) => {
        // Add items to cart
        await inventoryPage.addToCartByName('Sauce Labs Backpack');
        await inventoryPage.addToCartByName('Sauce Labs Bike Light');

        // Open cart
        await inventoryPage.openCart();
        await expect(page).toHaveURL(/.*cart\.html/);

        // Verify items are in cart
        const itemNames = await cartPage.getItemNames();
        expect(itemNames).toContain('Sauce Labs Backpack');
        expect(itemNames).toContain('Sauce Labs Bike Light');

        // Proceed to checkout
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(/.*checkout-step-one\.html/);
    });

    test('should complete full checkout flow', async ({ page }) => {
        // Add items to cart
        await inventoryPage.addToCartByIndex(0);
        await inventoryPage.addToCartByIndex(1);

        // Open cart and verify
        await inventoryPage.openCart();
        const cartItemsCount = await cartPage.getCartItemsCount();
        expect(cartItemsCount).toBe(2);

        // Proceed to checkout
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(/.*checkout-step-one\.html/);

        // Fill shipping information
        await checkoutPage.fillShippingInformation('John', 'Doe', '12345');
        await checkoutPage.clickContinue();
        await expect(page).toHaveURL(/.*checkout-step-two\.html/);

        // Verify overview page
        const itemNamesInCheckout = await checkoutPage.getItemNames();
        expect(itemNamesInCheckout.length).toBe(2);

        // Verify price calculation
        const isPriceCorrect = await checkoutPage.verifyPriceCalculation();
        expect(isPriceCorrect).toBe(true);

        // Complete checkout
        await checkoutPage.clickFinish();
        await expect(page).toHaveURL(/.*checkout-complete\.html/);

        // Verify completion
        const isComplete = await checkoutPage.isOrderComplete();
        expect(isComplete).toBe(true);

        const completeHeader = await checkoutPage.getCompleteHeader();
        expect(completeHeader).toContain('Thank you for your order');
    });

    test('should remove item from cart', async ({ }) => {
        // Add items
        await inventoryPage.addToCartByIndex(0);
        await inventoryPage.addToCartByIndex(1);
        await inventoryPage.addToCartByIndex(2);

        // Open cart
        await inventoryPage.openCart();
        let cartItemsCount = await cartPage.getCartItemsCount();
        expect(cartItemsCount).toBe(3);

        // Remove one item
        await cartPage.removeItemByIndex(0);
        cartItemsCount = await cartPage.getCartItemsCount();
        expect(cartItemsCount).toBe(2);

        // Verify cart badge updated
        const cartBadgeCount = await cartPage.getCartBadgeCount();
        expect(cartBadgeCount).toBe('2');
    });

    test('should validate checkout requires all fields', async ({ }) => {
        // Add item and go to checkout
        await inventoryPage.addToCartByIndex(0);
        await inventoryPage.openCart();
        await cartPage.proceedToCheckout();

        // Try to continue without filling fields
        await checkoutPage.clickContinue();

        // Verify error message appears
        const isErrorVisible = await checkoutPage.isErrorVisible();
        expect(isErrorVisible).toBe(true);

        const errorMessage = await checkoutPage.getErrorMessage();
        expect(errorMessage).toContain('Error');
    });
});


// API -> 123123123
// Home -> 14 Jan
// Setting -> 14.01.2026

function converter(a: number, options: { format: 'short' | 'full' }) {

}

function converterToShort(a: number, options: { format: 'short' | 'full' }) {

}
