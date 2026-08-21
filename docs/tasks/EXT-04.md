# EXT-04 — Xây dựng adapter cho provider

Đã chuẩn hóa `ExternalProviderAdapter<Input, Output>` với định danh `name` và hàm `execute`. OpenAI Constraints và Google Places implement boundary này; business service tiếp tục nhận provider qua DI token nên có thể thay implementation mà không đổi workflow.
