# AUTH-01 — Đăng ký tài khoản

## Mục tiêu

Cho phép người dùng tạo tài khoản Wanderly từ Web hoặc Mobile bằng email, mật khẩu và tên hiển thị.

## Phạm vi đã thực hiện

- `POST /auth/register` kiểm tra request bằng schema dùng chung.
- Chuẩn hóa email và tên hiển thị trước khi lưu.
- Mã hóa mật khẩu bằng `scrypt` với salt ngẫu nhiên; không lưu mật khẩu thuần.
- Tạo `User`, `UserProfile` và `UserSession` trong một transaction.
- Trả access token 15 phút và refresh token ngẫu nhiên; database chỉ lưu SHA-256 của refresh token.
- Trả HTTP 409 khi email đã tồn tại và HTTP 422 khi request không hợp lệ.
- Thêm form `/register` cho React Web và màn hình `/register` cho React Native/Expo.
- Thêm biến môi trường URL API cho Web và Mobile.

## Quyết định kỹ thuật

- Dùng `scrypt` từ Node.js để tránh bổ sung native dependency và vẫn có password hashing chậm, có salt.
- Access token dùng chữ ký HMAC-SHA256. Production phải thay `JWT_ACCESS_SECRET` bằng secret ngẫu nhiên đủ mạnh.
- Refresh token được phát ngay khi đăng ký để response tuân theo API contract; logic login/refresh/revoke đầy đủ thuộc AUTH-02 và AUTH-03.

## Kiểm tra

- Typecheck API, Web và Mobile: đạt.
- Unit test API: 4 test đạt, gồm password hashing, normalization và validation.
- Build toàn workspace: đạt.

## Việc tiếp theo

- AUTH-02: đăng nhập, xác minh password, refresh token rotation và lưu token an toàn trên từng client.
