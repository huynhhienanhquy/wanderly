# FND-04 — Định nghĩa API contract

## Trạng thái

Hoàn thành ngày 2026-08-10 trên branch `feature/FND-04-api-contract`.

## Mục tiêu

Định nghĩa contract ổn định để Web, Mobile và Backend có thể phát triển song song trước khi business endpoint được triển khai.

## Thay đổi

- Thêm OpenAPI 3.1 contract tại `docs/api/openapi.yaml`.
- Mô tả 16 API paths cho System, Auth, Users, Places, Planner và Plans.
- Thêm bearer JWT security scheme.
- Chuẩn hóa pagination bằng `cursor` và `limit`.
- Chuẩn hóa error envelope gồm `code`, `message`, `requestId` và `details`.
- Tách shared Zod contracts thành các module `auth`, `common`, `place`, `planner` và `plan`.
- Thêm constraint validation cho thời gian, tọa độ, ngân sách, email và input length.
- Thêm Swagger UI cho NestJS tại `/docs` và JSON tại `/docs/openapi.json`.
- Thêm semantic OpenAPI validation script.
- Bổ sung Swagger metadata cho endpoint `GET /health` đã triển khai.

## API paths được định nghĩa

- `GET /health`.
- `POST /auth/register`.
- `POST /auth/login`.
- `POST /auth/refresh`.
- `GET /users/me`.
- `GET|PUT /users/me/preferences`.
- `GET /places`.
- `GET /places/{placeId}`.
- `POST|DELETE /places/{placeId}/favorite`.
- `POST /planner/constraints`.
- `POST /plans/generate`.
- `GET|DELETE /plans/{planId}`.
- `POST /plans/{planId}/items/{itemId}/replacement-options`.
- `PUT /plans/{planId}/items/{itemId}/replace`.
- `POST|DELETE /plans/{planId}/share`.
- `GET /shared-plans/{token}`.

## Quyết định

- OpenAPI là contract giao tiếp; Zod schemas là validation/type contract dùng trong TypeScript.
- API dùng cursor pagination thay vì offset cho list có khả năng tăng lớn.
- `404` được phép dùng cho cả tài nguyên không tồn tại và tài nguyên user không có quyền xem để tránh lộ ownership.
- Replace request dùng `expectedPlanVersion` để hỗ trợ optimistic concurrency.
- Tiền trên JSON contract là integer VND; backend chịu trách nhiệm chuyển đổi từ Prisma `BigInt`.
- Runtime Swagger hiện chỉ phản ánh controller đã triển khai; file OpenAPI mô tả contract mục tiêu của MVP.

## Kiểm tra

Các kiểm tra đã pass:

```text
pnpm api:validate
pnpm --filter @wanderly/contracts test
pnpm --filter @wanderly/contracts build
pnpm --filter @wanderly/api typecheck
pnpm --filter @wanderly/api build
pnpm format:check
```

Kết quả:

- OpenAPI 3.1 hợp lệ với 16 paths.
- 3 contract tests pass.
- Shared contracts build thành công.
- NestJS typecheck và build thành công.

## Tệp chính

- `docs/api/openapi.yaml`.
- `scripts/validate-openapi.mjs`.
- `packages/contracts/src/auth.ts`.
- `packages/contracts/src/common.ts`.
- `packages/contracts/src/place.ts`.
- `packages/contracts/src/planner.ts`.
- `packages/contracts/src/plan.ts`.
- `apps/api/src/main.ts`.
- `apps/api/src/health.controller.ts`.

## Ngoài phạm vi

- Chưa triển khai các business controller được mô tả trong contract.
- Chưa tạo typed API client; thuộc `CLIENT-02`.
- Chưa triển khai authentication; thuộc `AUTH-01` trở đi.

## Task tiếp theo

Chọn đúng một task chưa hoàn thành và tạo branch riêng từ branch nền tảng phù hợp.
