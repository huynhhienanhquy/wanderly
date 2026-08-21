# REVIEW-03 — Báo cáo review

## Phạm vi đã hoàn thành

- Thêm bảng `review_reports` và migration với trạng thái `OPEN`, `RESOLVED`, `DISMISSED`.
- API báo cáo review được bảo vệ bằng JWT và gắn reporter từ claim `sub`.
- Unique `(reviewId, reporterUserId)` chống tạo báo cáo trùng; gửi lại sẽ cập nhật report hiện có.
- Place Detail gọi API khi đăng nhập và giữ fallback local cho khách.

## Trạng thái

Done — report đã có persistence, ownership và nền tảng moderation cho ADMIN-04.
