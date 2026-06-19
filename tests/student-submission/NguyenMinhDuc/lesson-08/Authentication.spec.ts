import { test, expect } from '@playwright/test';

const loginpage = 'https://pw-practice-dev.playwrightvn.com/wp-admin';
const username = 'betterbytes.academy.admin';
const password = 'StrongPass@BetterBytesAcademy';

test.describe('AUTH - Authentication', () => {


  test.beforeEach(async ({ page }) => {
    await test.step('Precondition: Đi tới trang login', async () => {
      await page.goto(loginpage);
    });
  });

  test('@AUTH_001: Login fail', async ({ page }) => {
    const wrongUser = 'wrong_username';
    const wrongPass = 'wrong_password';

    await test.step('Nhập vào thông tin username, password bị sai', async () => {
      await page.getByLabel('Username or Email Address').fill(wrongUser);
      await page.getByLabel('Password').fill(wrongPass);
    });

    await test.step('Click button login', async () => {
      await page.getByRole('button', { name: 'Log In' }).click();
    });

    await test.step('Expected: Kiểm tra giá trị được giữ nguyên và hiển thị thông báo lỗi', async () => {
      await expect(page.getByLabel('Username or Email Address')).toHaveValue(wrongUser);
      
      const errorMessage = page.locator('#login_error');
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText(`Error: The username ${wrongUser} is not registered on this site.`);
    });
  });

  test('@AUTH_002: Login success', async ({ page }) => {
    await test.step('Nhập vào thông tin username, password đúng', async () => {
      await page.getByLabel('Username or Email Address').fill(username);
      await page.getByLabel('Password').fill(password);
    });

    await test.step('Click button login', async () => {
      await page.getByRole('button', { name: 'Log In' }).click();
    });

    await test.step('Expected: Login thành công, chuyển hướng và hiển thị Heading', async () => {
      await expect(page).toHaveURL(/.*\/wp-admin/);
      
      const heading = page.getByRole('heading', { name: 'Dashboard', level: 1 });
      await expect(heading).toBeVisible();
    });
  });

});