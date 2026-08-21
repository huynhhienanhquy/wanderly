# MOB-49 — Notification permission policy

Thêm policy kiểm tra trước khi xin quyền notification.

## Hoàn thành

- Đọc trạng thái quyền hiện tại trước khi hiển thị system permission prompt.
- Không xin lại quyền khi đã granted hoặc denied; chỉ request khi `undetermined`.
- Có unit test cho cả ba trạng thái permission.
