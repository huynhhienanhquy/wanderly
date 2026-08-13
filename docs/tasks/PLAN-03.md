# PLAN-03 — Kiểm tra giờ mở cửa

## Mục tiêu

Phát hiện địa điểm đóng cửa vào ngày được chọn trong kế hoạch.

## Phạm vi hoàn thành

- Tải Place Detail cho các mục trong kế hoạch.
- Đối chiếu ngày kế hoạch với `openingHours.dayOfWeek`.
- Hiển thị cảnh báo địa điểm đóng cửa, không tự động xóa mục.

## Kiểm tra

- `pnpm typecheck` đạt toàn workspace.
- `TASK_STATUS.md` cập nhật PLAN-03 là Done.

## Giới hạn

Chưa xử lý giờ theo timezone, khoảng thời gian đặc biệt hoặc lịch nhiều ngày.
