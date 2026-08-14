# PLAN-06 — Điều chỉnh theo thời tiết

## Mục tiêu

Đưa điều kiện thời tiết của ngày và khu vực lịch trình vào quá trình kiểm tra kế hoạch.

## Phạm vi đã hoàn thành

- Lấy dự báo theo ngày và tọa độ trung tâm các địa điểm từ Open-Meteo.
- Chuẩn hóa mã thời tiết, xác suất mưa và nhiệt độ tối đa thành `CLEAR`, `RAIN` hoặc `HEAT`.
- Ưu tiên cảnh báo mưa khi vừa nóng vừa có mưa.
- Cảnh báo hoạt động ngoài trời khi mưa hoặc nắng nóng.
- Hiển thị nhiệt độ, xác suất mưa và trạng thái tải/lỗi.
- Giữ lựa chọn thủ công làm fallback khi provider không khả dụng hoặc ngày nằm ngoài phạm vi dự báo.

## Quyết định

Open-Meteo được dùng cho MVP vì endpoint forecast không yêu cầu API key. Dự báo chỉ được tải khi người dùng yêu cầu để tránh ghi đè lựa chọn thủ công và hạn chế request không cần thiết.

## Kiểm thử

- Unit test phân loại thời tiết, chuẩn hóa response và dữ liệu provider không đầy đủ.
- `pnpm --filter @wanderly/web test`
- `pnpm --filter @wanderly/web build`
- `pnpm typecheck`

## Trạng thái

Done — Planner có dự báo tự động, cảnh báo theo điều kiện và fallback thủ công.
