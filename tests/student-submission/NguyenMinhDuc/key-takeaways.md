### 1. Tổng quan về API
**Định nghĩa:** API (Application Programming Interface) là bộ quy tắc cho phép các phần mềm giao tiếp với nhau. Nó đóng vai trò như một "cầu nối" giúp các hệ thống làm việc cùng nhau mà không cần biết chi tiết logic lập trình bên trong của nhau.

**Lợi ích của API Testing:**
* Đảm bảo API trả về dữ liệu chính xác và xử lý logic đúng thiết kế ban đầu.
* Phát hiện bug sớm ở tầng Backend trước khi chúng hiển thị lên Frontend/Giao diện người dùng.
* Đánh giá rủi ro bảo mật (tránh lộ lọt dữ liệu nhạy cảm) và hiệu năng (khả năng chịu tải, tốc độ phản hồi).
* Cho phép QA test độc lập các luồng dữ liệu mà không cần chờ team Dev hoàn thiện xong giao diện (UI).

---

### 2. Các Thành Phần Chính Của API

| Thành phần | Mô tả chi tiết 
| **Endpoint (URL)** | Địa chỉ định danh dùng để truy cập tài nguyên cụ thể trên server. |
| **Request (Yêu cầu)** | Dữ liệu gửi đi, bao gồm: **Headers** (chứa token, content-type), **Parameters** (tham số gắn trên URL), và **Body** (dữ liệu gửi lên server, thường dùng JSON/XML). |
| **Response (Phản hồi)**| Kết quả server trả về, bao gồm: **Status Code** (mã trạng thái), **Headers**, và **Body** (dữ liệu kết quả). |
| **API Documentation** | Tài liệu hướng dẫn sử dụng các endpoint, cấu trúc request/response (Công cụ phổ biến: Swagger, Postman Document). |

**Các HTTP Methods Phổ Biến:**
* **GET:** Lấy/Đọc dữ liệu từ server.
* **POST:** Tạo mới dữ liệu trên server.
* **PUT / PATCH:** Cập nhật dữ liệu (PUT thường cập nhật toàn bộ, PATCH cập nhật một phần).
* **DELETE:** Xóa dữ liệu khỏi server.

---

### 3. Định Dạng Dữ Liệu JSON
* **Đặc điểm:** Định dạng phổ biến nhất hiện nay, nhẹ, dễ đọc cho cả người thao tác và máy tính, tương thích với hầu hết các ngôn ngữ lập trình.
* **Cấu trúc:** Cấu tạo từ các cặp `Key: Value` đặt trong dấu ngoặc nhọn `{}`.
* **Quy tắc Key:** Luôn bắt buộc là kiểu String (chuỗi) và không được phép trùng lặp trong cùng một cấp độ.
* **Quy tắc Value:** Có thể nhận các kiểu dữ liệu: String, Number, Boolean, Null, Object, hoặc Array (Mảng).

---

### 4. Công Cụ Gọi API Phổ Biến
* **Command Line (Dòng lệnh):** Sử dụng `cURL` để gọi API trực tiếp từ Terminal/CMD.
* **Giao diện đồ họa (GUI):** Sử dụng **Postman**. Giao diện chính bao gồm Sidebar (quản lý Collections, Environments, History) và Main Workspace (tạo request, cài đặt header/body và xem response).
* **Automation (Tự động hóa):** Sử dụng framework **Playwright**.

---

### 5. Automation API Testing Với Playwright

Playwright cung cấp sẵn `request` fixture để thực hiện gọi API trực tiếp trong code, bỏ qua hoàn toàn thao tác render giao diện trình duyệt, giúp tốc độ test cực kỳ nhanh.

```javascript
test("Kiểm tra API lấy danh sách dữ liệu", async ({ request }) => {
  // 1. Gọi API
  const response = await request.get('[https://api.example.com/data](https://api.example.com/data)');
  
  // 2. Xử lý dữ liệu phản hồi
  const responseJSON = await response.json(); // Chuyển phản hồi thành Object để dễ assert
  // const responseText = await response.text(); // Dùng khi cần lấy nguyên bản chuỗi văn bản
  
  // 3. Thực hiện Assertions (Kiểm tra)
  expect(response.status()).toBe(200);
  expect(responseJSON.data.length).toBe(7);
});