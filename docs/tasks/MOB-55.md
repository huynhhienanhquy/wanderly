# MOB-55 — Accessibility smoke tests

Thêm test React Native kiểm tra element có role/name để tránh regression screen reader.

## Hoàn thành

- Test render màn hình Settings thật trong `AppThemeProvider`.
- Kiểm tra header, tên switch, trạng thái checked và tương tác đổi theme.
- Kiểm tra offline notice thật được công bố với role `alert`.
