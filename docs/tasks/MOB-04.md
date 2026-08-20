# MOB-04 — Auth and secure session

## Mục tiêu

Hoàn thiện Login/Register/Logout và token rotation bằng SecureStore trên native.

## Thay đổi

- Access/refresh token lưu bằng Expo SecureStore trên Android/iOS; sessionStorage chỉ dùng Web fallback.
- Thêm refresh flow gọi `/auth/refresh`, rotate cả hai token và xóa session khi refresh bị từ chối.
- Khởi tạo shared typed mobile API client có bearer token và automatic one-time refresh.
- Login/Register dùng runtime config và điều hướng sau thành công; Logout thu hồi server session trước khi xóa local.
- Request/response auth tiếp tục được kiểm tra qua shared Zod contracts.

## Kiểm tra

`pnpm --filter @wanderly/mobile typecheck && pnpm --filter @wanderly/mobile build`

## Kết quả

Task hoàn tất ngày 2026-08-20.
