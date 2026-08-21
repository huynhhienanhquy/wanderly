# WEB-09 — Admin Web

## Mục tiêu

Cung cấp giao diện quản trị place, category, event, user và review reports.

## Thay đổi

- Thêm dashboard được bảo vệ bằng server-verified AdminGuard.
- Danh sách/tạo/xóa place, category và event; khóa/mở khóa user.
- Liên kết workflow kiểm duyệt review reports hiện hữu.
- Thêm typed admin API functions và route `/admin`.
- Mutation tự reload dữ liệu và hiển thị trạng thái/lỗi.

## Kiểm tra

`pnpm --filter @wanderly/web test && pnpm --filter @wanderly/web typecheck && pnpm --filter @wanderly/web build`

## Kết quả

Task hoàn tất ngày 2026-08-20.
