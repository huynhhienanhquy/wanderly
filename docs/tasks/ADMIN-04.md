# ADMIN-04 — Quản lý review/report

## Mục tiêu

Cho phép quản trị viên xem và đánh dấu xử lý các báo cáo review.

## Phạm vi hoàn thành

- Tạo route Web `/admin/reports`.
- Đọc danh sách báo cáo từ adapter local và hiển thị trạng thái.
- Cho phép đánh dấu một báo cáo đã xử lý, chống xử lý lặp.

## Kiểm tra

- `pnpm typecheck` đạt toàn workspace.

## Giới hạn

Route hiện chưa được bảo vệ bởi RBAC và dùng localStorage cho MVP. Trước production cần guard theo role admin, API moderation, audit log và phân trang.

## Việc tiếp theo

- ADMIN-01/ADMIN-04 backend API và RBAC thật.
- Thêm bộ lọc trạng thái, lý do và thao tác ẩn review.
