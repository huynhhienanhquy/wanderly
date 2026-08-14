# PLAN-07 — Validate kế hoạch cuối cùng

## Mục tiêu

Đưa ra một kết quả kiểm tra tổng hợp, rõ nguyên nhân trước khi người dùng sử dụng hoặc chia sẻ kế hoạch.

## Phạm vi đã hoàn thành

- Kiểm tra tên, ngày và giờ kết thúc bắt buộc.
- Từ chối kế hoạch rỗng hoặc chưa tải đủ dữ liệu địa điểm.
- Tổng hợp lỗi giờ mở cửa, thời lượng/di chuyển, ngân sách và thời tiết.
- Trả kết quả có cấu trúc gồm `valid` và danh sách lỗi theo category.
- Loại lỗi trùng trong cùng category và hiển thị nguồn lỗi trên giao diện.

## Quyết định

Validation thuần được tách khỏi React để có thể tái sử dụng và kiểm thử độc lập. PLAN-08 chịu trách nhiệm xác thực lại dữ liệu khi lưu vào backend; việc đó không làm PLAN-07 phụ thuộc vào trạng thái đăng nhập.

## Kiểm thử

- Unit test kế hoạch hợp lệ, metadata thiếu, dữ liệu địa điểm chưa tải đủ và lỗi trùng.
- `pnpm --filter @wanderly/web test`
- `pnpm --filter @wanderly/web build`
- `pnpm typecheck`

## Trạng thái

Done — validation tổng hợp đã được tích hợp vào Planner và có kết quả phân loại.
