# MOB-11 — Deep link và Universal Link

## Mục tiêu

Mở đúng nội dung Wanderly từ custom scheme và liên kết HTTPS trên Android/iOS.

## Thay đổi

- Giữ custom scheme `wanderly://` và cấu hình Android App Links cho place/shared plan.
- Cấu hình iOS Associated Domains cho `wanderly.vn`.
- Thêm route nhận `plans/shared/:shareToken` và chuyển an toàn sang bản web chia sẻ.
- Tái sử dụng deep-link contract dùng chung để tạo URL chuẩn.

## Lưu ý triển khai

Domain production cần cung cấp `assetlinks.json` và `apple-app-site-association` tương ứng với signing certificate/team ID.

## Kiểm tra

`pnpm --filter @wanderly/mobile typecheck`

## Kết quả

Task hoàn tất ngày 2026-08-20.
