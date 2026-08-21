# REPLACE-05 — Lưu hành vi replace/skip

Planner gửi tín hiệu xác thực `REPLACE` khi người dùng xác nhận thay địa điểm và `SKIP` khi đóng panel mà không chọn.

- Không chặn thao tác UI nếu telemetry lỗi.
- Không gửi tín hiệu cho khách chưa đăng nhập.
- Place ID cũ được lưu để hệ thống học điều người dùng muốn bỏ qua/thay thế.
