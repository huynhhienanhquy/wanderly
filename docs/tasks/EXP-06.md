# EXP-06 — Add to Plan

## Mục tiêu

Cho phép người dùng thêm địa điểm từ Place Detail vào kế hoạch hiện tại.

## Phạm vi hoàn thành

- Thêm lựa chọn giờ bắt đầu và nút “Thêm vào kế hoạch” trên Web Place Detail.
- Lưu danh sách tối giản `id`, `slug`, `name` trong localStorage để dùng xuyên phiên.
- Chặn bản ghi trùng và hiển thị trạng thái đã thêm/đã tồn tại.
- Item mới dùng đúng schema planner và tự sắp xếp theo giờ.

## Kiểm tra

- `pnpm typecheck` đạt toàn workspace.
- Unit test add/sort/duplicate đạt.
- Dữ liệu lưu chỉ chứa định danh cần thiết, không ghi đè các kế hoạch khác ngoài key phiên hiện tại.

## Việc tiếp theo

- Xây Plan API và màn hình itinerary để đồng bộ dữ liệu với tài khoản.
- Thêm trải nghiệm Add to Plan trên Mobile.
