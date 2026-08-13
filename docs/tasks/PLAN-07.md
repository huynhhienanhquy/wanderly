# PLAN-07 — Validate kế hoạch cuối cùng

## Mục tiêu

Kiểm tra tổng hợp các constraint trước khi người dùng sử dụng kế hoạch.

## Phạm vi hoàn thành

- Thêm nút kiểm tra kế hoạch.
- Tổng hợp cảnh báo địa điểm đóng cửa, vượt ngân sách, thiếu thời lượng và ngoài trời khi mưa.
- Hiển thị kết quả hợp lệ hoặc danh sách vấn đề.

## Kiểm tra

- `pnpm typecheck` đạt toàn workspace.
- Cập nhật `TASK_STATUS.md`.

## Giới hạn

Chưa chặn thao tác lưu backend; khi PLAN-08 có API, validation cần chạy lại ở server.

## Bản sửa

- Tổng hợp opening hours, duration, budget và weather thành một kết quả cuối.
- Loại cảnh báo trùng, từ chối kế hoạch rỗng và có unit test.
