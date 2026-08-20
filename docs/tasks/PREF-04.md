# PREF-04 — Thu thập tín hiệu hành vi

Đã bổ sung endpoint xác thực `POST /preferences/signals` để ghi các tín hiệu `LOVED`, `OKAY`, `DISLIKED`, `SKIP`, `REPLACE`, `VISITED` vào `UserFeedback`.

- Payload được validate bằng contract dùng chung.
- Tín hiệu bắt buộc gắn với place, plan hoặc plan item.
- `userId` luôn lấy từ access token, không nhận từ client.
- Test xác minh dữ liệu được gắn đúng authenticated user.
