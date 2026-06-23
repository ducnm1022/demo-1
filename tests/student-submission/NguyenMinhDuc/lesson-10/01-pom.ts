import { Page, Locator } from '@playwright/test';
export class MaterialBasePage {
    page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    async openMaterialPage(): Promise<void> {
        await this.page.goto('https://material.playwrightvn.com/');
    }

    async gotoPage(pageName: string): Promise<void> {
        await this.page.locator(`//a[contains(text(), "${pageName}")]`).click();
    }
}


export class RegisterPage extends MaterialBasePage {
    xpathUsername = '//input[@id="username"]';
    xpathEmail = '//input[@id="email"]';
    xpathGenderMale = '//input[@id="male"]';
    xpathGenderFemale = '//input[@id="female"]';
    xpathHobbiesReading = '//input[@id="reading"]';
    xpathCountry = '//select[@id="country"]';
    xpathDob = '//input[@id="dob"]';
    xpathBio = '//textarea[@id="bio"]';
    btnRegister = '//button[normalize-space()="Register"]';
    tableLastRow = '//table/tbody/tr[last()]';

    constructor(page: Page) {
        super(page);
    }

    async fillUsername(username: string): Promise<void> {
        await this.page.locator(this.xpathUsername).fill(username);
    }

    async fillEmail(email: string): Promise<void> {
        await this.page.locator(this.xpathEmail).fill(email);
    }

    async checkGender(gender: string): Promise<void> {
        if (gender.toLowerCase() === 'male') {
            await this.page.locator(this.xpathGenderMale).check();
        } else if (gender.toLowerCase() === 'female') {
            await this.page.locator(this.xpathGenderFemale).check();
        }
    }

    async fillOtherInformation(): Promise<void> {
        await this.page.locator(this.xpathHobbiesReading).check();
        await this.page.locator(this.xpathCountry).selectOption({ label: 'United States' });
        await this.page.locator(this.xpathDob).fill('1990-01-01');
        await this.page.locator(this.xpathBio).fill('This is a test biography.');
    }

    async clickRegister(): Promise<void> {
        await this.page.locator(this.btnRegister).click();
    }
    
    async getRegisteredData(): Promise<{ username: string, email: string }> {
        const row = this.page.locator(this.tableLastRow);
        const username = await row.locator('td').nth(1).innerText();
        const email = await row.locator('td').nth(2).innerText();
        return { username, email };
    }
}

export class ProductPage extends MaterialBasePage {
    constructor(page: Page) {
        super(page);
    }

    async addProduct(productIndex: number, quantity: number): Promise<void> {
        const addToCartBtn = this.page.locator(`(//button[normalize-space()="Add to Cart"])[${productIndex}]`);
        for (let i = 0; i < quantity; i++) {
            await addToCartBtn.click();
        }
    }

    async getCartItemQuantity(productName: string): Promise<number> {
        const quantityText = await this.page.locator(`//tbody/tr[td[normalize-space()="${productName}"]]//td[3]`).innerText();
        return parseInt(quantityText, 10);
    }

    async getCartTotal(): Promise<number> {
        const totalText = await this.page.locator('//td[contains(text(),"Total Price:")]/following-sibling::td').innerText();
        return parseFloat(totalText.replace('$', ''));
    }
}

export class TodoPage extends MaterialBasePage {
    inputTask = '//input[@placeholder="Enter a new task"]';
    btnAdd = '//button[normalize-space()="Add Task"]';

    constructor(page: Page) {
        super(page);
    }

    async addTodo(content: string): Promise<void> {
        await this.page.locator(this.inputTask).fill(content);
        await this.page.locator(this.btnAdd).click();
    }

    async deleteTodo(content: string): Promise<void> {
        const todoItem = this.page.locator('li').filter({ hasText: content });
        await todoItem.locator('button').click();
    }

    getTodoLocator(content: string): Locator {
        return this.page.locator(`xpath=//*[text()="${content}"]`);
    }
}

export class PersonalNotesPage extends MaterialBasePage {
    inputSearch = '//input[@placeholder="Search notes..."]';
    inputTitle = '//input[@placeholder="Enter note title"]';
    inputContent = '//textarea[@placeholder="Enter note content"]';
    btnAdd = '//button[normalize-space()="Add Note"]';
    
noteTitles = '#notes-list strong';
    constructor(page: Page) {
        super(page);
    }

    async addNote(title: string, content: string): Promise<void> {
        await this.page.locator(this.inputTitle).fill(title);
        await this.page.locator(this.inputContent).fill(content);
        await this.page.locator(this.btnAdd).click();
    }

    async searchNote(keyword: string): Promise<void> {
        await this.page.locator(this.inputSearch).fill(keyword);
    }

    async getDisplayedNoteTitles(): Promise<string[]> {
        return await this.page.locator(this.noteTitles).allInnerTexts();
    }
}