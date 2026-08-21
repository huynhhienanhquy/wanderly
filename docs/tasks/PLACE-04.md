# PLACE-04 — API danh sách địa điểm

## Mục tiêu

Cung cấp danh sách địa điểm active ổn định cho Explore Web/Mobile với pagination, sorting và dữ liệu tóm tắt.

## Phạm vi đã thực hiện

- `GET /places` không yêu cầu đăng nhập.
- Cursor pagination dạng opaque, mặc định 20 và giới hạn tối đa 50 bản ghi.
- Hỗ trợ sort theo `popular`, `rating`, `newest` và `priceAsc` qua whitelist.
- Chỉ trả địa điểm `ACTIVE` và chưa bị soft-delete.
- Response gồm thông tin tóm tắt, tọa độ, rating, khoảng giá, thời lượng, category và ảnh bìa.
- Chuyển Prisma Decimal/BigInt thành JSON number trước khi trả response.
- Lấy thêm một bản ghi để xác định `nextCursor`, không chạy count query không cần thiết.
- Query và response contract dùng chung trong `@wanderly/contracts`.

## Quyết định kỹ thuật

- Cursor chỉ chứa UUID được encode base64url và được validate trước khi đưa vào Prisma.
- Sorting dùng danh sách cố định để tránh truyền trực tiếp input vào `orderBy`.
- Search, category/price/distance/rating filter thuộc PLACE-05 và không được trộn vào task này.

## Kiểm tra

- Test contract query, cursor, controller validation, pagination và mapping response.
- API/workspace typecheck và production build: đạt.

## Việc tiếp theo

- PLACE-05: API tìm kiếm và bộ lọc.
