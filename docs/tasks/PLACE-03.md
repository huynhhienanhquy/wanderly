# PLACE-03 — Chuẩn hóa thông tin địa điểm

## Mục tiêu

Đưa dữ liệu địa điểm từ seed hoặc provider về một cấu trúc nhất quán trước khi ghi database.

## Phạm vi đã thực hiện

- Nhận số ở dạng number hoặc chuỗi số và chuyển về number hữu hạn.
- Chuẩn hóa khoảng trắng, country code viết hoa, slug/category viết thường.
- Kiểm tra tọa độ, rating, review count, khoảng giá và thời lượng.
- Kiểm tra category không trùng, giờ mở cửa theo ngày và định dạng `HH:mm`.
- Kiểm tra URL/thứ tự ảnh và chỉ cho phép một ảnh bìa.
- Sắp xếp category, ảnh và giờ mở cửa để output ổn định.
- Seed PLACE-02 đi qua normalizer trước khi upsert vào database.

## Quyết định kỹ thuật

- Normalizer đặt trong `@wanderly/contracts` để backend, import scripts và provider adapters dùng chung.
- Validation chạy trước database constraints nhằm trả lỗi gần nguồn dữ liệu hơn.
- Output không phụ thuộc Prisma, giúp tái sử dụng ở nhiều runtime.

## Kiểm tra

- Unit test dữ liệu hợp lệ và các trường hợp tọa độ, giá, nested data sai.
- Database typecheck, workspace typecheck và production build: đạt.
- Dataset seed test không thể chạy lại trong phiên này do Node/Windows trả `uv_os_get_passwd ENOMEM`; bộ test này đã đạt ở PLACE-02 và không bị sửa trong task này.

## Việc tiếp theo

- PLACE-04: API danh sách địa điểm với pagination và sorting.
