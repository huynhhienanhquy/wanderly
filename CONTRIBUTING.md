# Đóng góp cho Wanderly

## Yêu cầu môi trường

- Node.js `>=22.14.0`.
- pnpm đúng phiên bản ghi trong `packageManager` của `package.json`.
- Docker Compose khi làm việc với PostgreSQL/Redis.

## Cài đặt

```bash
corepack enable
pnpm install
cp .env.example .env
```

Không commit `.env`, token, API key hoặc dữ liệu cá nhân.

## Workflow

1. Chọn task ở trạng thái `Ready` trong backlog.
2. Tạo branch từ nhánh tích hợp mới nhất.
3. Chỉ giữ tối đa hai task `In Progress` cho mỗi thành viên.
4. Viết code và test trong phạm vi task.
5. Chạy quality gate.
6. Tạo pull request và liên kết task.
7. Nhận ít nhất một approval trước khi merge.

## Tên branch

```text
feature/<task-id>-<short-name>
fix/<task-id>-<short-name>
docs/<task-id>-<short-name>
```

Ví dụ:

```text
feature/AUTH-01-register
fix/PLAN-03-opening-hours
docs/FND-05-scaffold-record
```

## Commit

Dùng Conventional Commits:

```text
<type>(<scope>): <description>
```

Các type chính: `feat`, `fix`, `docs`, `test`, `refactor`, `build`, `ci`, `chore`.

Ví dụ:

```text
feat(auth): add email registration endpoint
test(planner): cover opening-hour constraint
docs(FND-05): record scaffold verification
```

## Quality gate

Chạy trước khi tạo pull request:

```bash
pnpm peers check
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
```

Nếu thay đổi Prisma schema:

```bash
pnpm db:validate
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

## Quy tắc kiến trúc

- Web/Mobile không truy cập database hoặc external provider trực tiếp.
- Backend module giao tiếp qua public service contract, không import file nội bộ của module khác.
- Web và Mobile chia sẻ schema, typed API client và domain logic; không chia sẻ UI component.
- LLM không được tạo `place_id`, giá, giờ mở cửa, khoảng cách hoặc route.
- Mọi dữ liệu LLM phải được validate trước khi dùng.
- Tiền dùng integer; thời gian lưu UTC và có timezone rõ ràng.
- External provider phải nằm sau adapter và có timeout.

## Quy tắc API

- REST resource dùng danh từ số nhiều.
- Request/response phải có Zod contract hoặc OpenAPI schema.
- List endpoint phải có pagination.
- Không nhận `user_id`, score, cost hoặc ownership từ client khi backend có thể tự xác định.
- Error response dùng mã ổn định, message an toàn và request ID.
- Thay đổi breaking API cần được ghi rõ trong pull request.

## Quy tắc database

- Mọi thay đổi schema đi qua migration.
- Không sửa migration đã được áp dụng trên môi trường dùng chung.
- Seed phải idempotent bằng `upsert` hoặc khóa ổn định.
- Không xóa vật lý dữ liệu lịch sử nếu chưa có retention policy.
- Constraint nghiệp vụ quan trọng phải có cả validation trong code và database khi phù hợp.

## Testing

- Unit test cho validation, scoring, budget và planner constraints.
- Integration test cho Backend API và database transaction.
- E2E test cho ba hành trình demo chính.
- Bug fix phải có regression test khi có thể tái hiện tự động.
- Không dùng network thật trong unit/integration test; external provider phải được mock.

## Hồ sơ task

Khi hoàn thành một task:

1. Tạo `docs/tasks/<TASK-ID>.md`.
2. Ghi mục tiêu, thay đổi, quyết định và cách kiểm tra.
3. Ghi giới hạn hoặc phần chưa thực hiện.
4. Cập nhật `docs/TASK_STATUS.md`.
5. Cập nhật tài liệu kiến trúc/API/database nếu contract thay đổi.

Không đánh dấu `Done` nếu đầu ra chưa được kiểm tra.

## Pull request

Pull request phải:

- Có phạm vi nhỏ, liên kết một hoặc một nhóm task liên quan chặt chẽ.
- Nêu hành vi trước/sau và ảnh hưởng Web/Mobile/API/database.
- Có ảnh hoặc video nếu thay đổi UI.
- Có migration plan nếu thay đổi database.
- Có test evidence và hướng dẫn reviewer kiểm tra.
- Không chứa thay đổi định dạng hoặc refactor ngoài phạm vi không cần thiết.
