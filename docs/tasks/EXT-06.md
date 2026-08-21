# EXT-06 — Theo dõi quota và chi phí

Đã bổ sung collector bounded theo provider: chỉ giữ aggregate calls, failures và tổng latency, không giữ payload/request. `ExternalCallPolicy` tự ghi success, failure và circuit-open. AI token/cost tiếp tục được lưu có giới hạn trong `AiInteraction` và xem tại ADMIN-06.
