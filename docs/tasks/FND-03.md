# FND-03 — Thiết kế ERD

## Trạng thái

Hoàn thành ngày 2026-08-10.

## Mục tiêu

Thiết kế dữ liệu quan hệ cho toàn bộ MVP và chừa điểm mở rộng có kiểm soát cho phase 2.

## Đầu ra

- ERD tổng thể.
- Chi tiết bảng, kiểu dữ liệu, khóa chính/ngoại và business constraints.
- Quy ước UUID, UTC, số tiền nguyên và dữ liệu địa lý.
- Đề xuất index và thứ tự migration.

## Nhóm bảng chính

- Identity: `users`, `user_profiles`, `user_sessions`.
- Preference: `categories`, `user_preferences`.
- Place: `places`, `place_categories`, `place_images`, `place_opening_hours`.
- Interaction: `favorites`, `reviews`, `user_feedbacks`.
- Planning: `plans`, `plan_items`, `plan_shares`.
- AI/operations: `ai_interactions`, `events`, `notifications`, `admin_audit_logs`.
- Phase 2: `plan_members`, `plan_options`, `plan_votes`.

## Quyết định

- PostgreSQL và PostGIS.
- UUID làm khóa chính; `timestamptz` lưu UTC.
- Tiền lưu bằng `bigint`, không dùng floating point.
- `plans.constraints` lưu snapshot JSON đã xác nhận; các trường cần query được tách thành cột.
- `plan_items` là structured data, không lưu toàn bộ itinerary dưới dạng văn bản AI.

## Kiểm tra

- Mọi quan hệ trong ERD có cardinality rõ ràng.
- Business rules về thời gian, ngân sách, ownership và uniqueness đã được ghi nhận.
- Thứ tự migration không tạo vòng phụ thuộc.

## Tài liệu liên quan

- `WANDERLY_SYSTEM_ANALYSIS_AND_DATABASE_DESIGN.md`
