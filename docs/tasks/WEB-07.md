# WEB-07 — Itinerary experience

## Mục tiêu

Hoàn thiện timeline, budget, map, validation, save và share của itinerary Web.

## Thay đổi

- Rà soát timeline editing, opening hours, duration, budget, weather, map route và read-only share hiện hữu.
- Thêm builder chuyển local itinerary thành typed `CreatePlan` payload.
- Khi đăng nhập, nút Lưu đồng bộ kế hoạch qua authenticated Plan API; vẫn có local fallback.
- Chuẩn hóa API config, access token và route links.
- Thêm test payload và remote persistence.

## Kiểm tra

`pnpm --filter @wanderly/web test && pnpm --filter @wanderly/web typecheck && pnpm --filter @wanderly/web build`

## Kết quả

Task hoàn tất ngày 2026-08-20.
