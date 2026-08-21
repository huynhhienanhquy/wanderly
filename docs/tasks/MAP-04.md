# MAP-04 — Hiển thị marker và route

## Trạng thái

Done — 2026-08-19.

## Kết quả

- Web Planner giữ marker đánh số/polyline theo đúng timeline và mở Google Maps với origin/waypoints/destination.
- Mobile Map hỗ trợ nhiều marker đánh số và `Polyline` theo thứ tự route.
- URL itinerary được tạo bởi shared adapter; route rỗng trả `null` an toàn.

## Kiểm thử

- Contract test xác nhận thứ tự origin, waypoint và destination.
- Web build và typecheck Web/Mobile đạt.
