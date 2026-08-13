# REVIEW-01 — Tạo và cập nhật đánh giá

## Mục tiêu

Cho phép người dùng nhập rating và nội dung đánh giá từ Place Detail.

## Phạm vi hoàn thành

- Thêm form chọn điểm 1–5 và nội dung tối đa 1.000 ký tự.
- Validate tự nhiên qua giới hạn UI, lưu bản nháp theo `placeId` trong localStorage.
- Hiển thị trạng thái sau khi gửi.

## Kiểm tra

- `pnpm typecheck` đạt toàn workspace.

## Giới hạn

Do auth context và Review API chưa có, bản hiện tại lưu bản nháp phía Web. Khi backend sẵn sàng, thay handler bằng mutation có user ownership và unique `(userId, placeId)`.

## Việc tiếp theo

- REVIEW-02: danh sách review và pagination.
- Đồng bộ form với Review API sau AUTH-02.
