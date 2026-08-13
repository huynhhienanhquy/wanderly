# PLAN-04 — Kiểm tra thời lượng kế hoạch

## Mục tiêu

Ước tính tổng thời lượng các địa điểm đã chọn trong kế hoạch.

## Phạm vi hoàn thành

- Cộng `typicalDurationMinutes` từ Place Detail.
- Hiển thị tổng theo giờ/phút.
- Cảnh báo khi một địa điểm chưa có dữ liệu thời lượng.

## Kiểm tra

- `pnpm typecheck` đạt toàn workspace.
- `TASK_STATUS.md` cập nhật PLAN-04 là Done.

## Giới hạn

Chưa tính thời gian di chuyển giữa các địa điểm; cần MAP-03 cho dữ liệu route.

## Bản sửa

- Tính tổng thời lượng tại địa điểm.
- Phát hiện mục chồng giờ và kết thúc quá giờ kế hoạch.
- Cảnh báo dữ liệu thiếu thời lượng; travel time vẫn chờ MAP-03.
