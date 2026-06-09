##  DOM
● Máy tính sẽ “nhìn” ở dưới dạng “cây có cấu trúc”
● Mở cây này bằng cách bấm phím F12 (hoặc chuột phải vào vùng trống, chọn “Inspect”); sau đó chọn tab “Elements”
● Cấu trúc này gọi là DOM (Document Object Model)

## CẤU TRÚC CỦA 1 THẺ 
Cấu trúc tiêu biểu của một thẻ bao gồm các thành phần sau:
// <option value="usa">United States</option>

● Thẻ/tag mở: <option
● Thuộc tính: value
● Giá trị của thuộc tính: "usa"
● Text (Nội dung hiển thị): United States
● Thẻ đóng: </option>

## CÁC THẺ TIÊU CHUẨN THƯỜNG GẶP
### 1. Thẻ Cấu Trúc khung trang
● <html> : Thẻ gốc của trang
● <head> : Chứa metadata: tiêu đề website, hiển thị google
● <body> : Nội dung của cả website hiển thị

### 2. Thẻ Bố Cục & Ngữ nghĩa
● <div> : Khối/container chung
● <header>, <footer>, <nav>, <section> : Thẻ ngữ nghĩa

### 3. Thẻ Nội Dung
● <h1> đến <h6> : Tiêu đề
● <paragraph> : Đoạn văn
● <ul>, <ol>, <li> : Danh sách

### 4. Thẻ Tương Tác & Media
● <a> : Liên kết
● <img> : Hình ảnh

### 5. Thẻ Form
● <form> : Biểu mẫu
● <input> : Ô nhập liệu (text, password, checkbox, radio, etc.)
● <button> : Nút bấm
● <select> và <option> : Dropdown
● <textarea> : Vùng văn bản nhiều dòng

## Selector
- Automation thực chất là **tương tác** với web (Input, Fill, Click,...).
- Nhưng để tương tác được, script của mình phải **TÌM** được đúng phần tử (element). 
- **Selector** sinh ra làm công cụ để giải quyết việc **TÌM** kiếm này.

## 3 Loại Selector
* **Playwright Selector (Nên ưu tiên):**
- cú pháp ngắn gọn.
- Không phụ thuộc cấu trúc DOM, tư duy theo kiểu "người dùng nhìn thấy gì thì tìm cái đó".
   

* **CSS Selector:**
- Viết ngắn gọn, performance lúc run test cao.
- Hợp với các element cấu trúc đơn giản, dễ tìm. Nhược điểm là kém linh hoạt hơn XPath.

* **XPath:**
- Đa năng, cân được 99.99% các trường hợp khó nhằn nhất.
- Hơi dài dòng một chút. *Ví dụ:* `//button[normalize-space() = 'Add to cart']`.

## XPath: Tuyệt Đối vs Tương Đối
**XPath Tuyệt Đối (Dùng dấu `/`) - Hạn chế tối đa:**
- Bắt đầu từ root (gốc) và đi dọc theo cây DOM (VD: `/html/body/div/input`).
- Nhược điểm Rất dễ gãy (flaky). Dev chỉ cần bọc thêm 1 thẻ div là fail test ngay. Chỉ xài khi cực kỳ chắc chắn cấu trúc đó nằm chết 1 chỗ không bao giờ đổi.

**XPath Tương Đối (Dùng dấu `//`) - Dùng trong 99% trường hợp:**
- Nhảy thẳng vào tìm element ở *bất kỳ đâu* trong DOM.
- Linh hoạt, ít bị ảnh hưởng khi Dev update UI/HTML (đỡ tốn công maintain script cho anh em). VD:`//tenthe[@thuoctinh="gia tri"]`

// Khi viết XPath tương đối, luôn ưu tiên kẹp thêm các attributes độc nhất như `@id`, `@class`, `@name` để target chính xác 100% element cần tìm.


## Playwright Basic Syntax
**Nguyên lý cốt lõi:** Automation = Tương tác (Interact) + Xác nhận (Verify).

### 1. Tổ Chức Cấu Trúc File Test
- test: Đơn vị cơ bản, to nhất để khai báo 1 test case.
- step: Đơn vị nhỏ hơn trong test, dùng để khai báo từng bước của test case.
- Lưu ý: Step nên map 1-1 với test case (trên Jira/Excel) để dễ maintain.

**Cấu trúc chuẩn:**
import { test } from '@playwright/test';

test('<tên test>', async ({ page }) => {
    await test.step('Tên step', async () => {
        // Code here
    });
});

---

### 2. Tìm Kiếm & Điều Hướng
- Navigate (Trỏ đi đến đâu): `await page.goto('https://pw-practice.playwrightvn.com/');`
- Locate (Chọn phần tử trên trang): `page.locator("//input[@id='email']")`

---

### 3. Tương Tác Cơ Bản (Core Actions)

### Click
* **Single click:** `await page.locator("//button").click();`
* **Double click:** `await page.locator("//button").dblclick();`
* **Click chuột phải:** `await page.locator("//button").click({ button: 'right' });`
* **Click chuột kèm bấm phím khác (Shift, Ctrl...):** `await page.locator("").click({ modifiers: ['Shift'] });`

### Input
* **fill:** Giống việc bạn paste content vào một ô input. VD: `await page.locator("//input").fill('Playwright Viet Nam');`
* **pressSequentially:** Giống việc bạn gõ từng chữ cái vào ô input (thường dùng khi cần giả lập gõ chậm). VD: `await page.locator("//input").pressSequentially('Playwright Viet Nam', { delay: 100 });`

### Checkbox & Radio Button
* **Lấy giá trị hiện tại (đang check hay không):** `const isChecked = await page.locator("//input").isChecked();`
* **Check:** `await page.locator("//input").check();`
* **Uncheck / Cài đặt giá trị cụ thể:** `await page.locator("//input").setChecked(false);`

### Dropdown (Select)
* **Chọn option theo label:** `await page.locator('//select[@id="country"]').selectOption({ label: 'USA' });`

### Upload File
* **Đẩy file thẳng vào input:** `await page.locator("//input[@id='profile']").setInputFiles("<file-path>");`