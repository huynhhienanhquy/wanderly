# MOB-54 — Itinerary editing hardening

Bổ sung kiểm tra smoke cho các hành động itinerary hiện có và giữ dữ liệu chỉnh sửa cục bộ an toàn.

## Hoàn thành

- Remove/replace là pure function, không mutate plan hiện tại và không tạo ID trùng.
- Dữ liệu cache sai cấu trúc bị loại bỏ an toàn.
- UI rollback về plan trước đó nếu lưu chỉnh sửa thất bại và thông báo lỗi qua live region.
- Test bao phủ remove, replace, persistence và cache hỏng.
