import { test, expect } from '@playwright/test';

test('Bài 3: Thêm 100 Todo và xóa số lẻ', async ({ page }) => {
    await page.goto('https://material.playwrightvn.com/03-xpath-todo-list.html');
    const inputTodo = page.locator('#new-task');
    const btnAdd = page.locator('#add-task');

    for (let i = 1; i <= 100; i++) {
        await inputTodo.fill(`Todo ${i}`);
        await btnAdd.click();
    }
    const listItems = page.locator('#task-list li');
    await expect(listItems).toHaveCount(100);


    for (let i = 1; i <= 100; i += 2) {
        const taskItem = listItems.filter({ hasText: `Todo ${i}` });
    }
    await expect(listItems).toHaveCount(50);
});