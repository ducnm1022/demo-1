import { test, expect } from '@playwright/test';

const loginpage = 'https://pw-practice-dev.playwrightvn.com/wp-admin';
const username = 'betterbytes.academy.admin';
const password = 'StrongPass@BetterBytesAcademy';

async function login(page, username, password) {
  await page.goto(loginpage);
  await page.getByLabel('Username or Email Address').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
}

async function logout(page) {
  await page.locator('#wp-admin-bar-my-account').hover();
  await page.locator('#wp-admin-bar-logout').click();
  await expect(page.locator('#loginform')).toBeVisible(); 
}

test.describe('ACCOUNT - Account', () => {

  test.beforeEach(async ({ page }) => {
    await test.step('Precondition: Đã login vào trang admin với account admin', async () => {
      await login(page, username, password);
    });
  });

  test('@ACC_001: Create account with editor permission', async ({ page }) => {
    const uniqueId = Date.now();
    const newUser = `k18_duc_${uniqueId}`;
    const newEmail = `k18_duc_${uniqueId}@test.com`;
    const newPass = `PassWord_Manh_123!@#`;

    await test.step('Đi tới màn quản lý user và kiểm tra UI', async () => {
      await page.getByRole('link', { name: 'Users', exact: true }).click();
      await expect(page.getByRole('heading', { name: 'Users', level: 1 })).toBeVisible();
      await expect(page.locator('.page-title-action').filter({ hasText: 'Add New' })).toBeEnabled();
    });

    await test.step('Thực hiện thêm mới user Role: Editor', async () => {
      await page.getByRole('link', { name: 'Add New', exact: true }).click();
      
      await page.locator('#user_login').fill(newUser);
      await page.locator('#email').fill(newEmail);
      await page.locator('#first_name').fill('K18');
      await page.locator('#last_name').fill('Duc');
      
      await page.locator('button.wp-generate-pw').click();
      await page.locator('#pass1').fill(newPass);
      
      await page.locator('#role').selectOption('editor');
      
      await page.locator('#createusersub').click();

      await expect(page.locator('#message')).toContainText('New user created.');
    });

    await test.step('Thực hiện đăng xuất và đăng nhập lại với user vừa tạo', async () => {
      await logout(page);
      await login(page, newUser, newPass);
      await expect(page).toHaveURL(/.*\/wp-admin/);
    });

    await test.step('Expected: Kiểm tra hiển thị Menu cho Editor', async () => {
      await expect(page.locator('#menu-dashboard')).toBeVisible();
      await expect(page.locator('#menu-posts')).toBeVisible();
      await expect(page.locator('#menu-media')).toBeVisible();
      await expect(page.locator('#menu-pages')).toBeVisible();
      await expect(page.locator('#menu-comments')).toBeVisible();
      await expect(page.locator('#menu-profile')).toBeVisible();
      await expect(page.locator('#menu-tools')).toBeVisible();

      await expect(page.locator('#menu-appearance')).toBeHidden();
      await expect(page.locator('#menu-users')).toBeHidden();
      await expect(page.locator('#menu-plugins')).toBeHidden();
    });

    await test.step('Teardown: Đăng nhập vào account admin và xoá account mới được tạo ra', async () => {
      await logout(page);
      await login(page, username, password);
      
      await page.getByRole('link', { name: 'Users', exact: true }).click();
      await page.locator('#user-search-input').fill(newUser);
      await page.locator('#search-submit').click();

      const userRow = page.locator('tbody#the-list tr').first();
      await userRow.hover();
      await userRow.getByRole('link', { name: 'Delete' }).click();
      
      await page.locator('#submit').click(); 

      await page.locator('#user-search-input').fill(newUser);
      await page.locator('#search-submit').click();
      await expect(page.locator('.no-items')).toContainText('No users found.');
    });
  });

  test('@ACC_002: Create account with subscriber permission', async ({ page }) => {
    const uniqueId = Date.now();
    const newUser = `k18_duc_sub`;
    const newEmail = `k18_duc_sub@test.com`;
    const newPass = `PassWord_Manh_123!@#`;

    await test.step('Đi tới màn quản lý user', async () => {
      await page.getByRole('link', { name: 'Users', exact: true }).click();
    });

    await test.step('Thực hiện thêm mới user Role: Subscriber', async () => {
      await page.getByRole('link', { name: 'Add New', exact: true }).click();
      
      await page.locator('#user_login').fill(newUser);
      await page.locator('#email').fill(newEmail);
      await page.locator('#first_name').fill('K18');
      await page.locator('#last_name').fill('Duc');
      
      await page.locator('button.wp-generate-pw').click();
      await page.locator('#pass1').fill(newPass);
      
      // Chọn Role Subscriber
      await page.locator('#role').selectOption('subscriber');
      
      await page.locator('#createusersub').click();
    });

    await test.step('Đăng xuất admin và đăng nhập Subscriber', async () => {
      await logout(page);
      await login(page, newUser, newPass);
    });

    await test.step('Expected: Kiểm tra hiển thị Menu cho Subscriber', async () => {
      await expect(page.locator('#menu-dashboard')).toBeVisible();
      await expect(page.locator('#menu-profile')).toBeVisible(); 

      await expect(page.locator('#menu-appearance')).toBeHidden();
      await expect(page.locator('#menu-users')).toBeHidden();
      await expect(page.locator('#menu-plugins')).toBeHidden();
      await expect(page.locator('#menu-posts')).toBeHidden();
      await expect(page.locator('#menu-media')).toBeHidden();
      await expect(page.locator('#menu-pages')).toBeHidden();
    });

    await test.step('Teardown: Xóa account', async () => {
      await logout(page);
      await login(page, username, password);
      
      await page.getByRole('link', { name: 'Users', exact: true }).click();
      await page.locator('#user-search-input').fill(newUser);
      await page.locator('#search-submit').click();

      const userRow = page.locator('tbody#the-list tr').first();
      await userRow.hover();
      await userRow.getByRole('link', { name: 'Delete' }).click();
      await page.locator('#submit').click(); 
    });
  });

});