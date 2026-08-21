# MOB-06 — Explore and Place Detail

## Mục tiêu

Cung cấp native list, search/filter, place detail và favorite.

## Thay đổi

- Explore dùng FlatList, pagination, loading/error/empty states.
- Thêm tìm kiếm tự nhiên và category filter truyền vào typed Place API.
- Place Detail hiển thị rating, price, address, categories, opening hours và map link.
- Thêm favorite toggle lưu bằng SecureStore trên thiết bị.
- Chuyển API calls sang runtime mobile config.

## Kiểm tra

`pnpm --filter @wanderly/mobile typecheck && pnpm --filter @wanderly/mobile build`

## Kết quả

Task hoàn tất ngày 2026-08-20.
