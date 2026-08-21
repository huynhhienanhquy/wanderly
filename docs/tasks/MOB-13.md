# MOB-13 — Notification reminders

## Mục tiêu

Nhắc người dùng trước lịch trình bằng local notification trên thiết bị.

## Thay đổi

- Tích hợp `expo-notifications` và config plugin tương ứng.
- Xin quyền thông báo theo hành động của người dùng, không xin ngay khi mở app.
- Tạo Android notification channel riêng cho lịch trình.
- Đặt lời nhắc trước giờ khởi hành; với lịch quá gần, dùng mốc an toàn một phút.

## Kiểm tra

`pnpm --filter @wanderly/mobile typecheck`

## Kết quả

Task hoàn tất ngày 2026-08-20.
