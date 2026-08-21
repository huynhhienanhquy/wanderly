# PLAN-05 — Tối ưu ngân sách

## Mục tiêu

Ước tính chi phí tối thiểu của kế hoạch và cảnh báo vượt ngân sách.

## Phạm vi hoàn thành

- Thêm ngân sách kế hoạch theo VND.
- Cộng `priceMin` của các địa điểm.
- Hiển thị cảnh báo khi tổng chi phí vượt ngân sách.

## Kiểm tra

- `pnpm typecheck` đạt toàn workspace.
- Cập nhật `TASK_STATUS.md`.

## Giới hạn

Chưa tính giá theo số người, `priceMax`, vé sự kiện hoặc chi phí di chuyển.

## Bản sửa

- Tính tổng `priceMin`, số tiền vượt ngân sách và danh sách địa điểm thiếu giá.
- Có unit test cho vượt ngân sách và dữ liệu thiếu.
