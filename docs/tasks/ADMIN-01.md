# ADMIN-01 — Admin layout và route guard

## Trạng thái

Done — 2026-08-18.

## Kết quả

- Route `/admin/reports` được bọc bởi `AdminGuard`.
- Guard lấy access token từ session và gọi `GET /auth/admin-check`.
- Trong lúc xác minh, giao diện hiển thị trạng thái tải; tài khoản thiếu token hoặc không có quyền được chuyển tới `/login`.
- Quyền truy cập không còn phụ thuộc vào role do trình duyệt tự lưu. Backend vẫn là nơi quyết định quyền bằng `AuthGuard` và `RolesGuard`.

## Kiểm thử

- Unit test xác nhận guard API gửi Bearer token.
- API, Web, Web build và typecheck toàn workspace đạt.
