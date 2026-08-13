# EXP-04 — Trang Place Detail

## Mục tiêu

Xây trang chi tiết địa điểm cho Web và Mobile, dùng API `GET /places/:slug`.

## Phạm vi hoàn thành

- Bổ sung `fetchPlaceDetail` và kiểm thử response/error.
- Thêm route `/places/:slug` trên Web và màn hình `places/[slug]` trên Mobile.
- Hiển thị thông tin, giá, đánh giá, danh mục và giờ mở cửa.

## Kiểm thử

- `pnpm --filter @wanderly/contracts test`
- `pnpm typecheck`
- `pnpm build`
