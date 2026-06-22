# Tóm Tắt Bài Học 10: TypeScript & Page Object Model (POM)
## 1. TypeScript (TS) và JavaScript (JS)

### 1.1. Khái niệm và Lý do ra đời
* **Định nghĩa:** TypeScript là **"superset"** của JavaScript (nghĩa là bản mở rộng của JavaScript).
* **Lý do ra đời:** JavaScript "dễ dãi" quá => sinh ra nhiều lỗi. TypeScript ra đời để "khó tính" hơn => giúp giảm bớt lỗi lại.

### 1.2. Quy trình thực thi
* Code TypeScript cần được biên dịch qua JavaScript trước khi chạy.
* **Các lệnh cần nhớ (Key takeaways):**
  * Biên dịch file TS thành JS: `npx tsc <file_path>`
  * Chạy file JS sau khi biên dịch: `node <file_path>`

### 1.3. Ưu điểm của TypeScript
Dùng TypeScript vì có nhiều ưu điểm so với JavaScript:
1. **Có hệ thống kiểu dữ liệu:** Giúp IDE gợi ý tốt hơn, người viết code hover là thấy gợi ý.
2. **Phát hiện lỗi sớm:** (Ví dụ: gọi sai tên thuộc tính sẽ báo lỗi ngay trên trình soạn thảo).
3. Hỗ trợ **Interface & type alias**.
4. Hỗ trợ các tính năng **OOP** (Hướng đối tượng) và **Generic**.

### 1.4. Định nghĩa kiểu dữ liệu (Define type)
Định nghĩa kiểu dữ liệu giúp code trở nên rõ ràng, dễ đọc hơn (CLEAN CODE).
* **Phân loại:**
  * Kiểu có sẵn (*Built-in types*): `number`, `string`, `boolean`, `void`, `null`, `undefined`, `any`.
  * Kiểu tự định nghĩa (*User-defined types*): `Arrays`, `Enums`, `Classes`, `Interfaces`, v.v.
* **Cách khai báo:** Thông qua `type` hoặc `interface`.
  * **Lưu ý quan trọng:** `type` thì CÓ dấu `=`, còn `interface` thì KHÔNG CÓ dấu `=`.
  * *Ví dụ:* * `type User = { name: string; }`
    * `interface User { name: string; }`

---

## 2. Page Object Model (POM)

### 2.1. POM là gì?
* POM là một design pattern - một cấu trúc code **"sạch đẹp, dễ bảo trì"**.
* Hiểu đơn giản, POM là việc biến mỗi trang web (Page) thành một **Class**, bao gồm:
  1. **Properties:** Các thành phần của trang web (các locators chứa địa chỉ phần tử).
  2. **Methods:** Các hành động trên trang web (ví dụ: fill username, click login...). **Lưu ý: Tên method luôn bắt đầu bởi động từ.**

### 2.2. Tại sao cần sử dụng POM? (So sánh)
Nếu **KHÔNG dùng POM** (code rải rác, trộn lẫn):
* Locators bị lặp lại nhiều nơi.
* Nếu UI thay đổi, phải sửa ở rất nhiều test case.
* Code dài dòng, khó đọc, khó maintain, không tái sử dụng được.

Khi **DÙNG POM**, mang lại 3 lý do (ưu điểm) chính:
1. **Dễ maintain (Bảo trì):** Locators được tập trung ở một chỗ.
2. **Code dễ đọc hơn.**
3. **Tái sử dụng code (Reusability).**

### 2.3. Tiêu chuẩn của POM
* **Lưu ý:** KHÔNG CÓ một chuẩn chung duy nhất nào cho POM!
* Cách viết POM sẽ linh hoạt dựa trên: *Framework, Ngôn ngữ, Author (Người viết), Sở thích, và Kinh nghiệm.*

---

## 3. Ví dụ
### File 1: `LoginPage.ts` (Class đại diện cho trang Login)
```typescript
import { Page } from '@playwright/test';

export class LoginPage {
  page: Page;
  // Properties: Các locators tập trung ở một chỗ (khai báo dạng string)
  usernameInput = '#username';
  passwordInput = '#password';
  loginButton = 'button[type="submit"]';

  // Constructor: Hàm tạo nhận page truyền vào
  constructor(page: Page) {
    this.page = page; 
  }

  // Methods: Các hành động bắt đầu bằng động từ
  async login(username: string, password: string) {
    // Dùng this.page thao tác với các properties đã lưu
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}
```

### File 2: `auth.spec.ts` (File Test)
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';

test('Login test', async ({ page }) => {
  // Khởi tạo đối tượng từ class và truyền page vào
  const loginPage = new LoginPage(page);
  
  await page.goto('https://example.com/login');
  
  // Tái sử dụng method login rất gọn gàng
  await loginPage.login('admin', 'password123');
});
```