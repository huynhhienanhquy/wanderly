# REVIEW-01 — Tạo và cập nhật đánh giá

## Phạm vi đã hoàn thành

- API `PATCH /places/:placeId/reviews/me` bảo vệ bằng JWT.
- Mỗi user có một review cho mỗi place qua unique `(userId, placeId)` và upsert.
- Validate rating 1–5, nội dung tối đa 1.000 ký tự.
- Place Detail dùng API khi đã đăng nhập; localStorage chỉ là fallback cho khách.

## Trạng thái

Done — review có ownership xác thực và cập nhật idempotent.
