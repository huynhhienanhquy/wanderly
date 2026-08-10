# AUTH-05 — Phân quyền User/Admin

## Mục tiêu

Bảo vệ endpoint bằng access token và giới hạn thao tác quản trị cho role Admin.

## Phạm vi đã thực hiện

- Xác minh Bearer token HMAC-SHA256, chữ ký constant-time và thời hạn token.
- `AuthGuard` gắn claims đã xác minh vào request.
- Decorator `@Roles()` và `RolesGuard` trả 403 khi role không phù hợp.
- Endpoint kiểm chứng quyền user và admin để tích hợp/test.
- Guard được export từ AuthModule để các feature khác tái sử dụng.

## Kiểm tra

- Unit test token hợp lệ và token bị sửa.
- Toàn bộ test auth, typecheck và build workspace đạt.

## Việc tiếp theo

- Áp dụng guard cho profile trong AUTH-06 và các API sở hữu dữ liệu về sau.
