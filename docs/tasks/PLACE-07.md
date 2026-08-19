# PLACE-07 — Đồng bộ Places provider

## Kết quả

Đã bổ sung Google Places adapter và dịch vụ đồng bộ idempotent vào catalog Wanderly.

## Phạm vi

- Gọi Google Places Text Search qua API key phía server và field mask giới hạn.
- Chuyển payload provider qua `normalizePlaceInput` trước khi ghi dữ liệu.
- Bỏ qua record thiếu định danh, tên, địa chỉ hoặc tọa độ bắt buộc.
- Upsert theo cặp `GOOGLE/providerPlaceId`, cập nhật thời điểm đồng bộ và category.
- Không đưa API key xuống Web/Mobile.

## Cấu hình

- `GOOGLE_PLACES_API_KEY`: khóa Google Places API phía backend.

## Kiểm thử

- Kiểm tra mapping/normalization payload Google.
- Kiểm tra upsert dùng stable provider identity và trạng thái active.
