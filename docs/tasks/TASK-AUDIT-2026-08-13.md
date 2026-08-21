# Audit trạng thái task — 2026-08-13

## Kết luận

Các task chỉ được giữ `Done` khi đầu ra hiện có, chạy được và phù hợp mô tả gốc. Task mới có contract/localStorage được chuyển sang `Partial`; task bị regression hoặc lỗi build được chuyển sang `Needs Fix`.

## Vấn đề cần xử lý

1. Sửa production build tại `apps/web/src/pages/PlansPage.tsx`.
2. Khôi phục PLAN-02–PLAN-07 và PLAN-09 đã mất khi refactor planner.
3. Hoàn thiện PLAN-08 bằng CRUD API, Prisma persistence và object-level authorization.
4. Sửa FAV-02 đang gọi API slug bằng place ID; bổ sung Favorite API.
5. Hoàn thiện Review/Admin bằng API, auth ownership, pagination và audit log.
6. Hoàn thiện EXP-02 distance filter và EXP-03 Date/Rainy Day collections.
7. Tích hợp các branch AUTH-01–AUTH-06 và FND-04 trước khi dựa vào auth/RBAC.

## Kiểm tra đã chạy

- `pnpm test`: đạt 20 test API/contracts; Web/Mobile không có test.
- `pnpm typecheck`: đạt.
- `pnpm build`: thất bại ở Web planner.
