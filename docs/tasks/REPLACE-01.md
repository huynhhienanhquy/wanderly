# REPLACE-01 — Xác định constraint của slot

## Kết quả

Đã bổ sung hàm miền `getReplacementSlotConstraints` để chuẩn hóa các ràng buộc cần dùng khi tìm địa điểm thay thế cho một mục trong lịch trình.

## Phạm vi triển khai

- Xác định giờ bắt đầu, giờ kết thúc và thời lượng tối đa của slot.
- Lấy tọa độ địa điểm liền trước và liền sau để phục vụ xếp hạng theo khoảng cách.
- Giữ lại nhóm category của địa điểm hiện tại làm tín hiệu tìm kiếm.
- Tính ngân sách còn lại sau khi trừ chi phí các mục không bị thay thế.
- Trả về `null` nếu item không tồn tại và dùng thời lượng mặc định 60 phút khi thiếu dữ liệu.

## Kiểm thử

- Bao phủ đầy đủ ràng buộc thời gian, vị trí, category và budget.
- Bao phủ slot cuối, thời lượng mặc định và item không tồn tại.
