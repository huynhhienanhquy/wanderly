# AUTH-06 — Trang hồ sơ cá nhân

## Mục tiêu

Cho phép người dùng đã đăng nhập xem và cập nhật hồ sơ của chính mình trên Web và Mobile.

## Phạm vi đã thực hiện

- `GET /profile` và `PATCH /profile` được bảo vệ bằng Bearer token.
- User ID chỉ lấy từ access-token claims, không nhận từ body/path, ngăn sửa hồ sơ người khác.
- Cập nhật tên hiển thị, avatar URL, điện thoại, múi giờ và locale bằng contract dùng chung.
- Email hiển thị read-only.
- Trang `/profile` cho React Web và Expo Mobile.
- Mobile đọc access token từ SecureStore.

## Kiểm tra

- Unit test đọc/cập nhật đúng owner và xử lý user không hoạt động.
- Toàn bộ test API, typecheck và production build workspace đạt.

## Hoàn tất nhóm AUTH

Các task AUTH-01 đến AUTH-06 đã có implementation, kiểm thử và hồ sơ riêng.
