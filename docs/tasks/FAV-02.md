# FAV-02 — Danh sách địa điểm đã lưu

## Mục tiêu

Cho phép người dùng xem và quản lý các địa điểm đã lưu trong phạm vi local MVP.

## Phạm vi đã hoàn thành

- Route Web `/favorites` đọc danh sách `{id, slug}` từ localStorage.
- Tải Place Detail theo slug, có loading và empty state.
- Bỏ qua từng địa điểm đã xóa/không khả dụng mà không làm hỏng toàn trang, đồng thời báo số lượng bị bỏ qua.
- Card liên kết tới Place Detail và cho phép bỏ lưu ngay tại danh sách.
- Thêm lối vào Favorites và Collections từ điều hướng Explore.

## Quyết định

FAV-02 hoàn thành danh sách local MVP. Đồng bộ đa thiết bị theo người dùng cần principal JWT thật từ AUTH-05/FAV-01; không dùng header user giả để né authentication.

## Kiểm thử

- Unit test parser/migration và toggle idempotent của favorite storage.
- `pnpm --filter @wanderly/web test`
- `pnpm --filter @wanderly/web build`
- `pnpm typecheck`

## Trạng thái

Done — danh sách favorite cục bộ có đầy đủ trạng thái, điều hướng và thao tác bỏ lưu.
