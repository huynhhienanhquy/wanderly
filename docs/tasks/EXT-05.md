# EXT-05 — Timeout, retry và circuit breaker

`ExternalCallPolicy` áp dụng timeout 8 giây, retry một lần, reset sau thành công và mở circuit 30 giây sau ba chu kỳ thất bại. OpenAI adapter dùng policy này; lỗi cuối được chuyển thành ServiceUnavailable để fallback hiện hữu tiếp quản.
