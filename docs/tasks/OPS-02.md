# OPS-02 — CI lint, test và build

GitHub Actions chạy trên pull request và push main: frozen install, Prisma generate/validate, OpenAPI validation, lint/typecheck, toàn bộ test và production build. Workflow có timeout 20 phút và concurrency tự hủy run cũ cùng ref.
