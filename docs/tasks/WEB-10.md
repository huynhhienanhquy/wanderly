# WEB-10 — Web tests

## Mục tiêu

Bảo vệ các luồng Web chính bằng unit/component tests và browser E2E.

## Thay đổi

- Tích hợp React Testing Library + jsdom cho component tests.
- Tích hợp Playwright Chromium với Vite web server tự quản lý.
- Thêm E2E cho Home → Explore, guest auth redirect và Login validation.
- Network Explore được mock để test ổn định, không phụ thuộc backend/database.
- Thêm script `test:e2e` và cấu hình retry/trace cho CI.

## Kiểm tra

```bash
pnpm --filter @wanderly/web test
pnpm --filter @wanderly/web test:e2e
pnpm --filter @wanderly/web build
```

## Kết quả

Task hoàn tất ngày 2026-08-20.
