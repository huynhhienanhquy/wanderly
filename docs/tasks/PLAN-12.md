# PLAN-12 — Chia sẻ lịch trình

## Phạm vi đã hoàn thành

- Tạo liên kết chứa snapshot của tên, ngày, ngân sách, thời tiết và danh sách địa điểm.
- Dùng Web Share API khi trình duyệt hỗ trợ, fallback sang clipboard.
- Mở liên kết chia sẻ dưới dạng lịch trình chỉ đọc, không phụ thuộc local storage của người nhận.
- Giữ lại thông tin thời lượng, ngân sách, cảnh báo thời tiết và tuyến Google Maps.
- Thêm kiểm thử round-trip và từ chối payload không hợp lệ.

## Trạng thái

Done — đã tích hợp trực tiếp vào Planner hiện tại.

## Kiểm thử

- `pnpm --filter @wanderly/web test`
- `pnpm --filter @wanderly/web build`
- `pnpm typecheck`
