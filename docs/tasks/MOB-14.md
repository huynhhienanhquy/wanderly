# MOB-14 — Mobile test suite

## Mục tiêu

Thiết lập nền tảng test native và bảo vệ các flow cốt lõi khỏi regression.

## Thay đổi

- Cấu hình `jest-expo` và React Native Testing Library.
- Mock SecureStore dùng chung trong môi trường test.
- Kiểm thử UI primitive qua hành vi người dùng.
- Kiểm thử round-trip và phục hồi dữ liệu lỗi của itinerary storage.

## Kiểm tra

`pnpm --filter @wanderly/mobile test`

## Kết quả

Task hoàn tất ngày 2026-08-20.
