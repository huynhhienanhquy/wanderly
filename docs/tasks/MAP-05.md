# MAP-05 — Cache kết quả tuyến đường

## Trạng thái

Done — 2026-08-19.

## Kết quả

- Cache travel estimate theo mode và tọa độ làm tròn 5 chữ số.
- TTL mặc định 15 phút; tối đa 500 entry và loại entry cũ nhất theo LRU.
- Cache cả provider result và fallback để tránh lặp lỗi/quota trong thời gian ngắn.
- Entry hết hạn được xóa khi đọc, bộ nhớ luôn bị chặn trên.

## Kiểm thử

- Unit test key, cache hit, TTL expiry và bounded eviction.
