# BUDGET-02 — Budget breakdown

## Trạng thái

Done — 2026-08-18.

## Kết quả

- Planner hiển thị từng dòng chi phí, nhóm PLACE/FOOD/TRANSPORT và tổng.
- Category food/restaurant được phân loại vào ăn uống; địa điểm khác vào PLACE.
- Dòng thiếu giá vẫn được báo riêng và không bị tính sai thành 0.
- Dùng shared `estimateBudget` contract để kiểm tra amount/byType/total.

## Kiểm thử

- Test line-item và tổng theo nhóm; Web test/build đạt.
