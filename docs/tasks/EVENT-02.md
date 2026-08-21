# EVENT-02 — Đưa sự kiện vào recommendation

Endpoint `POST /events/recommendations` nhận `PlanningConstraints`, chỉ chọn event published giao với ngày kế hoạch, không vượt budget và khớp category quan tâm của địa điểm liên kết. Kết quả được giới hạn 20 và sắp theo thời gian bắt đầu.
