# FAV-02 — Danh sách địa điểm đã lưu

## Mục tiêu

Cho phép người dùng xem lại các địa điểm đã lưu.

## Phạm vi hoàn thành

- Tạo route Web `/favorites`.
- Đọc danh sách `{id, slug}` từ `wanderly:favorites` và gọi đúng endpoint chi tiết theo slug.
- Có loading, empty state và liên kết tới Place Detail.
- Bỏ qua mục đã bị xóa hoặc không còn khả dụng thay vì làm hỏng toàn trang.

## Kiểm tra

- `pnpm typecheck` đạt toàn workspace.
- Unit test storage/migration đạt.

## Tương thích dữ liệu

Dữ liệu cũ chỉ chứa ID không thể chuyển thành slug nếu không gọi thêm API, vì vậy được bỏ qua an toàn. Favorite mới luôn lưu cả ID và slug.

## Việc tiếp theo

- Đồng bộ danh sách favorite với backend theo user.
- Thêm nút truy cập Favorites ở navigation và Mobile.
