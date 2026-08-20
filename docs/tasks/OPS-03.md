# OPS-03 — Quản lý environment và secret

API validate port/CORS URL khi startup; production bắt buộc DATABASE_URL và hai JWT secret độc lập tối thiểu 32 ký tự, từ chối placeholder. `.env.example` chỉ chứa tên biến/mẫu, `.gitignore` chặn mọi `.env*` khác. Secret thật phải được inject từ secret store của môi trường deploy.
