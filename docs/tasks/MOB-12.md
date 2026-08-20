# MOB-12 — Offline cache cơ bản

## Mục tiêu

Giữ các nội dung quan trọng khả dụng khi mạng chập chờn hoặc ngoại tuyến.

## Thay đổi

- Thêm cache abstraction dùng localStorage trên web và SecureStore trên native.
- Cache trang Explore mặc định sau mỗi lần tải thành công.
- Fallback sang dữ liệu đã lưu khi request lỗi và hiển thị thời điểm cache.
- Kế hoạch hiện tại tiếp tục được lưu cục bộ để xem/sửa offline.

## Kiểm tra

`pnpm --filter @wanderly/mobile typecheck`

## Kết quả

Task hoàn tất ngày 2026-08-20.
