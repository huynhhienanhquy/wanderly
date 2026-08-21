# PLACE-05 — API tìm kiếm và bộ lọc

## Trạng thái

Done — 2026-08-18.

## Mục tiêu

Cho phép client tìm và thu hẹp danh sách địa điểm theo các ràng buộc chính của MVP.

## Kết quả

- `GET /places` hỗ trợ tìm không phân biệt hoa thường theo tên, địa chỉ và quận.
- Hỗ trợ lọc theo category đang hoạt động, giá tối đa, rating tối thiểu và loại không gian.
- Hỗ trợ lọc bán kính khi client cung cấp đủ `latitude`, `longitude` và `radiusMeters`.
- Contract kiểm tra giới hạn tọa độ, bán kính 100–50.000 m và yêu cầu ba tham số vị trí phải đi cùng nhau.
- Explore đồng bộ bộ lọc với URL và có thể lấy vị trí hiện tại từ trình duyệt.
- Kết quả chỉ chứa địa điểm `ACTIVE`, chưa bị xóa và tiếp tục dùng cursor pagination.

## Kiểm thử

- Controller test kiểm tra chuẩn hóa query và từ chối tham số không hợp lệ.
- Service test kiểm tra ánh xạ search/filter sang Prisma và loại địa điểm ngoài bán kính.
- API test và typecheck workspace đạt.

## Giới hạn

Lọc khoảng cách hiện tính Haversine trên tối đa 500 candidate. Khi dữ liệu tăng lớn cần chuyển sang truy vấn không gian có index (PostGIS hoặc provider phù hợp).
