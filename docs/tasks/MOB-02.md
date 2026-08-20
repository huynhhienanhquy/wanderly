# MOB-02 — Expo Router

## Mục tiêu

Tách rõ auth stack, main tabs, detail và plan routes bằng Expo Router.

## Thay đổi

- Chuyển Login/Register/Forgot/Reset/Logout vào `(auth)` modal stack.
- Chuyển Explore và Map vào `(tabs)` với tab navigation native.
- Giữ Place Detail dạng stack detail và thêm `/plan` destination.
- Khai báo root Stack rõ ràng và tập trung typed mobile route helpers.
- Route groups không đổi public URL (`/login`, `/explore`, `/map`).

## Kiểm tra

`pnpm --filter @wanderly/mobile typecheck && pnpm --filter @wanderly/mobile build`

## Kết quả

Task hoàn tất ngày 2026-08-20.
