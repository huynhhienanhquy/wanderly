# PREF-03 — API cập nhật sở thích

## Trạng thái

Done — 2026-08-18.

## Kết quả

- Thêm `GET /preferences` và `PUT /preferences`, bảo vệ bằng JWT và lấy user từ token.
- Contract yêu cầu 3–20 UUID category duy nhất.
- API xác nhận mọi category đang hoạt động rồi thay toàn bộ preference trong một transaction.
- Preference explicit có trọng số ban đầu `1` và source `EXPLICIT`.
- Onboarding Web lưu trực tiếp vào database thay vì session tạm.

## Kiểm thử

- Unit test transaction/service và Web API client.
- API, Web, Web build và typecheck workspace đạt.
