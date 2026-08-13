# REVIEW-02 — Danh sách đánh giá

## Mục tiêu

Hiển thị các đánh giá gần đây của địa điểm trên Place Detail.

## Phạm vi hoàn thành

- Lọc review theo `placeId`.
- Hiển thị tối đa 20 review mới nhất, rating, nội dung và ngày tạo.
- Có empty state khi địa điểm chưa có review.

## Kiểm tra

- `pnpm typecheck` đạt toàn workspace.

## Giới hạn

Danh sách hiện đọc từ bản nháp localStorage được tạo ở REVIEW-01. Pagination và dữ liệu user sẽ chuyển sang Review API khi backend hoàn thiện.

## Việc tiếp theo

- REVIEW-03: báo cáo review vi phạm.
