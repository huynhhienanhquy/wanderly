# PLAN-04 — Kiểm tra thời lượng kế hoạch

## Mục tiêu

Ước tính tổng thời lượng hoạt động và di chuyển, đồng thời phát hiện lịch trình không đủ thời gian.

## Phạm vi đã hoàn thành

- Cộng `typicalDurationMinutes` của các địa điểm trong timeline.
- Tính khoảng cách Haversine giữa các địa điểm liên tiếp từ tọa độ.
- Ước tính thời gian di chuyển nội đô với vận tốc trung bình 25 km/h.
- Hiển thị riêng thời gian hoạt động, thời gian di chuyển và tổng thời lượng.
- Phát hiện mục thiếu thời lượng, không đủ thời gian tới điểm kế tiếp và kết thúc quá giờ kế hoạch.

## Quyết định

Ước tính tọa độ giúp Planner hoạt động độc lập trong MVP. Đây không phải thời gian giao thông theo thời gian thực; khi MAP-03 cung cấp route provider, kết quả có thể được thay bằng duration từ provider mà không đổi giao diện.

## Kiểm thử

- Unit test khoảng cách, thời gian di chuyển, tổng thời lượng và các cảnh báo.
- `pnpm --filter @wanderly/web test`
- `pnpm --filter @wanderly/web build`
- `pnpm typecheck`

## Trạng thái

Done — thời lượng hoạt động và di chuyển đều đã được tính, hiển thị và kiểm thử.
