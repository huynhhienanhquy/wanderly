# PREF-01 — Khai báo danh mục sở thích

## Trạng thái

Done — 2026-08-18.

## Kết quả

- Dùng bảng `Category` và dữ liệu seed làm nguồn danh mục sở thích duy nhất.
- Thêm `GET /preferences/categories`, chỉ trả category đang hoạt động và sắp xếp theo tên.
- Thêm contract `InterestCategory` dùng chung cho Web, Mobile và API.
- Có test bảo đảm điều kiện active và thứ tự ổn định.

## Kiểm thử

- API test và typecheck workspace đạt.
