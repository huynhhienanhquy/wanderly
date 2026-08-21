# MOB-15 — EAS build và release

## Mục tiêu

Chuẩn hóa cấu hình build Android/iOS và quy trình phát hành mobile.

## Thay đổi

- Thêm EAS profiles `development`, `preview`, `production` và submit profile.
- Dùng remote app version với auto-increment cho production.
- Khai báo native `versionCode`, `buildNumber` và runtime version theo app version.
- Thêm lệnh kiểm tra Expo public config.

## Checklist release

1. Chạy `eas init` trong `apps/mobile` để liên kết Expo project thật và sinh `projectId`.
2. Thiết lập `EXPO_PUBLIC_API_URL` theo environment/secret của từng profile.
3. Xác nhận Android keystore và Apple distribution credentials trong EAS.
4. Cung cấp App Links/Universal Links association files trên domain production.
5. Chạy `pnpm config:check`, test, typecheck; sau đó `eas build --profile preview --platform all`.
6. Smoke test artifact preview trước `eas build --profile production --platform all` và `eas submit --profile production`.

## Kiểm tra

`pnpm --filter @wanderly/mobile config:check`

## Kết quả

Task hoàn tất ngày 2026-08-20. Việc tạo signing credentials và submit store cần tài khoản Expo/Apple/Google của chủ dự án.
