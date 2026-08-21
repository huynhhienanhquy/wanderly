# REPLACE-03 — Tính lại route, thời gian và budget

## Kết quả

Đã bổ sung preview bất biến cho phương án thay thế, tính lại toàn bộ tác động trước khi cập nhật lịch trình thật.

## Phạm vi

- Thay candidate vào đúng slot và giữ nguyên giờ bắt đầu.
- Tính lại tổng quãng đường, thời lượng hoạt động/di chuyển và ngân sách.
- Trả về delta so với lịch trình hiện tại.
- Đánh dấu phương án không hợp lệ khi vi phạm thời gian hoặc vượt ngân sách.

## Kiểm thử

- Kiểm tra kết quả route, duration, budget, delta và tính bất biến.
- Kiểm tra cảnh báo khi candidate làm vượt ngân sách.
