## Testgroup/suite
* nhóm các test case vào với nhau. VD: feature return management -> test suite: refund -> bên trong chứa test case: 1. refund full price, partial refund, refund value = 0, refund âm ...
* sử dụng test.describe để tạo test suite

```
import { test, expect } from '@playwright/test'

 test.describe('Tên Nhóm Tính Năng (Ví dụ: Luồng Hoàn Tiền)', () => {
   test('Test case 1', async ({ page }) => { ... });
        await page.goto('https://store.shopify.com/refund'); 
        await page.click('#select-half-refund');             
        await page.click('#submit-btn');

   test('Test case 2', async ({ page }) => { ... });
 }); 
 ```
 ### Điều khiển thực thi nhanh (Modifiers)
* `test.describe.only('...')`: Chỉ chạy duy nhất nhóm này, bỏ qua các nhóm khác trong file (VD: đang viết code và muốn chạy debug nhanh một luồng).
* `test.describe.skip('...')`: Bỏ qua hoàn toàn nhóm này không chạy (Ví dụ: Tính năng đang bị lỗi chờ Dev sửa, chưa test được).

### Test Suites lồng nhau (Nested Suites)
* Có thể bọc `describe` con bên trong `describe` cha để chia nhỏ hệ thống thành các cụm tính năng chi tiết hơn. 
*(Lưu ý: Không nên lồng quá 3 cấp để tránh code bị thụt lề quá nhiều và rối mắt).*


```import { test, expect } from '@playwright/test';

test.describe('Feature: Return Management', () => {
  
  // 1. Test UI tổng quát nằm ngang hàng, ngay dưới describe cha
  test('Kiểm tra hiển thị UI màn hình Dashboard Return Management', async ({ page }) => { 
    // Code 
  });

  // 2. Nhóm test luồng refund (Nằm gọn trong một cái hộp riêng)
  test.describe('Luồng Refund', () => {
    test('Refund full price thành công', async ({ page }) => { /* ... */ });
    // code
    test('Refund partial price thành công', async ({ page }) => { /* ... */ });
    // code
    test('Báo lỗi khi Refund value âm', async ({ page }) => { /* ... */ });
    // code
  });

  // 3. Nhóm test luồng exchange (Nằm gọn trong một cái hộp riêng khác)
  test.describe('Luồng Exchange', () => {
    test('Đổi sang sản phẩm size khác thành công', async ({ page }) => { /* ... */ });
    // code
  });

});
```

## Hook

### Khái niệm và Vai trò
* **Định nghĩa:** Playwright gọi các thời điểm chạy test hoặc chạy suite là các **Hooks**.
* **Mục đích:** Cho phép  "chèn" các đoạn code (**Setup**) hoặc (**Cleanup**) tại các thời điểm cụ thể trong vòng đời của một bài test. Thay vì phải viết đi viết lại một đoạn code cho nhiều bài test, chỉ cần khai báo nó một lần duy nhất trong Hook.

### Các thời điểm thực thi (Execution Timing)
Hooks được phân loại dựa trên hai cấp độ chạy:
* **Cấp độ Suite :** Ảnh hưởng đến toàn bộ các bài test nằm bên trong khối `test.describe`.
* **Cấp độ Test :** Ảnh hưởng trực tiếp và lặp lại trước/sau mỗi hàm `test()`.

### Danh sách các Hooks chi tiết

### 1. `beforeAll`
* **Thời điểm:** Thực hiện TRƯỚC KHI chạy bài test đầu tiên của suite.
* **Tần suất:** Chỉ chạy duy nhất **1 lần** cho toàn bộ các bài test trong cùng một nhóm.
* **Thực tế:** Thường dùng để chuẩn bị dữ liệu lớn (ví dụ: Gọi API tạo một tài khoản Test mới trên Shopify Store, kết nối Cơ sở dữ liệu).

### 2. `beforeEach`
* **Thời điểm:** Thực hiện ngay TRƯỚC MỖI bài test riêng lẻ.
* **Tần suất:** Nếu suite có 5 bài test, `beforeEach` sẽ chạy lặp lại đúng **5 lần**.
* **Thực tế:** Thường dùng để mở trình duyệt, điều hướng thẳng tới link của App cần test (ví dụ: Trang quản lý Đổi trả).

### 3. `afterEach`
* **Thời điểm:** Thực hiện ngay SAU MỖI bài test riêng lẻ (bất kể bài test đó Pass hay Fail).
* **Tần suất:** Chạy lặp lại sau mỗi bài test kết thúc.
* **Thực tế:** Thường dùng để xóa Cookies, làm sạch Local Storage, hoặc tự động chụp ảnh màn hình (Screenshot) nếu bài test bị lỗi dễ debug.

### 4. `afterAll`
* **Thời điểm:** Thực hiện SAU KHI chạy xong bài test cuối cùng trong suite.
* **Tần suất:** Chỉ chạy duy nhất **1 lần** cuối cùng để đóng suite.
* **Thực tế:** Thường dùng để dọn dẹp dữ liệu rác, đóng kết nối DB, hoặc tắt hoàn toàn môi trường test.

## Luồng hoạt động
**`beforeAll`** (Khởi động suite - Chạy 1 lần duy nhất)
**`beforeEach`** (Chuẩn bị môi trường cho Test 1)
**`Test 1`** (Thực thi kịch bản kiểm thử thứ nhất)
**`afterEach`** (Dọn dẹp sau khi Test 1 xong)
**`beforeEach`** (Chuẩn bị môi trường cho Test 2)
**`Test 2`** (Thực thi kịch bản kiểm thử thứ hai)
**`afterEach`** (Dọn dẹp sau khi Test 2 xong)
**`afterAll`** (Đóng toàn bộ suite - Chạy 1 lần duy nhất)

