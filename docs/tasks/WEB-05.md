# WEB-05 — Explore and Place Detail

## Mục tiêu

Hoàn thiện trải nghiệm tìm kiếm/lọc địa điểm, xem chi tiết, favorite và review trên Web.

## Phạm vi đã xác nhận

- Explore có search, category/city/price/rating filters, pagination, collection links, geolocation và events.
- Place Detail có ảnh/thông tin, directions/share, add-to-plan, favorite và review/report flows.
- Remote favorite/review dùng authenticated API; local fallback vẫn hỗ trợ người chưa đăng nhập.

## Thay đổi task này

- Chuyển Explore và Place Detail sang runtime API config tập trung.
- Dùng auth-session helper thay vì lặp storage key.
- Dùng route contract để encode place slug và điều hướng Home/Favorites/Collections/Explore nhất quán.
- Chạy lại toàn bộ unit test, typecheck và production build của Web.

## Kiểm tra

```bash
pnpm --filter @wanderly/web test
pnpm --filter @wanderly/web typecheck
pnpm --filter @wanderly/web build
```

## Kết quả

Task hoàn tất ngày 2026-08-20.
