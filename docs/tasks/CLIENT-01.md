# CLIENT-01 — Shared contracts package

## Mục tiêu

Cung cấp một bề mặt Zod schema và TypeScript type duy nhất cho API, Web và Mobile.

## Phạm vi và thay đổi

- Xác nhận `@wanderly/contracts` là package workspace có build/typecheck độc lập.
- Tập trung export các contract auth, place, plan, preference, recommendation, map, weather và event qua `src/index.ts`.
- Thêm public API test để phát hiện export bị mất hoặc health wire contract bị thay đổi ngoài ý muốn.

## Quyết định

Client chỉ import từ package root, không phụ thuộc đường dẫn file nội bộ. Zod schema vừa kiểm tra dữ liệu runtime vừa sinh type TypeScript.

## Kiểm tra

```bash
pnpm --filter @wanderly/contracts test
pnpm --filter @wanderly/contracts typecheck
pnpm --filter @wanderly/contracts build
```

## Kết quả

Task hoàn tất ngày 2026-08-20. Typed API client được triển khai riêng ở `CLIENT-02`.
