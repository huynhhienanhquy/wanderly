# MAP-02 — Tìm vị trí và geocoding

## Trạng thái

Done — 2026-08-19.

## Kết quả

- Web lấy vị trí với timeout/cache policy, reverse geocode qua backend và đồng bộ tọa độ vào URL filter.
- Backend giữ Google key phía server; khi thiếu key/provider lỗi sẽ trả label tọa độ ổn định.
- Mobile dùng `expo-location`, xin foreground permission, có denied state và reverse geocode tại thiết bị.
- Tọa độ/response đều được shared contract kiểm tra.

## Kiểm thử

- API fallback test, Web client test, Web build và typecheck toàn workspace đạt.
