# WEB-03 — Web design system

## Mục tiêu

Thiết lập Tailwind, component primitives theo convention shadcn/ui, theme tokens và responsive foundation.

## Thay đổi

- Tích hợp Tailwind CSS 4 qua Vite plugin, giữ tương thích CSS hiện hữu.
- Định nghĩa semantic light/dark theme tokens bằng CSS variables.
- Thêm shadcn-style `Button`, button variants, `Card` và `CardContent` trong `components/ui`.
- Thêm helper resolve/apply theme có unit test.
- Áp dụng button primitive cho CTA trang chủ; utility classes sẵn sàng cho responsive layout.

## Kiểm tra

```bash
pnpm --filter @wanderly/web test
pnpm --filter @wanderly/web typecheck
pnpm --filter @wanderly/web build
```

## Kết quả

Task hoàn tất ngày 2026-08-20. Component được giữ trong source theo mô hình shadcn để project toàn quyền chỉnh sửa.
