# PLAN-10 — Bản đồ lịch trình

## Mục tiêu

Giúp người dùng nhìn nhanh thứ tự và phạm vi di chuyển của toàn bộ lịch trình.

## Phạm vi đã hoàn thành

- Giữ thứ tự địa điểm theo timeline.
- Chiếu tọa độ thành sơ đồ SVG responsive với marker đánh số và polyline nối tuyến.
- Tính tổng khoảng cách đường chim bay bằng công thức Haversine.
- Giữ liên kết mở tuyến đầy đủ trên Google Maps để điều hướng thực tế.
- Hỗ trợ cả lịch trình một điểm và nhiều điểm.

## Quyết định

Sơ đồ SVG cung cấp marker/polyline mà không cần API key hay tải SDK bản đồ. Tổng khoảng cách được ghi rõ là đường chim bay; Google Maps vẫn là nguồn điều hướng thực tế.

## Kiểm thử

- Unit test thứ tự, phép tính khoảng cách, giới hạn phép chiếu và lịch trình một điểm.
- `pnpm --filter @wanderly/web test`
- `pnpm --filter @wanderly/web build`
- `pnpm typecheck`

## Trạng thái

Done — sơ đồ marker/polyline, tổng khoảng cách và liên kết điều hướng đã được tích hợp.
