# OPS-01 — Docker Compose local

`docker compose -f infra/compose.yaml up --build` khởi chạy PostgreSQL/PostGIS, Redis, API (migration trước start) và Web/Nginx SPA. API chờ database/cache healthy; dữ liệu database/cache dùng named volume.
