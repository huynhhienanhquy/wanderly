# PLAN-01 — Kế hoạch cơ bản

## Mục tiêu

Cho phép người dùng xem và quản lý danh sách địa điểm đã thêm vào kế hoạch.

## Phạm vi hoàn thành

- Tạo route Web `/plans`.
- Đọc danh sách từ `wanderly:current-plan`.
- Hiển thị thứ tự địa điểm, liên kết Place Detail và nút xóa.
- Cập nhật localStorage ngay sau khi xóa.

## Kiểm tra

- `pnpm typecheck` đạt toàn workspace.

## Giới hạn

Kế hoạch hiện là dữ liệu local, chưa có ngày/giờ, owner hoặc đồng bộ backend.

## Việc tiếp theo

- PLAN-02: thông tin kế hoạch và lịch theo ngày.
- Đồng bộ kế hoạch với tài khoản đăng nhập.
