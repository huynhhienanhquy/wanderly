# MAP-01 — Tích hợp map provider

## Trạng thái

Done — 2026-08-19.

## Kết quả

- Web Place Detail hiển thị Google Maps embed và link directions fallback.
- Mobile có route `/map` dùng `react-native-maps`, Google provider và Marker theo Place.
- Dependency native được khóa trong workspace lockfile.
- URL/tọa độ dùng adapter chung thay vì ghép rải rác.

## Kiểm thử

- Contracts test, Web/Mobile typecheck và Web build đạt.
