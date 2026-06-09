import { test, expect } from '@playwright/test';

test('Bài 2: Thêm sản phẩm vào giỏ hàng', async ({ page }) => {
    await page.goto('https://material.playwrightvn.com/');
    await page.getByText('Bài học 2: Product page').click();

    for (let i = 0; i < 2; i++) {
        await page.locator('button[data-product-id="1"]').click();
    }

    for (let i = 0; i < 3; i++) {
        await page.locator('button[data-product-id="2"]').click();
    }

    await page.locator('button[data-product-id="3"]').click();
});