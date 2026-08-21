# WEATHER-04 — Đề xuất thay thế theo thời tiết

## Kết quả

Smart Replace nay tự động ưu tiên phương án an toàn hơn khi slot hiện tại xung đột với dự báo mưa hoặc nắng nóng.

## Phạm vi

- Nhận biết đúng slot có weather conflict trước khi điều chỉnh candidate.
- Loại hoạt động chỉ có không gian ngoài trời khi thời tiết xấu.
- Ưu tiên địa điểm indoor trước mixed và giữ score làm tiêu chí phụ.
- Bổ sung lý do giải thích mức phù hợp với điều kiện thời tiết.
- Không thay đổi thứ tự recommendation khi trời quang hoặc slot không xung đột.

## Kiểm thử

- Bao phủ lọc/xếp hạng khi mưa và giữ nguyên danh sách khi trời quang.
- Web build/typecheck xác minh tích hợp vào Planner.
