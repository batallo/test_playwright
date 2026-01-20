import { test, expect } from '@playwright/test';
import { InventoryPage } from '../page_object/inventory_page';
import { CartPage } from '../page_object/cart_page';
import { PageFactory } from '../page_object/page_factory';

test.describe('Saucedemo E2E Tests', () => {
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        const factory = PageFactory.getInstance(page);

        inventoryPage = factory.inventoryPage
        cartPage = factory.cartPage

        await inventoryPage.navigate();
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
});

// Base Page
// Login Page <= Base Page
// UserPage <= Base Page
// CartPage <= UserPage
// ...