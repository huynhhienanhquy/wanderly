# FAV-01 — Lưu/bỏ lưu địa điểm

## Mục tiêu

Cho phép người dùng lưu hoặc bỏ lưu địa điểm ngay trên Place Detail.

## Phạm vi hoàn thành

- Thêm nút lưu với trạng thái `aria-pressed`.
- Lưu danh sách ID địa điểm trong localStorage và khôi phục khi tải lại trang.
- Toggle idempotent: bật/tắt không tạo bản ghi trùng.

## Kiểm tra

- `pnpm typecheck` đạt toàn workspace.
- Dữ liệu favorite tách riêng ở key `wanderly:favorites`.

## Giới hạn

Đây là persistence phía Web cho MVP chưa có session user/favorite API. Khi auth context và API sẵn sàng, thay adapter localStorage bằng API mà không đổi UI contract.

## Việc tiếp theo

- FAV-02: danh sách địa điểm đã lưu.
- Đồng bộ favorite với backend theo user đã đăng nhập.
