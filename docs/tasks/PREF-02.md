# PREF-02 — Onboarding chọn sở thích

## Trạng thái

Done — 2026-08-18.

## Kết quả

- Sau đăng ký, Web chuyển người dùng tới `/onboarding/preferences`.
- Trang lấy catalog động từ API, yêu cầu ít nhất 3 lựa chọn duy nhất và có trạng thái lỗi/thành công.
- Route yêu cầu access token; người chưa đăng nhập được chuyển tới `/login`.
- Form dùng preference API client chung; PREF-03 đã nối thao tác lưu vào database.

## Kiểm thử

- Unit test cho quy tắc tối thiểu 3 sở thích và parsing catalog.
- Web test/build và typecheck workspace đạt.
