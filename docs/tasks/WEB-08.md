# WEB-08 — Smart Replace

## Mục tiêu

Cho phép thay một itinerary slot bằng candidate phù hợp sau khi xem trước tác động.

## Phạm vi đã xác nhận

- Lấy constraint của slot và ranked candidates từ API.
- Lọc theo weather/budget, chọn candidate và preview time/budget/distance.
- Chặn xác nhận khi preview không hợp lệ.
- Khi xác nhận, cập nhật timeline và ghi behavior signal; đóng không thay ghi skip signal.

## Hoàn thiện

- Dialog có semantics `dialog`, `aria-modal`, live loading status và hỗ trợ đóng bằng Escape.
- Thêm unit test keyboard dismissal; chạy lại candidate, constraint và preview tests.

## Kiểm tra

`pnpm --filter @wanderly/web test && pnpm --filter @wanderly/web typecheck && pnpm --filter @wanderly/web build`

## Kết quả

Task hoàn tất ngày 2026-08-20.
