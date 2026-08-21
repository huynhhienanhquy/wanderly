# REPLACE-04 — Giao diện Smart Replace

## Kết quả

Đã tích hợp luồng Smart Replace vào trang Planner từ lúc chọn slot đến khi xác nhận phương án hợp lệ.

## Phạm vi

- Nút `Thay thế` cho từng plan item ở chế độ chỉnh sửa.
- Panel dạng dialog có loading, error và empty state.
- Danh sách candidate hiển thị match score và lý do đề xuất.
- Preview ngân sách, thời lượng, quãng đường và delta tương ứng.
- Chặn xác nhận phương án vi phạm thời gian/ngân sách; phương án hợp lệ được lưu vào plan.

## Kiểm thử

- Logic candidate và preview được bao phủ bởi unit test của REPLACE-02/03.
- Web production build và workspace typecheck xác minh tích hợp React.
