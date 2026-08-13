# REVIEW-03 — Báo cáo nội dung vi phạm

## Mục tiêu

Cho phép người dùng đánh dấu review có nội dung vi phạm để chuyển cho bước xử lý quản trị.

## Phạm vi hoàn thành

- Thêm nút “Báo cáo” cho từng review.
- Dùng khóa kết hợp `placeId` và thời điểm tạo để tránh báo cáo trùng.
- Hiển thị trạng thái “Đã báo cáo” sau thao tác.

## Kiểm tra

- `pnpm typecheck` đạt toàn workspace.

## Giới hạn

Báo cáo hiện lưu localStorage do chưa có API moderation và user session. Backend sau này cần nhận reason, userId, reviewId và tạo audit record.

## Việc tiếp theo

- ADMIN-04: màn hình quản lý review/report.
- Thay local adapter bằng endpoint moderation.
