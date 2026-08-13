# ADMIN-01 — Admin guard và RBAC nền tảng

## Mục tiêu

Không cho người dùng thường truy cập route quản trị.

## Phạm vi hoàn thành

- Tạo `AdminGuard` cho Web route.
- Chỉ render nội dung khi role hiện tại là `ADMIN`.
- Redirect về trang chủ nếu thiếu quyền.
- Bọc route `/admin/reports` bằng guard.

## Kiểm tra

- `pnpm typecheck` đạt toàn workspace.

## Giới hạn

Role hiện đọc từ `localStorage` để phù hợp MVP local. Không xem đây là cơ chế bảo mật production; backend phải xác thực JWT/session và kiểm tra role độc lập.

## Việc tiếp theo

- Kết nối guard với auth context và endpoint `/me`.
- Bổ sung server-side RBAC cho toàn bộ admin API.
