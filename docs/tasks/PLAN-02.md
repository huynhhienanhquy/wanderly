# PLAN-02 — Thông tin kế hoạch và lịch

## Mục tiêu

Cho phép đặt tên và ngày cho kế hoạch hiện tại.

## Phạm vi hoàn thành

- Thêm trường tên kế hoạch và ngày kế hoạch trên `/plans`.
- Lưu metadata riêng trong localStorage.
- Giữ danh sách địa điểm và thao tác xóa của PLAN-01.

## Kiểm tra

- `pnpm typecheck` đạt toàn workspace.
- `docs/TASK_STATUS.md` được cập nhật trạng thái PLAN-02.

## Giới hạn

Planner Web đã khôi phục metadata, giờ bắt đầu và sắp xếp theo thời gian. Ranking tự động và travel time còn chờ REC-03/MAP-03.

Chưa có phân bổ giờ hoặc nhiều ngày; dữ liệu vẫn là local MVP.
