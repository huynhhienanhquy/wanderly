# EXP-02 — Thanh tìm kiếm và bộ lọc

## Mục tiêu

Cho phép người dùng tìm địa điểm theo từ khóa, thuộc tính và khoảng cách; URL là nguồn trạng thái duy nhất.

## Phạm vi đã hoàn thành

- Contract/API hỗ trợ `q`, `priceMax`, `minRating`, `category`, `indoorOutdoor` và sort allow-list.
- Hỗ trợ bộ ba `latitude`, `longitude`, `radiusMeters` với validation đồng thời.
- Lọc bán kính bằng khoảng cách Haversine ở API.
- UI Explore có từ khóa, ngân sách, category, rating, không gian và bán kính.
- Tích hợp Geolocation để lấy vị trí hiện tại; có thông báo khi trình duyệt từ chối hoặc không hỗ trợ.
- Đồng bộ toàn bộ bộ lọc vào query string, reset pagination khi đổi bộ lọc và có thao tác xóa bộ lọc.

## Quyết định

`priceMax` so với giá khởi điểm `priceMin`. Bán kính chỉ được gửi khi đã có đủ tọa độ, tránh request contract không hợp lệ.

## Kiểm thử

- Unit test helper khoảng cách và contract query.
- `pnpm --filter @wanderly/api test`
- `pnpm --filter @wanderly/contracts test`
- `pnpm --filter @wanderly/web build`
- `pnpm typecheck`

## Trạng thái

Done — bộ lọc API và giao diện Explore đã được tích hợp đầy đủ.
