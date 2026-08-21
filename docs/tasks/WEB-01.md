# WEB-01 — React + Vite bootstrap

## Mục tiêu

Bảo đảm Web app có entry production-ready, runtime config rõ ràng và nền tảng data fetching chung.

## Thay đổi

- Xác nhận React 19, Vite và TypeScript build pipeline.
- Thêm runtime config chuẩn hóa/kiểm tra `VITE_API_URL`, có local fallback.
- Khởi tạo một `QueryClient` tại app root với retry/stale-time mặc định.
- Bọc app bằng `QueryClientProvider`, `BrowserRouter` và React StrictMode.
- Thêm unit test cho runtime config.

## Kiểm tra

```bash
pnpm --filter @wanderly/web test
pnpm --filter @wanderly/web typecheck
pnpm --filter @wanderly/web build
```

## Kết quả

Task hoàn tất ngày 2026-08-20; dev server dùng cổng 3000 và API local mặc định dùng cổng 4000.
