# MOB-48 — Analytics consent

Thêm helper kiểm tra consent trước analytics.

## Hoàn thành

- Settings cho phép người dùng cấp hoặc rút consent analytics bất kỳ lúc nào.
- Lựa chọn được lưu trên SecureStore hoặc localStorage tùy nền tảng.
- Telemetry sử dụng `hasAnalyticsConsent` và không thu thập khi consent chưa được cấp.
