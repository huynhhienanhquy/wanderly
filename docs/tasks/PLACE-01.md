# PLACE-01 — Thiết kế bảng Place và Category

## Mục tiêu

Hoàn thiện mô hình dữ liệu địa điểm và danh mục để làm nền cho import, tìm kiếm, lọc và recommendation.

## Phạm vi đã thực hiện

- `Place` lưu provider, định danh ngoài, tên/slug, mô tả, địa chỉ và tọa độ.
- Hỗ trợ rating, số review, khoảng giá, thời lượng, indoor/outdoor, độ phổ biến và trạng thái.
- `Category` có slug, tên, icon, mô tả và trạng thái active.
- Quan hệ many-to-many `PlaceCategory` có relevance từ 0 đến 1.
- Place có quan hệ ảnh và giờ mở cửa để phục vụ các task chuẩn hóa tiếp theo.
- Foreign key cascade phù hợp và unique provider/providerPlaceId.
- CHECK constraints cho tọa độ, rating, giá, duration, relevance, slug và country code.
- Index phục vụ danh sách theo city/status, rating, price, category active và provider sync.

## Quyết định kỹ thuật

- Slug chỉ dùng chữ thường, số và dấu gạch ngang để URL ổn định.
- Country code bắt buộc ISO alpha-2 viết hoa.
- Provider payload giữ dạng JSON để audit dữ liệu nguồn nhưng trường dùng để query được chuẩn hóa thành cột riêng.
- Quan hệ category dùng bảng nối thay vì enum để có thể mở rộng danh mục mà không migration enum.

## Kiểm tra

- Prisma schema validation: đạt.
- Prisma Client generation và database TypeScript typecheck: đạt.

## Việc tiếp theo

- PLACE-02: import/seed bộ dữ liệu địa điểm demo.
