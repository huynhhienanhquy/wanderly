# MOB-20 — Mobile telemetry queue

Thêm telemetry cục bộ có giới hạn 50 event, dùng SecureStore/localStorage, ghi nhận các mốc phân tích constraint và tạo kế hoạch. Thiết kế không làm hỏng UX nếu event lỗi; kiểm tra bằng `pnpm --filter @wanderly/mobile typecheck`.
