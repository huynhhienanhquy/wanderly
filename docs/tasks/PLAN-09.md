# PLAN-09 — Timeline lịch trình

## Mục tiêu

Hiển thị thứ tự và giờ bắt đầu dự kiến cho từng địa điểm trong kế hoạch.

## Phạm vi hoàn thành

- Timeline bắt đầu từ 08:00.
- Cộng `typicalDurationMinutes` của từng địa điểm; dùng 60 phút nếu thiếu dữ liệu.
- Giữ liên kết, cảnh báo và thao tác xóa hiện có.

## Kiểm tra

- `pnpm typecheck` đạt toàn workspace.
- Cập nhật `TASK_STATUS.md`.

## Giới hạn

Chưa tính thời gian di chuyển; timeline server sẽ được đồng bộ sau PLAN-08.

## Bản sửa

Timeline đã được khôi phục bởi PLAN-02: mỗi mục có giờ bắt đầu chỉnh sửa được và danh sách tự sắp xếp theo thời gian. PLAN-04 bổ sung duration/overlap.
