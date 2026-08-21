# WEATHER-01 — Tích hợp Weather API

## Trạng thái

Done — 2026-08-19.

## Kết quả

- Thêm `GET /weather/forecast` qua Open-Meteo backend adapter.
- Provider call có timeout 8 giây, kiểm tra HTTP/payload và chuẩn hóa CLEAR/RAIN/HEAT.
- Web chỉ gọi Wanderly API và validate shared response; không phụ thuộc trực tiếp Open-Meteo.
- Khi API lỗi, Planner giữ lựa chọn thời tiết thủ công và hiển thị thông báo fallback.

## Kiểm thử

- API test classification/normalization, Web client test, Web build và typecheck workspace đạt.
