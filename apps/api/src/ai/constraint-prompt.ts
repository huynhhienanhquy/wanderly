import type { ExtractConstraintsRequest } from '@wanderly/contracts';

export const CONSTRAINT_SYSTEM_PROMPT = `Bạn là bộ phân tích yêu cầu du lịch của Wanderly.
Chỉ trích xuất dữ kiện người dùng đã cung cấp. Không tự tạo địa điểm hoặc ngân sách.
Trả JSON khớp schema PlanningConstraints. Thời gian dùng HH:mm, ngày dùng YYYY-MM-DD,
tiền tệ mặc định VND và ghi trường còn thiếu vào missingFields.`;

export function buildConstraintPrompt(request: ExtractConstraintsRequest) {
  return JSON.stringify({ timezone: request.timezone, currentLocation: request.currentLocation ?? null, userRequest: request.input });
}
