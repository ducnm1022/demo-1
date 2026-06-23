import { test, expect } from '@playwright/test';
import { ProductPage } from './01-pom';

test('Bài 2: Thêm sản phẩm vào giỏ hàng và kiểm tra', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.openMaterialPage();
    await productPage.gotoPage('Bài học 2: Product page');

    await productPage.addProduct(1, 2); 
    await productPage.addProduct(2, 3); 
    await productPage.addProduct(3, 1); 

    await page.waitForTimeout(1000);

    const qtyProduct1 = await productPage.getCartItemQuantity('Product 1');
    const qtyProduct2 = await productPage.getCartItemQuantity('Product 2');
    const qtyProduct3 = await productPage.getCartItemQuantity('Product 3');

    expect(qtyProduct1).toBe(2);
    expect(qtyProduct2).toBe(3);
    expect(qtyProduct3).toBe(1);

    const expectedTotal = (2 * 10) + (3 * 20) + (1 * 30);
    
   
    const actualTotal = await productPage.getCartTotal();

    expect(actualTotal).toBe(expectedTotal);
});