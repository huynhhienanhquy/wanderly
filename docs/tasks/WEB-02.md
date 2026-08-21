# WEB-02 — React Router and route guards

## Mục tiêu

Phân tách rõ public, authenticated và admin routes, đồng thời có route contract dùng lại trong UI.

## Thay đổi

- Tập trung route paths/builders trong `routes.ts`.
- Thêm `AuthGuard`; người chưa đăng nhập được chuyển về Login và giữ đường dẫn xuất phát.
- Bảo vệ Favorites, Profile và Preference Onboarding.
- Duy trì server-verified `AdminGuard` cho Admin Reports.
- Thêm fallback cho URL không tồn tại và unit test route/session helpers.

## Kiểm tra

```bash
pnpm --filter @wanderly/web test
pnpm --filter @wanderly/web typecheck
pnpm --filter @wanderly/web build
```

## Kết quả

Task hoàn tất ngày 2026-08-20.
