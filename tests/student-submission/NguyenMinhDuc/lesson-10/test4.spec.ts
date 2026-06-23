import { test, expect } from '@playwright/test';
import { PersonalNotesPage } from './01-pom';

test('Bài 4: Thêm note từ VNExpress và kiểm tra tính năng Search', async ({ page, context }) => {
    test.setTimeout(60000); 


    const vnexpressPage = await context.newPage();
    await vnexpressPage.goto('https://vnexpress.net/khoa-hoc-cong-nghe'); 
    
    const articles = await vnexpressPage.evaluate(() => {
        const results = [];
        const items = document.querySelectorAll('article.item-news');
        
        for (let i = 0; i < items.length; i++) {
            if (results.length >= 10) break; // 
            
            const titleEl = items[i].querySelector('h3.title-news a');
            const descEl = items[i].querySelector('p.description a');
            
            if (titleEl && descEl) {
                results.push({
                    title: titleEl.textContent?.trim() || '',
                    content: descEl.textContent?.trim() || ''
                });
            }
        }
        return results;
    });

    await vnexpressPage.close();


    const notesPage = new PersonalNotesPage(page);
    await notesPage.openMaterialPage();
    await notesPage.gotoPage('Bài học 4: Personal notes');

    for (const article of articles) {
        await notesPage.addNote(article.title, article.content);
    }

    const words = articles[0].title.split(' ');
    const searchKeyword = words.find(w => w.length > 4) || words[0]; 
    
    await notesPage.searchNote(searchKeyword);

    await page.waitForTimeout(1000); 
    
    const displayedTitles = await notesPage.getDisplayedNoteTitles();
    
    expect(displayedTitles.length).toBeGreaterThan(0);
    
    for (const title of displayedTitles) {
        expect(title.toLowerCase()).toContain(searchKeyword.toLowerCase());
    }
});