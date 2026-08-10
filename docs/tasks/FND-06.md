# FND-06 — Cấu hình database và migration

## Trạng thái

Hoàn thành ngày 2026-08-10 trên branch `feature/FND-06-database-migration`.

## Mục tiêu

Thiết lập PostgreSQL/PostGIS, Redis, Prisma schema, migration, seed và lớp truy cập database cho NestJS Backend.

## Thay đổi

- Thêm PostgreSQL 16/PostGIS và Redis vào `infra/compose.yaml`.
- Thêm Prisma schema gồm 18 bảng MVP.
- Thêm enum, quan hệ, unique key và index chính.
- Sinh initial migration SQL từ Prisma schema.
- Bổ sung các `CHECK` constraint không biểu diễn được trong Prisma schema.
- Bật extension PostGIS trong migration.
- Thêm seed idempotent cho category và địa điểm demo.
- Thêm `PrismaService` và `DatabaseModule` global cho NestJS.
- Thêm scripts validate, generate, migrate, seed và seed typecheck.
- Đồng bộ `DATABASE_URL` mẫu với schema `public`.

## Các bảng được tạo

1. `users`
2. `user_profiles`
3. `user_sessions`
4. `categories`
5. `user_preferences`
6. `places`
7. `place_categories`
8. `place_images`
9. `place_opening_hours`
10. `favorites`
11. `reviews`
12. `plans`
13. `plan_items`
14. `plan_shares`
15. `user_feedbacks`
16. `ai_interactions`
17. `events`
18. `admin_audit_logs`

## Quyết định

- Prisma `6.16.2` được pin để giữ API/config ổn định cho giai đoạn đầu.
- UUID là primary key; tiền dùng `BigInt`; thời gian dùng `timestamptz`.
- Constraint quan trọng được enforce cả ở application layer trong task tương lai và database migration.
- Seed dùng `upsert` để có thể chạy lại.
- PrismaService không chủ động kết nối khi module khởi tạo; Prisma kết nối lazy ở truy vấn đầu tiên.

## Kiểm tra

Các kiểm tra đã pass:

```text
pnpm db:validate
pnpm db:generate
pnpm db:typecheck
pnpm typecheck
pnpm --filter @wanderly/api test
pnpm --filter @wanderly/api build
pnpm format:check
```

Ngoài ra, migration SQL đã được đối chiếu với schema bằng `prisma migrate diff`: cả schema và initial migration đều chứa 18 bảng.

## Giới hạn môi trường

Máy thực thi hiện không cài Docker hoặc PostgreSQL local, vì vậy chưa chạy được smoke test `prisma migrate dev` và `prisma db seed` trên database thật. Compose, schema, generated client, seed typecheck và migration structure đã được kiểm tra tĩnh. Khi có Docker, chạy:

```bash
docker compose -f infra/compose.yaml up -d
pnpm db:migrate
pnpm db:seed
```

Runtime database smoke test phải được thực hiện trước khi merge hoặc deploy môi trường dùng chung.

## Tệp chính

- `infra/compose.yaml`.
- `prisma/schema.prisma`.
- `prisma/migrations/20260810000100_initial_schema/migration.sql`.
- `prisma/seed.ts`.
- `apps/api/src/database/database.module.ts`.
- `apps/api/src/database/prisma.service.ts`.

## Task tiếp theo

`FND-04` — Định nghĩa API contract, thực hiện trên branch riêng.
