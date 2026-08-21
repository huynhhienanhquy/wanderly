# REPLACE-02 — Tìm candidate thay thế

## Kết quả

Đã kết nối constraint của slot với Recommendation API để lấy danh sách địa điểm thay thế có match score và lý do đề xuất.

## Phạm vi

- Chuyển thời gian, category, ngân sách và vị trí của slot thành `PlanningConstraints`.
- Ưu tiên vị trí liền trước, fallback sang vị trí liền sau và giới hạn bán kính 10 km.
- Loại địa điểm đã có trong lịch trình và candidate vượt quá thời lượng slot.
- Giữ thứ tự xếp hạng từ Recommendation Engine, tối đa 10 kết quả.

## Kiểm thử

- Kiểm tra ánh xạ request và bộ lọc ID/thời lượng trên response đã được validate bằng Zod.
