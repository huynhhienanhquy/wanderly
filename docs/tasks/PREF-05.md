# PREF-05 — Cập nhật preference score

Đã bổ sung `POST /preferences/recalculate` để học trọng số category từ tối đa 500 tín hiệu gần nhất.

- Tín hiệu tích cực/tiêu cực có trọng số xác định.
- Score được tổng hợp theo category của place và chuẩn hóa trong khoảng 0–1.
- Upsert nguồn `LEARNED` trong một transaction.
- User chỉ có thể cập nhật hồ sơ của chính mình qua access token.
