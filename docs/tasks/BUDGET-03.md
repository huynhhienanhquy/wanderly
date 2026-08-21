# BUDGET-03 — Cảnh báo vượt ngân sách

## Trạng thái

Done — 2026-08-18.

## Kết quả

- Cảnh báo hiển thị số tiền và tỷ lệ vượt ngân sách.
- Xác định nhóm PLACE/FOOD/TRANSPORT đóng góp chi phí lớn nhất.
- Mức độ `MEDIUM` hoặc `HIGH` dựa trên tỷ lệ vượt 25%; dữ liệu thiếu giá dùng mức `INFO`.
- Không báo vượt sai khi tổng hiện tại dưới hạn mức nhưng còn dữ liệu chưa biết.

## Kiểm thử

- Test severity, nguyên nhân lớn nhất và cảnh báo bất định do thiếu giá.
