# REC-01 — Lọc candidate theo ràng buộc cứng

## Trạng thái

Done — 2026-08-18.

## Kết quả

- Thêm `POST /recommendations/candidates` với shared request/response contract.
- Chỉ lấy Place active, chưa xóa; loại candidate thuộc category bị cấm, vượt ngân sách bình quân, quá bán kính hoặc đóng cửa tại giờ bắt đầu.
- Khoảng cách dùng Haversine và giờ mở cửa dùng dữ liệu đã chuẩn hóa.
- Giới hạn truy vấn 200 candidate và response tối đa 50 để giữ bounded workload.

## Kiểm thử

- Unit test bao phủ trường hợp hợp lệ, category cấm, vượt ngân sách, quá xa và đóng cửa.
