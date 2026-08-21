# EXP-06 — Add to Plan

## Mục tiêu

Cho phép người dùng thêm địa điểm từ Place Detail vào bản nháp kế hoạch hiện tại.

## Phạm vi đã hoàn thành

- Chọn giờ bắt đầu trước khi thêm địa điểm.
- Lưu `id`, `slug`, `name`, `startTime` đúng schema của Planner.
- Tự sắp xếp timeline theo giờ bắt đầu.
- Không thêm trùng cùng một địa điểm và trả thông báo rõ ràng.
- Parser cũ vẫn migration item chưa có `startTime`, bảo đảm tương thích dữ liệu localStorage trước đó.

## Quyết định

EXP-06 ghi vào bản nháp localStorage hiện tại để hoạt động khi chưa đăng nhập. Đồng bộ backend/tài khoản thuộc PLAN-08 và không thay đổi hành vi Add to Plan cơ bản.

## Kiểm thử

- Unit test migration, sort không mutation, thêm đúng giờ và chống trùng.
- `pnpm --filter @wanderly/web test`
- `pnpm --filter @wanderly/web build`
- `pnpm typecheck`

## Trạng thái

Done — flow Add to Plan tương thích với Planner hiện tại và đã được kiểm thử.
