# FAV-02 — Danh sách địa điểm đã lưu

## Mục tiêu

Cho phép người dùng xem lại các địa điểm đã lưu.

## Phạm vi hoàn thành

- Tạo route Web `/favorites`.
- Đọc danh sách ID từ `wanderly:favorites` và tải chi tiết địa điểm qua API hiện có.
- Có loading, empty state và liên kết tới Place Detail.
- Bỏ qua mục đã bị xóa hoặc không còn khả dụng thay vì làm hỏng toàn trang.

## Kiểm tra

- `pnpm typecheck` đạt toàn workspace.

## Việc tiếp theo

- Đồng bộ danh sách favorite với backend theo user.
- Thêm nút truy cập Favorites ở navigation và Mobile.
