import { test, expect } from '@playwright/test';
import { RegisterPage } from './01-pom.ts'; 

test('Bài 1: Đăng ký thông tin người dùng và kiểm tra bảng', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    const testUser = 'minhduc';
    const testEmail = 'minhduc@gmail.com';

    await registerPage.openMaterialPage();

    await registerPage.gotoPage('Bài học 1: Register Page');

    await registerPage.fillUsername(testUser);
    await registerPage.fillEmail(testEmail);
    await registerPage.checkGender('male');
    await registerPage.fillOtherInformation();

    await registerPage.clickRegister();

  
    await page.waitForTimeout(1000); 

    const registeredData = await registerPage.getRegisteredData();
    
    expect(registeredData.username).toBe(testUser);
    expect(registeredData.email).toBe(testEmail);
});