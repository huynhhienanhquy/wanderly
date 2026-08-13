# PLAN-06 — Điều chỉnh theo thời tiết

## Mục tiêu

Giúp người dùng nhận biết địa điểm ngoài trời trong điều kiện mưa.

## Phạm vi hoàn thành

- Thêm lựa chọn thời tiết thủ công trong kế hoạch.
- Cảnh báo địa điểm `OUTDOOR` khi trạng thái là mưa.
- Lưu lựa chọn cùng metadata kế hoạch.

## Kiểm tra

- `pnpm typecheck` đạt toàn workspace.
- Cập nhật `TASK_STATUS.md`.

## Giới hạn

Chưa tích hợp WEATHER API; trạng thái thời tiết hiện do người dùng chọn thủ công.
