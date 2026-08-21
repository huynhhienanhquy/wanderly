# MOB-07 — AI Planner native

## Mục tiêu

Cho phép người dùng mô tả chuyến đi bằng ngôn ngữ tự nhiên, xác nhận tiêu chí và tạo lịch trình trên mobile.

## Thay đổi

- Thêm màn hình AI Planner gồm bước phân tích và bước xác nhận tiêu chí.
- Tích hợp API `POST /ai/constraints` và `POST /recommendations/candidates` với schema dùng chung.
- Sinh timeline từ tối đa bốn gợi ý và lưu cục bộ bằng SecureStore/localStorage.
- Thêm entry point từ Home và đăng ký route Expo Router.

## Kiểm tra

`pnpm --filter @wanderly/mobile typecheck && pnpm --filter @wanderly/mobile build`

## Kết quả

Task hoàn tất ngày 2026-08-20.
