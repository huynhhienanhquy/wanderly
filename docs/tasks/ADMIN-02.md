# ADMIN-02 — CRUD địa điểm và danh mục

Đã bổ sung API quản trị catalog dưới `/admin/catalog`, được bảo vệ bởi AuthGuard và quyền ADMIN. Admin có thể liệt kê/tạo/cập nhật/soft-delete địa điểm, liệt kê/upsert/vô hiệu hóa category; place input dùng normalizer chung và quan hệ category được đồng bộ khi cập nhật.
