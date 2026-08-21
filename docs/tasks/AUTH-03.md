# AUTH-03 — Đăng xuất và thu hồi session

## Mục tiêu

Cho phép người dùng kết thúc phiên hiện tại và bảo đảm refresh token không thể tiếp tục được sử dụng.

## Phạm vi đã thực hiện

- `POST /auth/logout` nhận refresh token và thu hồi session tương ứng.
- Endpoint có tính idempotent: token đã hết hạn/thu hồi vẫn trả thành công.
- Web xóa access/refresh token khỏi `sessionStorage` kể cả khi API tạm thời lỗi.
- Mobile xóa token khỏi Expo SecureStore kể cả khi API tạm thời lỗi.
- Thêm trang `/logout` cho Web và Mobile.

## Kiểm tra

- Unit test xác minh session được thu hồi và controller chuyển token hợp lệ tới service.
- Typecheck và build toàn workspace đạt.

## Việc tiếp theo

- AUTH-04: quên và đặt lại mật khẩu.
