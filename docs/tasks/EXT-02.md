# EXT-02 — Chọn Weather provider

## Trạng thái

Done — 2026-08-19.

## Quyết định

- Open-Meteo Forecast API là provider chính cho MVP: không cần API key và hỗ trợ daily forecast theo tọa độ.
- Chỉ yêu cầu weather code, nhiệt độ tối đa và xác suất mưa để giảm payload.
- Timezone dùng `auto`; mỗi request chỉ lấy đúng một ngày kế hoạch.
- UI giữ lựa chọn thủ công làm fallback khi provider không khả dụng.

## Kiểm thử

- Shared contract kiểm tra tọa độ/ngày/response và test URL một ngày.
