# FND-07 — Thiết lập convention

## Trạng thái

Hoàn thành ngày 2026-08-10.

## Mục tiêu

Thiết lập quy tắc làm việc thống nhất cho monorepo, pull request, API, database, test và hồ sơ task.

## Thay đổi

- Thêm `CONTRIBUTING.md` với branch, commit, review và quality gate.
- Thêm pull request template có checklist Web/Mobile/API/database.
- Thêm TypeScript strict base config.
- Thêm Prettier config và ignore list giới hạn đúng phạm vi dự án.
- Thêm root scripts cho format, typecheck, test và build.
- Chuẩn hóa quy trình tạo hồ sơ sau mỗi task.

## Quyết định

- Dùng Conventional Commits.
- Branch chứa task ID.
- Mỗi pull request cần ít nhất một approval.
- Quality gate chung chạy qua Turborepo.
- Task chỉ được chuyển `Done` khi có hồ sơ và evidence kiểm tra.

## Kiểm tra

- `pnpm format:check` pass.
- `pnpm typecheck` pass cho bốn package tại thời điểm hoàn thành.
- `pnpm test` pass cho bốn test runner tại thời điểm hoàn thành.
- `pnpm build` pass cho contracts, Web, Mobile và API tại thời điểm hoàn thành.

## Tệp chính

- `CONTRIBUTING.md`.
- `.github/pull_request_template.md`.
- `.prettierrc.json`, `.prettierignore`.
- `tsconfig.base.json`, `turbo.json`.
- `docs/TASK_STATUS.md`.

## Task tiếp theo

Tiếp tục xác minh `FND-06` trên PostgreSQL/PostGIS, sau đó triển khai `FND-04` API contract.
