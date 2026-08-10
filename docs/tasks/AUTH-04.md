# AUTH-04 — Quên và đặt lại mật khẩu

## Mục tiêu

Cung cấp luồng khôi phục mật khẩu không làm lộ sự tồn tại của tài khoản.

## Phạm vi đã thực hiện

- API yêu cầu reset luôn trả thông báo trung tính.
- Reset token ngẫu nhiên, database chỉ lưu hash, hết hạn sau 30 phút và chỉ dùng một lần.
- Token cũ của cùng user bị vô hiệu khi tạo yêu cầu mới.
- Đổi mật khẩu trong transaction và thu hồi toàn bộ session đang hoạt động.
- Adapter email tách khỏi auth; local log URL, production không trả token trong response.
- Form Web và Mobile cho yêu cầu/hoàn tất reset.
- Migration tạo bảng `password_reset_tokens`.

## Kiểm tra

- Prisma schema/client, unit test auth, typecheck và build workspace đạt.

## Việc tiếp theo

- Cấu hình email provider thật trong giai đoạn tích hợp external services.
- AUTH-05: phân quyền User/Admin.
