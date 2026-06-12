## 1. Tổng quan về DOM (Document Object Model)
DOM mô tả cấu trúc của một trang web dưới dạng một cây (tree). Việc hiểu rõ các mối quan hệ giữa các Node là nền tảng để sử dụng Selector nâng cao.

### Các thành phần điều hướng Node:
*   **parentNode**: Node cha trực tiếp phía trên.
*   **firstChild / lastChild**: Node con đầu tiên hoặc cuối cùng của một node.
*   **previousSibling / nextSibling**: Node anh em nằm ngay trước hoặc ngay sau node hiện tại.

### Quy ước trong tài liệu:
*   **Màu đỏ**: Node gốc (Root node).
*   **Màu xanh dương**: Node hiện tại (Self).
*   **Màu vàng**: Node cần chú ý hoặc đối tượng cần tìm.

---

## 2. Các mối quan hệ (Relations) trong DOM
Tài liệu định nghĩa các mối quan hệ phục vụ việc viết XPath Axes:

| Mối quan hệ | Mô tả chi tiết |
| :--- | :--- |
| **self** | Chính là node hiện tại. |
| **parent** | Node nằm ngay phía trên trực tiếp của node hiện tại. |
| **children** | Các node con nằm ngay phía dưới trực tiếp của node hiện tại. |
| **ancestor** | Tổ tiên, bao gồm cha, ông, và các cấp cao hơn. |
| **descendant** | Hậu duệ, bao gồm tất cả các cấp con, cháu, chắt... bên dưới. |
| **sibling** | Các phần tử cùng cấp và có cùng một node cha. |
| **following** | Các node phía bên phải node hiện tại (không lấy con của node hiện tại). |
| **preceding** | Các node phía bên trái node hiện tại (không lấy các node tổ tiên). |
| **following-sibling** | Các node anh em cùng cha nằm phía sau node hiện tại (Following + Sibling). |
| **preceding-sibling** | Các node anh em cùng cha nằm phía trước node hiện tại (Preceding + Sibling). |

---

## 3. XPath Axes Methods (Phương thức trục)
Được sử dụng để chọn node dựa trên mối quan hệ tương đối, linh hoạt hơn đường dẫn tuyệt đối.

**Cấu trúc chung:** `//tag/relationship::tagname[@attr='value']`

### Các phương thức và Ví dụ:
*   **Wildcard (*)**: Khớp với tất cả các loại thẻ. VD: `//*`.
*   **child**: Tìm con trực tiếp. VD: `//form[@id='test-form']/child::button`.
*   **descendant**: Tìm tất cả con cháu mọi cấp. VD: `//form[@id='test-form']/descendant::input`.
*   **parent**: Tìm cha trực tiếp. VD: `//button[text()='Create Test Case']/parent::form`.
*   **ancestor**: Tìm tổ tiên. VD: `//button[@class='btn-edit']/ancestor::table`.
*   **following-sibling**: Tìm anh em phía sau. VD: `//label[@for='testName']/following-sibling::input`.
*   **preceding-sibling**: Tìm anh em phía trước. VD: `//button[@class='btn-reset']/preceding-sibling::button`.
*   **following**: Tìm tất cả node sau trong document. VD: `//h2[text()='Test Cases List']/following::button[@class='btn-run']`.
*   **preceding**: Tìm tất cả node trước trong document. VD: `//h2[text()='Test Execution Results']/preceding::td[@class='priority-high']`.
*   **ancestor-or-self**: Tổ tiên hoặc chính nó. VD: `//table[@id='test-table']/ancestor-or-self::span[contains(@class, 'status')]`.
*   **descendant-or-self**: Con cháu hoặc chính nó. VD: `//table[@id='test-table']/descendant-or-self::span[contains(@class, 'status')]`.

---

## 4. Các hàm và toán tử nâng cao trong XPath
*   **Truy cập thuộc tính**: Sử dụng ký hiệu `@`. VD: `//tagname[@attribute='value']`.
*   **Toán tử Logic**:
    *   **AND**: Tất cả điều kiện phải đúng. VD: `//element[@cond1 and @cond2]`.
    *   **OR**: Một trong các điều kiện đúng. VD: `//element[@cond1 or @cond2]`.
*   **Xử lý văn bản (Text)**:
    *   **text()**: Lấy giá trị văn bản trực tiếp. VD: `//element[text()='exact text']`.
    *   **contains()**: Kiểm tra chứa chuỗi con. VD: `//element[contains(text(), 'substring')]`.
    *   **normalize-space()**: Loại bỏ khoảng trắng thừa ở đầu, cuối và giữa văn bản.

1.  **Linh hoạt**: XPath Axes cho phép tìm kiếm phần tử khi chúng không có ID/Class cố định dựa trên vị trí tương đối.
2.  **Chính xác**: Kết hợp toán tử logic (AND/OR) và các hàm xử lý text (`contains`, `normalize-space`) giúp xử lý các trường hợp HTML phức tạp.