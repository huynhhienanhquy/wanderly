# PLAN-02 — Planner v1

## Mục tiêu

Cho phép người dùng quản lý thông tin cơ bản và danh sách địa điểm của kế hoạch hiện tại trên Web.

## Phạm vi đã hoàn thành

- Đặt và lưu tên, ngày, giờ kết thúc, ngân sách và điều kiện thời tiết của kế hoạch.
- Đọc danh sách địa điểm, giờ bắt đầu và sắp xếp timeline từ localStorage.
- Cho phép đổi giờ hoặc xóa địa điểm khỏi kế hoạch.
- Khôi phục metadata bằng parser có kiểm tra kiểu; dữ liệu hỏng hoặc thiếu dùng giá trị mặc định an toàn.
- Dữ liệu được chia sẻ vẫn có thể mở ở chế độ chỉ đọc qua PLAN-12.

## Quyết định

Planner v1 tiếp tục dùng localStorage cho bản nháp cục bộ. Đồng bộ tài khoản và persistence backend thuộc PLAN-08.

## Kiểm thử

- Unit test cho metadata hợp lệ, thiếu trường và JSON không hợp lệ.
- `pnpm --filter @wanderly/web test`
- `pnpm --filter @wanderly/web build`
- `pnpm typecheck`

## Trạng thái

Done — đầu ra Planner v1 đã tồn tại, build được và có kiểm thử cho quá trình khôi phục dữ liệu.
