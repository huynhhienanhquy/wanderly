# MOB-31 — API retry helper

Tích hợp retry giới hạn trực tiếp vào transport của mobile API client: retry network error và HTTP 5xx tối đa hai lần, giữ nguyên lỗi cuối nếu thất bại.

Kiểm tra bằng `pnpm --filter @wanderly/mobile typecheck` và mobile test.
