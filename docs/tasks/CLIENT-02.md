# CLIENT-02 — Typed API client

## Mục tiêu

Cung cấp HTTP client dùng chung, có xác thực, refresh token, request ID, runtime validation và error mapping.

## Thay đổi

- Thêm `WanderlyApiClient` nhận base URL, token callbacks, fetch adapter và request-ID factory.
- Gắn bearer token, JSON headers và `x-request-id` cho mỗi request.
- Khi gặp 401, refresh token và retry đúng một lần với cùng request ID.
- Parse response qua Zod-compatible schema và chuẩn hóa lỗi thành `ApiClientError`.
- Export client từ package root và thêm unit test cho refresh/error flow.

## Kiểm tra

```bash
pnpm --filter @wanderly/contracts test
pnpm --filter @wanderly/contracts typecheck
```

## Kết quả

Task hoàn tất ngày 2026-08-20. Web và Mobile có thể inject cơ chế lưu token phù hợp từng nền tảng.
