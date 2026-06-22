import { Page, Locator } from '@playwright/test';

export class MaterialBasePage {
  page: Page;
  xpathRegisterPage: string;
  xpathProductPage: string;
  cssTodoPage: string;
  personalNote: Locator;

  constructor(page: Page) {
    this.page = page; 
  }

  async openMaterialPage() {
    
  }

  async gotoPage(pageName: string) {
    
  }
}

export class RegisterPage extends MaterialBasePage {
  xpathUsername: string;
  xpathEmail: string;
  xpathGenderMale: string;
  xpathGenderFemale: string;

  constructor(page: Page) {
    super(page); // 
  }

  async fillUsername() {
    
  }

  async fillEmail() {
    
  }

  async checkGender(gender: string) {
    
  }
}