## Assertion

Khái niệm cơ bản
* **Định nghĩa:** Assertion trong lập trình có nghĩa là "khẳng định" hoặc "xác nhận".
* **Chức năng:** Là một câu lệnh dùng để kiểm tra xem một điều gì đó ở thực tế có đúng như mong đợi (expected) hay không.
* **Tầm quan trọng:** Nếu không có assertion, kịch bản tự động của bạn chỉ là một con bot biết click dạo. Chúng ta sẽ không thể biết bài test đó Pass (thành công) hay Fail (thất bại).
* **Cách thức:** Playwright thực hiện assert thông qua hàm `expect`.

---

## 2. Sự khác biệt giữa "Không có" và "Có" Assertion

| Không có Assertion (Chỉ hành động) | Có Assertion (Kiểm tra kết quả) |
| :--- | :--- |
| Chỉ ra lệnh cho máy thực hiện hành động. | Hành động xong phải kiểm tra xem kết quả có đúng không. |
| **Ví dụ:** `await page.click('#submit-btn')` | **Ví dụ:** `await expect(page.locator('.success-msg')).toBeVisible()` |
| **Tư duy:** "Tôi click vào nút Xác nhận" | **Tư duy:** "Tôi kiểm tra xem thông báo thành công có hiển thị không" |

---

## 3. Các loại Assertion trong Playwright

Playwright chia Assertion ra làm 2 nhóm chính:

### 3.1. Generic Assertions (Khẳng định dữ liệu cơ bản)
Dùng để kiểm tra các giá trị dữ liệu thuần túy (số, chữ, mảng) thường trả về từ API hoặc các phép tính toán.
* **Công thức chung:** `expect(giá trị_thực_tế).toBe(giá trị_mong_đợi)`

```
// Kiểm tra toán học cơ bản
expect(2 + 3).toBe(5);

// Kiểm tra số tiền hoàn lại (Refund amount)
const refundAmount = 150;
expect(refundAmount).toBe(150);

// Kiểm tra mảng (ví dụ danh sách ID sản phẩm lỗi)
const defectiveItems = ['item_1', 'item_2', 'item_3'];
expect(defectiveItems).toHaveLength(3);
expect(defectiveItems).toContain('item_2');
```

### 3.2. Web-first Assertions (Khẳng định Web thông minh - Tự động chờ)
Đây là "đặc sản" của Playwright, thiết kế riêng cho các phần tử web (nút bấm, ô chữ, tiêu đề). 

💡 **Cơ chế Auto-waiting (Ưu điểm vượt trội):**
* **Chờ linh hoạt (Flexible wait):** Mặc định Playwright sẽ tự động chờ tối đa **5 giây** cho đến khi điều kiện đúng.
* **Không lãng phí thời gian:** Khác với "chờ cứng" (hard sleep) luôn bắt máy tính ngâm đủ 5 giây, Web-first Assertion sẽ quét liên tục. Nếu cái nút hiện ra ở giây thứ 1, nó sẽ lập tức báo Pass và chạy tiếp ngay, bỏ qua 4 giây còn lại. Cực kỳ tối ưu!

**Các nhóm Web-first Assertion phổ biến:**

**A. Trạng thái phần tử (Element State)**
```
// Kiểm tra nút có đang hiển thị không
await expect(page.locator('#btn-create-return')).toBeVisible();

// Kiểm tra popup lỗi đã bị ẩn đi chưa
await expect(page.locator('.error-popup')).toBeHidden();

// Kiểm tra nút "Xác nhận" đã được bật lên chưa (sau khi điền đủ form)
await expect(page.locator('#submit-btn')).toBeEnabled();

// Kiểm tra Checkbox "Tôi đồng ý với chính sách" đã được tích chưa
await expect(page.locator('#agree-policy-checkbox')).toBeChecked();
```

**B. Văn bản & Nội dung (Text & Content)**
```
// Kiểm tra thông báo có CHỨA đoạn text mong muốn (chỉ cần chứa một phần)
await expect(page.locator('.toast')).toContainText('thành công');

// Kiểm tra CHÍNH XÁC toàn bộ nội dung văn bản
await expect(page.locator('.page-title')).toHaveText('Yêu cầu Hoàn Tiền');

// Kiểm tra nội dung của nhiều phần tử cùng lúc (VD: Danh sách menu)
await expect(page.locator('.menu-items')).toHaveText(['Hoàn tiền', 'Đổi hàng', 'Cài đặt']);
```

**C. Thuộc tính & Tính chất (Attributes & Properties)**
```
// Kiểm tra ô Input số lượng sản phẩm đang có giá trị là "2"
await expect(page.locator('input[name="quantity"]')).toHaveValue('2');

// Kiểm tra số lượng phần tử trả về (Ví dụ: Có đúng 3 sản phẩm trong giỏ hàng)
await expect(page.locator('.product-item')).toHaveCount(3);

// Kiểm tra thuộc tính (Ví dụ: Ảnh sản phẩm có chứa đúng link không)
await expect(page.locator('.product-image')).toHaveAttribute('src', 'ao-thun.png');
```

**D. Kiểm tra trang (Page Assertions)**
```
// Xác nhận đã điều hướng đúng sang trang Refund chưa
await expect(page).toHaveURL('https://my-store.com/apps/returns/refund');

// Xác nhận tiêu đề (Title) của tab trình duyệt
await expect(page).toHaveTitle('Shopify - Return Management');
```