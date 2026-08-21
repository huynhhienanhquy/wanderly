# BUDGET-01 — Mô hình ước tính chi phí

## Phạm vi hoàn thành

- Thêm contract `BudgetLine` cho địa điểm, ăn uống và di chuyển, gồm đơn giá và số lượng.
- Thêm hàm `estimateBudget` tạo breakdown theo loại và tổng chi phí.
- Export từ package contracts dùng chung.

## Kiểm tra

- `pnpm typecheck` đạt toàn workspace.
- Cập nhật `TASK_STATUS.md`.

## Giới hạn

Dữ liệu food/routing sẽ được adapter khác cung cấp; mô hình tính toán không phụ thuộc provider.
