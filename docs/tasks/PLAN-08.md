# PLAN-08 — API lưu và lấy lịch trình

## Phạm vi đã hoàn thành

- Contract Zod cho Plan, PlanItem và CreatePlan.
- CRUD create/list/get/delete với Prisma persistence.
- Mọi endpoint `/plans` được bảo vệ bằng bearer `AuthGuard`.
- Owner luôn lấy từ JWT claim `sub`; không còn chấp nhận `x-user-id` từ client.
- Query đọc/xóa đều giới hạn theo `ownerUserId` để chống truy cập chéo tài khoản.

## Kiểm thử

- Controller test xác nhận JWT subject được truyền vào list/remove.
- Service test và API test toàn package.
- `pnpm --filter @wanderly/api test`
- `pnpm typecheck`

## Trạng thái

Done — persistence owner-scoped đã dùng principal xác thực thật.
