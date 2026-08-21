# EXT-01 — Chọn Places/Maps provider

## Trạng thái

Done — 2026-08-19.

## Quyết định

- Google Places làm nguồn dữ liệu ngoài; dữ liệu chuẩn hóa vẫn được lưu trong PostgreSQL để tránh phụ thuộc runtime.
- Google Maps dùng cho directions/Web; Mobile dùng `react-native-maps` với Google provider khi có native key.
- Web có fallback URL không cần SDK/key cho thao tác mở chỉ đường.
- Key tách theo `GOOGLE_PLACES_API_KEY`, `GOOGLE_MAPS_API_KEY`, `GOOGLE_ROUTES_API_KEY`; không đưa key vào source.

## Giới hạn vận hành

- Chỉ gọi provider qua adapter; giới hạn/cost do Google Cloud project quản lý.
- Không gọi Places API trực tiếp từ browser bằng server key.
- Khi chưa cấu hình key, ứng dụng vẫn hỗ trợ danh sách nội bộ và Google Maps URL.

## Kiểm thử

- Contract test xác nhận URL directions và tọa độ.
