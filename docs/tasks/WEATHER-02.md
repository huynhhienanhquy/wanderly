# WEATHER-02 — Phân loại hoạt động indoor/outdoor

## Trạng thái

Done — 2026-08-19.

## Kết quả

- Shared enum `INDOOR/OUTDOOR/MIXED` dùng thống nhất cho import, API query và response.
- Pipeline chuẩn hóa bắt buộc mọi Place có classification trước khi seed/import.
- Chỉ `OUTDOOR` được xem là weather-sensitive; `MIXED` giữ khả năng chuyển vào khu vực trong nhà.
- Planner dùng shared helper thay vì tự so sánh chuỗi.

## Kiểm thử

- Contract test bao phủ cả ba classification; test normalization và Planner tiếp tục đạt.
