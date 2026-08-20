# CLIENT-05 — Deep-link contract

## Mục tiêu

Định nghĩa một contract liên kết Place và shared Plan dùng được trên Web lẫn Mobile.

## Thay đổi

- Thêm discriminated union `WanderlyDeepLink` cho place và shared plan.
- Sinh Web path, absolute Web URL và custom-scheme `wanderly://` URL.
- Parse cả HTTPS URL và app URL về cùng một domain object.
- Encode/decode segment an toàn và từ chối route ngoài contract.

## Route contract

- Place: `/places/:slug` và `wanderly://places/:slug`.
- Shared plan: `/plans/shared/:shareToken` và `wanderly://plans/shared/:shareToken`.

## Kiểm tra

```bash
pnpm --filter @wanderly/contracts test
pnpm --filter @wanderly/contracts typecheck
```

## Kết quả

Task hoàn tất ngày 2026-08-20.
