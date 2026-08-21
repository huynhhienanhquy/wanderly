# PLACE-06 — API chi tiết địa điểm

## Mục tiêu

Cung cấp đầy đủ dữ liệu một địa điểm active cho màn hình Place Detail trên Web và Mobile.

## Phạm vi đã thực hiện

- `GET /places/:slug` lấy địa điểm bằng slug URL ổn định.
- Chỉ trả địa điểm `ACTIVE` và chưa soft-delete; trường hợp còn lại trả 404.
- Response gồm thông tin cơ bản, tọa độ, khoảng giá, rating, thời lượng và indoor/outdoor.
- Category được sắp theo relevance.
- Ảnh được sắp với ảnh bìa trước, sau đó theo `sortOrder`, kèm attribution.
- Giờ mở cửa được sắp theo ngày và chuyển sang chuỗi JSON ổn định.
- Contract chi tiết và validation slug nằm trong `@wanderly/contracts`.

## Quyết định kỹ thuật

- Endpoint dùng slug thay vì UUID để URL dễ đọc và chia sẻ.
- Slug được normalize/validate trước query nhằm loại input dạng path hoặc ký tự ngoài whitelist.
- Review list sẽ có pagination riêng trong REVIEW-02.

## Kiểm tra

- Test contract slug, controller validation, mapping ảnh/giờ mở cửa và 404.
- Contract/API tests, typecheck và production build workspace: đạt.

## Việc tiếp theo

- EXP-04 có thể dùng endpoint này để xây trang Place Detail.
- PLACE-05 chờ MAP-02 để hoàn thiện bộ lọc khoảng cách.
