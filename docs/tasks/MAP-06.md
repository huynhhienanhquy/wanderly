# MAP-06 — Fallback khi provider lỗi

## Trạng thái

Done — 2026-08-19.

## Kết quả

- Routes API lỗi, thiếu key, exception hoặc response thiếu route đều chuyển sang Haversine.
- Fallback ước tính duration theo travel mode và đánh dấu `source: HAVERSINE`.
- Shared helper cung cấp thông báo rõ ràng cho UI, không trình bày ước tính như dữ liệu giao thông thật.
- Reverse geocoding cũng có fallback label tọa độ.

## Kiểm thử

- Test provider HTTP 503 vẫn trả estimate hợp lệ và test thông báo fallback.
