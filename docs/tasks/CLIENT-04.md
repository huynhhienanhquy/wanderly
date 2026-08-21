# CLIENT-04 — Query key convention

## Mục tiêu

Thống nhất khóa cache TanStack Query giữa Web và Mobile để fetch, invalidate và optimistic update dự đoán được.

## Thay đổi

- Thêm factory phân cấp cho places, plans, profile, preferences, favorites và events.
- Chuẩn hóa object filter theo thứ tự key và loại giá trị `undefined`.
- Dùng readonly tuple để giữ literal type và hỗ trợ invalidation theo prefix.
- Export từ contracts package và thêm unit test.

## Kiểm tra

```bash
pnpm --filter @wanderly/contracts test
pnpm --filter @wanderly/contracts typecheck
```

## Kết quả

Task hoàn tất ngày 2026-08-20.
