# EXP-01 — Trang Explore

## Mục tiêu

Hiển thị danh sách địa điểm responsive trên React Web và React Native.

## Phạm vi đã thực hiện

- Route `/explore` cho Web và Mobile.
- Web dùng grid responsive 3/2/1 cột; Mobile dùng `FlatList`.
- Card hiển thị tên, khu vực, rating, mô tả, khoảng giá và category.
- API client dùng chung gọi `GET /places` và validate response.
- Loading, error, empty state và nút tải trang tiếp theo.
- Helper định dạng giá cho trạng thái chưa có giá, miễn phí và khoảng giá.

## Quyết định kỹ thuật

- Explore dùng sort mặc định `popular`; search/filter thuộc EXP-02.
- Phân trang dùng nút “Xem thêm” nhất quán giữa Web/Mobile.
- Ảnh thiếu có fallback thương hiệu.

## Kiểm tra

- Test API client, response validation và price formatting.
- Contract tests, Web/Mobile typecheck và production build workspace: đạt.

## Việc tiếp theo

- EXP-02: thanh tìm kiếm và bộ lọc.
- EXP-04: trang Place Detail sử dụng PLACE-06.
