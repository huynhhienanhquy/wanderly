# FND-05 — Khởi tạo Web, Mobile và Backend

## Trạng thái

Hoàn thành ngày 2026-08-10.

## Mục tiêu

Tạo monorepo có Web React, Mobile React Native, NestJS Backend và shared contracts; tất cả package phải cài đặt, typecheck và build được cùng nhau.

## Thay đổi

- Tạo pnpm workspace và Turborepo pipeline.
- Tạo `apps/web` bằng React, Vite, React Router và TypeScript.
- Tạo `apps/mobile` bằng React Native, Expo và Expo Router.
- Tạo `apps/api` bằng NestJS với endpoint `GET /health`.
- Tạo `packages/contracts` bằng Zod và TypeScript.
- Thêm cấu hình TypeScript strict, Prettier, `.gitignore` và `.env.example`.
- Pin dependency trong `pnpm-lock.yaml`.
- Chỉ cho phép build script của NestJS, esbuild và `unrs-resolver`.

## Quyết định

- Web và Mobile import cùng contract source trong quá trình typecheck.
- Package contracts build thành ESM với declaration files.
- Mobile dùng Expo Web export làm build smoke test tại giai đoạn scaffold; native EAS build thuộc `MOB-15`.
- Expo telemetry bị tắt trong build tự động để không ghi dữ liệu ngoài workspace.

## Kiểm tra

Các lệnh đã chạy thành công:

```text
pnpm peers check
pnpm typecheck
pnpm test
pnpm build
pnpm format:check
```

Kết quả:

- Không có peer dependency issue.
- Typecheck pass cho `@wanderly/contracts`, `@wanderly/web`, `@wanderly/mobile`, `@wanderly/api`.
- Test runner pass cho cả bốn package; chưa có test case nghiệp vụ ở task scaffold.
- Vite Web build, NestJS build, contracts build và Expo Web export thành công.
- Toàn bộ file thuộc phạm vi dự án đạt Prettier check.

## Tệp chính

- `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`.
- `apps/web/`.
- `apps/mobile/`.
- `apps/api/`.
- `packages/contracts/`.
- `.env.example`.

## Task tiếp theo

`FND-06` — Cấu hình PostgreSQL/PostGIS, Prisma schema, migration và seed.
