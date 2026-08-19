# MAP-03 — Distance/travel-time adapter

## Trạng thái

Done — 2026-08-19.

## Kết quả

- Thêm `POST /maps/travel-estimate` với contract tọa độ và WALK/BIKE/DRIVE/TRANSIT.
- Khi có server key, adapter gọi Google Routes với field mask tối thiểu.
- Khi thiếu key, timeout/lỗi hoặc route rỗng, dùng Haversine và vận tốc ước tính theo mode.
- Response ghi rõ source để Planner/UI phân biệt dữ liệu provider và ước tính.

## Kiểm thử

- API test bao phủ fallback khoảng cách/thời gian; typecheck workspace đạt.
