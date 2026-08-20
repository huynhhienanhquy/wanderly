# WEB-04 — Auth and onboarding

## Mục tiêu

Hoàn thiện luồng đăng ký, đăng nhập, đăng xuất, hồ sơ và onboarding sở thích trên Web.

## Thay đổi

- Rà soát các màn Login, Register, Forgot/Reset Password, Profile và Preference Onboarding hiện hữu.
- Tập trung quyền sở hữu access/refresh token trong `auth-session.ts`.
- Refactor Login/Register/Logout và AuthGuard dùng session helpers, tránh lặp storage keys.
- Login/Register dùng runtime API config chung; đăng ký điều hướng qua route contract.
- Thêm test lưu, đọc và xóa toàn bộ session material.

## Kiểm tra

```bash
pnpm --filter @wanderly/web test
pnpm --filter @wanderly/web typecheck
pnpm --filter @wanderly/web build
```

## Kết quả

Task hoàn tất ngày 2026-08-20. Route cần đăng nhập được bảo vệ bởi WEB-02.
