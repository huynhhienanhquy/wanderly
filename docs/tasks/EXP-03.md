# EXP-03 — Collection cơ bản

## Mục tiêu

Hiển thị các nhóm địa điểm dựng sẵn để người dùng khám phá nhanh.

## Phạm vi hoàn thành

- Tạo trang Web `/collections` với đủ Trending, Under 100k, Date và Rainy Day.
- Date dùng category cafe; Rainy Day chỉ lấy địa điểm indoor.
- Tái sử dụng API danh sách với sort/price filter; card liên kết tới Place Detail.

## Kiểm tra

- `pnpm typecheck`.
- Unit test xác nhận đủ bốn collection và rainy-day filter.
- Mỗi collection tải độc lập và báo lỗi khi API thất bại.

## Việc tiếp theo

- Bổ sung collection theo thời tiết sau WEATHER-02.
- Đồng bộ collection trên Mobile.
