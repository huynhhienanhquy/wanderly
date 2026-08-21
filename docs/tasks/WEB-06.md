# WEB-06 — AI Planner

## Mục tiêu

Cho phép người dùng nhập mô tả tự nhiên, xác nhận constraint và tạo itinerary ban đầu.

## Thay đổi

- Dùng API constraint extraction và runtime config tập trung.
- Gọi recommendation candidates sau bước xác nhận.
- Chuyển tối đa bốn candidate đã xếp hạng thành timeline cách nhau hai giờ.
- Lưu kế hoạch vào storage hiện hành và điều hướng đến Itinerary.
- Hiển thị lỗi khi không có candidate hoặc API thất bại; thêm test API/parser.

## Kiểm tra

`pnpm --filter @wanderly/web test && pnpm --filter @wanderly/web typecheck && pnpm --filter @wanderly/web build`

## Kết quả

Task hoàn tất ngày 2026-08-20.
