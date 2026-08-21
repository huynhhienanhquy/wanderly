# EXP-05 — Directions và Share

## Mục tiêu

Giúp người dùng mở chỉ đường và chia sẻ Place Detail.

## Phạm vi hoàn thành

- Nút “Chỉ đường” mở Google Maps Directions với tọa độ địa điểm.
- Nút “Chia sẻ” dùng Web Share API khi có hỗ trợ; fallback sao chép URL vào clipboard.
- Hiển thị trạng thái thao tác chia sẻ và style nút hành động.

## Kiểm tra

- `pnpm typecheck` đạt.
- Tọa độ được encode trước khi đưa vào URL; chia sẻ không làm thay đổi dữ liệu địa điểm.

## Việc tiếp theo

- Thêm deep link và native share trên Mobile.
- EXP-06: thêm địa điểm vào kế hoạch.
