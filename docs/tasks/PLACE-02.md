# PLACE-02 — Import/seed dữ liệu địa điểm

## Mục tiêu

Cung cấp bộ dữ liệu đủ đa dạng để phát triển và demo Explore, filter, recommendation và itinerary mà không phụ thuộc API bên ngoài.

## Phạm vi đã thực hiện

- 8 category: cafe, food, art, outdoor, photography, culture, shopping và entertainment.
- 10 địa điểm demo tổng hợp tại các khu vực Hà Nội; tên đều có tiền tố Wanderly để không bị hiểu là doanh nghiệp thật.
- Dữ liệu bao phủ nhiều khoảng giá, rating, thời lượng và loại indoor/outdoor/mixed.
- Mỗi địa điểm có category relevance và giờ mở cửa đủ bảy ngày.
- Seed dùng `upsert`, sau đó đồng bộ lại category/opening hours trong transaction nên chạy lặp lại không tạo dữ liệu trùng.
- `providerPlaceId` ổn định theo namespace `demo:` để sẵn sàng cho provider adapter.
- Kiểm thử dataset kiểm tra slug duy nhất, category reference, tọa độ, giá, rating và score.

## Cách chạy

1. Khởi động PostgreSQL và chạy migration.
2. Chạy `pnpm db:seed`.
3. Có thể chạy lại cùng lệnh để cập nhật dataset.

## Kiểm tra

- `pnpm db:seed:test`: đạt.
- `pnpm db:typecheck`: đạt.
- Prisma schema validation: đạt.
- Chưa chạy integration seed vào PostgreSQL trong phiên này vì máy không có Docker CLI; cần chạy `pnpm db:seed` khi database local sẵn sàng.

## Việc tiếp theo

- PLACE-03: chuẩn hóa thông tin địa điểm và xây pipeline validation/import.
