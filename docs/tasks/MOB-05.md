# MOB-05 — Location permission

## Mục tiêu

Xin quyền vị trí đúng ngữ cảnh, xử lý denied/permanently-denied và lấy current location.

## Thay đổi

- Khai báo native foreground-location permission cho Android/iOS qua Expo config plugin.
- Xin quyền khi người dùng bấm, không xin ngay khi mở app.
- Hiển thị loading, retryable denied, permanently-denied và GPS/error states riêng.
- Khi không thể hỏi lại, cung cấp nút mở system Settings.
- Lấy tọa độ Balanced accuracy, reverse geocode và hiển thị current marker/label.
- Bổ sung live-region và accessibility role cho trạng thái/nút.

## Kiểm tra

`pnpm --filter @wanderly/mobile typecheck && pnpm --filter @wanderly/mobile build`

## Kết quả

Task hoàn tất ngày 2026-08-20.
