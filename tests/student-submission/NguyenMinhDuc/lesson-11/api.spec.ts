import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8080/api/user-management/v1';

test.describe('API Testing - Bài tập User Management', () => {

  test('Test 1a: Đăng nhập vào tài khoản Admin thành công', async ({ request }) => {
    const response = await request.post(`http://localhost:8080/api/user-management/v1/login.php`, {
      data: {
        email: 'admin@example.com', 
        password: 'password'
      }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token'); 
  });

  test('Test 1b: Đăng nhập vào tài khoản User thành công', async ({ request }) => {
    const response = await request.post(`http://localhost:8080/api/user-management/v1/login.php`, {
      data: {
        email: 'john@example.com', 
        password: 'password'
      }
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
  });

  test('Test 2: Create user success (tạo user và kiểm tra user)', async ({ request }) => {
    
    const loginRes = await request.post(`http://localhost:8080/api/user-management/v1/login.php`, {
      data: { email: 'admin@example.com', password: 'password' }
    });
    const loginBody = await loginRes.json();
    const adminToken = loginBody.token;

    const authHeaders = {
      'Authorization': `Bearer ${adminToken}`,
      'Content-Type': 'application/json'
    };

    const newEmail = `duc@example.com`;
    const newUserPayload = {
      name: 'duc',
      email: newEmail,
      password: 'StrongPassword123!',
      role: 'user'
    };
    
    let createdUserId = null; 

    await test.step('Step 1: tạo user mới', async () => {
      const createRes = await request.post(`http://localhost:8080/api/user-management/v1/users.php`, {
        headers: authHeaders,
        data: newUserPayload
      });
      
      expect(createRes.status()).toBe(201);
      
      const createBody = await createRes.json();
      expect(createBody).toHaveProperty('id');
      expect(createBody.email).toBe(newEmail);
      
      createdUserId = createBody.id; 
    });

    await test.step('Step 2: Lấy list user và kiểm tra', async () => {
      const listRes = await request.get(`http://localhost:8080/api/user-management/v1/users.php`, {
        headers: authHeaders
      });
      expect(listRes.status()).toBe(200);

      const userList = await listRes.json();
      
      const isUserCreated = userList.some(user => user.email === newEmail);
      expect(isUserCreated).toBeTruthy(); 
    });

    await test.step('Post-condition: Xoá user đã tạo', async () => {
      if (createdUserId) {
        const deleteRes = await request.delete(`http://localhost:8080/api/user-management/v1/users.php`, {
          headers: authHeaders
        });
        
        expect([200, 204]).toContain(deleteRes.status());
      }
    });

  });

});