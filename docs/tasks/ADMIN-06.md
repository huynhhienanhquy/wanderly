# ADMIN-06 — Theo dõi AI usage

Endpoint ADMIN `GET /admin/ai-usage?days=30` tổng hợp theo provider/model: request, failure, latency trung bình, input/output token và chi phí USD ước tính. Khoảng thời gian bị chặn 1–90 ngày, query giới hạn 10.000 interaction và model chưa có bảng giá trả cost 0 thay vì đoán.
