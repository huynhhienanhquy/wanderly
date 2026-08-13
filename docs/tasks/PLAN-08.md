# PLAN-08 — API lưu và lấy lịch trình

## Phạm vi hoàn thành

- Thêm contract Zod cho Plan, PlanItem và CreatePlan.
- Chuẩn hóa các trường title, ngày, ngân sách, vị trí, giờ bắt đầu và thời lượng.
- Export contract từ package dùng chung cho API/Web/Mobile.

## Kiểm tra

- `pnpm typecheck` đạt toàn workspace.
- Cập nhật `TASK_STATUS.md`.

## Giới hạn

CRUD create/list/get/delete và Prisma persistence đã có. Header `x-user-id` hiện là adapter tạm; cần thay bằng JWT principal từ AUTH-05 trước production.
