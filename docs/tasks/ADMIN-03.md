# ADMIN-03 — Quản lý users và events

Admin có thể liệt kê 100 user gần nhất và khóa/mở khóa tài khoản qua `/admin/users`; mọi thay đổi trạng thái được audit và admin không thể tự khóa mình. Quản lý event tái sử dụng CRUD `/events/admin`, `/events`, `/events/:id` từ EVENT-01, cùng AuthGuard/ADMIN role.
