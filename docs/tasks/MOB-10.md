# MOB-10 — Smart Replace native

## Mục tiêu

Cho phép thay nhanh một điểm dừng bằng gợi ý phù hợp mà không tạo lại toàn bộ lịch trình.

## Thay đổi

- Thêm bottom modal tải danh sách recommendation thay thế.
- Loại địa điểm hiện tại, hiển thị lý do gợi ý và action chọn.
- Giữ nguyên khung giờ khi thay điểm dừng và lưu kế hoạch ngay sau xác nhận.
- Bổ sung trạng thái loading/error và đóng modal theo chuẩn native.

## Kiểm tra

`pnpm --filter @wanderly/mobile typecheck`

## Kết quả

Task hoàn tất ngày 2026-08-20.
