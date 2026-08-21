# EXP-03 — Collection cơ bản

## Mục tiêu

Hiển thị các nhóm địa điểm dựng sẵn để người dùng khám phá nhanh theo ngữ cảnh.

## Phạm vi đã hoàn thành

- Trang `/collections` có đủ Trending, Under 100k, Date và Rainy Day.
- Trending dùng độ phổ biến; Under 100k dùng giá khởi điểm và sort tăng dần.
- Date lọc category `cafe`; Rainy Day chỉ lấy địa điểm `INDOOR`.
- Mỗi collection tải độc lập nên lỗi của một request không chặn các collection còn lại.
- Card hiển thị địa bàn, giá và liên kết tới Place Detail.

## Quyết định

Định nghĩa collection được tách khỏi component để tái sử dụng và kiểm thử. Các collection hiện dùng API danh sách thay vì endpoint riêng.

## Kiểm thử

- Unit test xác nhận đủ bốn collection và constraint Rainy Day.
- `pnpm --filter @wanderly/web test`
- `pnpm --filter @wanderly/web build`
- `pnpm typecheck`

## Trạng thái

Done — bốn collection cơ bản đã được tích hợp và tải độc lập.
