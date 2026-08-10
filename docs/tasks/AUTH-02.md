# AUTH-02 — Đăng nhập và refresh token

## Mục tiêu

Cho phép người dùng đăng nhập bằng email/mật khẩu và duy trì phiên bằng refresh token có thể xoay vòng.

## Phạm vi đã thực hiện

- `POST /auth/login` xác minh tài khoản active và password hash.
- Thông báo đăng nhập sai không tiết lộ email có tồn tại hay không.
- Tạo session mới, cập nhật `lastLoginAt`, phát access token 15 phút và refresh token 30 ngày.
- `POST /auth/refresh` chỉ chấp nhận session chưa thu hồi và chưa hết hạn.
- Refresh-token rotation: thu hồi session cũ và tạo session mới trong một transaction.
- Form đăng nhập `/login` cho React Web và màn hình `/login` cho Expo Mobile.
- Lưu token trong `sessionStorage` trên Web và Expo Web.
- Lưu token mã hóa bằng `expo-secure-store` trên Android/iOS (Android Keystore và iOS Keychain).

## Quyết định kỹ thuật

- Database chỉ lưu SHA-256 của refresh token; token gốc chỉ được trả cho client.
- Tài khoản `LOCKED` hoặc `DELETED` bị từ chối như thông tin đăng nhập sai.
- Mỗi lần refresh tạo token ngẫu nhiên mới và vô hiệu token cũ để hạn chế replay.
- Dùng `expo-secure-store` phiên bản tương thích Expo SDK 54 để lưu session Mobile.

## Kiểm tra

- 10 unit test auth đạt: hashing, validation, login, session creation, rotation và chống refresh đồng thời.
- Typecheck đủ API, Contracts, Web và Mobile: đạt.
- Production build đủ bốn workspace package: đạt.

## Việc tiếp theo

- AUTH-03: logout, thu hồi session hiện tại và xóa token trên client.
- Bổ sung cơ chế tự gọi refresh khi access token hết hạn vào API client dùng chung.
