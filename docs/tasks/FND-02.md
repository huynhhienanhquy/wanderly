# FND-02 — Thiết kế kiến trúc hệ thống

## Trạng thái

Hoàn thành ngày 2026-08-10.

## Mục tiêu

Chọn kiến trúc đủ đơn giản cho MVP nhưng có ranh giới module và khả năng mở rộng rõ ràng.

## Đầu ra

- Kiến trúc modular monolith cho Backend.
- Hai client: Web React và Mobile React Native.
- Các package dùng chung cho contract, API client và domain logic.
- Sơ đồ component, luồng tạo itinerary và Smart Replace.
- Adapter boundary cho OpenAI, Maps/Places/Routes và Weather.

## Quyết định

- Monorepo dùng pnpm workspaces và Turborepo.
- Web dùng React + Vite; Mobile dùng React Native + Expo; Backend dùng NestJS.
- Không dùng chung UI component giữa Web và Mobile.
- PostgreSQL là nguồn dữ liệu chính; Redis chỉ phục vụ cache/job.
- Recommendation và planning là code có thể kiểm thử, không giao cho LLM.

## Kiểm tra

- Mọi client chỉ truy cập dữ liệu nghiệp vụ qua Backend API.
- External provider được đặt sau adapter.
- Kiến trúc có đường triển khai local, staging và production.

## Tài liệu liên quan

- `README.md`
- `WANDERLY_SYSTEM_ANALYSIS_AND_DATABASE_DESIGN.md`
