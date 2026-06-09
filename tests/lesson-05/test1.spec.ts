import { test, expect } from '@playwright/test';

test('Bài 1: Điền form User Registration', async ({ page }) => {
    await page.goto('https://material.playwrightvn.com/');
    await page.getByText('Bài học 1: Register Page').click();
    await page.locator('#username').fill('duc.nm10');
    await page.locator('#email').fill('duc@gmail.com');
    await page.locator('#male').check();
    await page.locator('#reading').check();
    await page.locator('#traveling').check();
    await page.locator('#interests').selectOption(['Technology', 'Science', 'Art']);
    await page.locator('#country').selectOption({ label: 'United States' });
    await page.locator('#dob').fill('1999-10-22');
    await page.locator('#profilePicture').setInputFiles('avatar.png');
    await page.locator('#bio').fill('123');

    await page.getByRole('button', { name: 'Register' }).click();
});