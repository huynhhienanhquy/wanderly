# CLIENT-03 — Shared domain helpers

## Mục tiêu

Loại bỏ cách format và xử lý domain khác nhau giữa Web và Mobile.

## Thay đổi

- Thêm helper format tiền VND và thời lượng tiếng Việt.
- Thêm kiểm tra/tính thời lượng cửa sổ kế hoạch.
- Thêm chuẩn hóa constraint tags: trim, lowercase, loại trùng và sắp xếp ổn định.
- Export từ `@wanderly/contracts` và kiểm thử các trường hợp chính.

## Kiểm tra

```bash
pnpm --filter @wanderly/contracts test
pnpm --filter @wanderly/contracts typecheck
```

## Kết quả

Task hoàn tất ngày 2026-08-20; các client có thể dùng cùng quy tắc hiển thị và validation cơ bản.
