# BUDGET-04 — Optimize Budget

## Kết quả

Smart Replace nay chuyển sang danh sách phương án rẻ hơn khi lịch trình hiện tại vượt ngân sách.

## Phạm vi

- Chỉ kích hoạt tối ưu chi phí khi tổng plan vượt budget đã cấu hình.
- Loại candidate không có giá hoặc không rẻ hơn địa điểm hiện tại.
- Tính số tiền tiết kiệm dự kiến cho từng phương án.
- Xếp hạng theo mức tiết kiệm giảm dần và dùng match score để phá hòa.
- Bổ sung số tiền tiết kiệm vào lý do đề xuất; preview REPLACE-03 vẫn xác minh plan cuối.

## Kiểm thử

- Bao phủ lọc giá, thứ tự savings/score và trường hợp thiếu giá hiện tại.
- Web build và workspace typecheck xác minh tích hợp Planner.
