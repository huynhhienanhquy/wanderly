# REVIEW-02 — Danh sách đánh giá

## Phạm vi đã hoàn thành

- API công khai `GET /places/:placeId/reviews` trả các review `PUBLISHED` mới nhất.
- Sắp xếp giảm dần theo thời gian tạo và giới hạn 20 mục cho giao diện Place Detail.
- Web hiển thị dữ liệu API; vẫn giữ fallback draft local cho khách chưa đăng nhập.

## Trạng thái

Done — danh sách review không còn phụ thuộc localStorage khi API khả dụng.
