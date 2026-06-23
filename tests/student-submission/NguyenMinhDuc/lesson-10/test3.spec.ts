import { test, expect } from '@playwright/test';
import { TodoPage } from './01-pom';

test('Bài 3: Thêm, xóa và kiểm tra danh sách Todo', async ({ page }) => {
    test.setTimeout(60000); 
    
    const todoPage = new TodoPage(page);

    await todoPage.openMaterialPage();
    await todoPage.gotoPage('Bài học 3: Todo page');

    for (let i = 1; i <= 100; i++) {
        await todoPage.addTodo(`Todo ${i}`);
    }


    page.on('dialog', async dialog => await dialog.accept());

    for (let i = 1; i <= 100; i += 2) {
        await todoPage.deleteTodo(`Todo ${i}`);
    }

    const todo90 = todoPage.getTodoLocator('Todo 90');
    await todo90.scrollIntoViewIfNeeded(); 
    await expect(todo90).toBeInViewport();


    const todo21 = todoPage.getTodoLocator('Todo 21');
    await expect(todo21).not.toBeAttached(); 
});