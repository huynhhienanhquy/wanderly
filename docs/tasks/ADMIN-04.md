# ADMIN-04 — Quản lý review/report

## Trạng thái

Done — 2026-08-18.

## Kết quả

- Thêm API admin lấy tối đa 50 báo cáo theo trạng thái, mặc định giao diện lấy báo cáo `OPEN`.
- Thêm thao tác đóng báo cáo; quản trị viên có thể giữ hoặc ẩn review bị báo cáo.
- Endpoint được bảo vệ bằng JWT và role `ADMIN`.
- Mỗi thao tác kiểm duyệt ghi `AdminAuditLog`, gồm dữ liệu trước/sau và admin thực hiện.
- Web admin hiển thị lý do, nội dung, điểm đánh giá và địa điểm; báo cáo biến mất khỏi hàng chờ sau khi xử lý thành công.
- Thêm contract dùng chung và unit test cho API controller cùng web API client.

## API

- `GET /admin/review-reports?status=OPEN`
- `PATCH /admin/review-reports/:id`

Payload PATCH:

```json
{
  "status": "RESOLVED",
  "hideReview": true
}
```

## Kiểm thử

- API, Web, Web build và typecheck toàn workspace đạt.
