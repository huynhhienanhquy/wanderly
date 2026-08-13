# EXP-02 — Thanh tìm kiếm và bộ lọc

## Mục tiêu

Cho phép người dùng tìm địa điểm theo từ khóa và lọc ngân sách trên Explore. Trạng thái bộ lọc được lưu trong URL.

## Phạm vi hoàn thành

- Mở rộng contract `GET /places` với `q`, `priceMax`, `minRating`, `category`, `indoorOutdoor`.
- Áp dụng điều kiện an toàn trong Prisma service cho tên/địa chỉ, giá, rating, category và loại không gian.
- Thêm thanh tìm kiếm và lựa chọn ngân sách trên Web Explore, đồng bộ query string.

## Kiểm tra

- `pnpm typecheck`: đạt cho contracts, API, Web và Mobile.
- Tham số được parse bởi Zod; sort vẫn dùng allow-list.

## Quyết định

- Query string là nguồn trạng thái duy nhất; đổi bộ lọc sẽ tải lại trang đầu.
- `priceMax` so sánh với `priceMin` để lọc theo giá khởi điểm.

## Việc tiếp theo

- Bổ sung UI cho category/rating/indoor-outdoor và test tích hợp PostgreSQL.
- EXP-03: collection theo ngữ cảnh.
