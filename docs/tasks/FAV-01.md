# FAV-01 — Lưu/bỏ lưu địa điểm

## Phạm vi đã hoàn thành

- API `/favorites` list/add/remove được bảo vệ bằng bearer JWT.
- Bản ghi favorite được owner-scoped theo JWT `sub` và idempotent khi thêm lại.
- Place Detail vẫn hỗ trợ localStorage cho khách chưa đăng nhập.
- Khi đã đăng nhập, trạng thái và thao tác toggle được đồng bộ với API.

## Trạng thái

Done — không dùng `x-user-id` hay định danh giả; dữ liệu đã gắn với principal xác thực.
