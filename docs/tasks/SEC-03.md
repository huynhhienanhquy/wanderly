# SEC-03 — Kiểm tra secret và dependency

CI quét mẫu OpenAI/Google/private-key trên toàn bộ file Git theo dõi, chạy `pnpm audit --audit-level high`, và Dependabot kiểm tra npm hàng tuần/GitHub Actions hàng tháng. Scanner bỏ lockfile, giới hạn file 1 MB và không in nội dung secret.
