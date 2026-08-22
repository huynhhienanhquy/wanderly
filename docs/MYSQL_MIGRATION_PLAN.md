# Kế hoạch chuyển Wanderly từ PostgreSQL sang MySQL

## 1. Mục tiêu

Chuyển database chính của Wanderly từ PostgreSQL/PostGIS sang MySQL, đồng thời bảo đảm Prisma, Backend API, Web, Mobile, seed data, migration và toàn bộ test vẫn hoạt động chính xác.

Branch triển khai dự kiến:

```text
feature/DB-01-migrate-postgresql-to-mysql
```

## 2. Phạm vi ảnh hưởng

- Prisma datasource và native database types.
- Toàn bộ migration hiện tại dành cho PostgreSQL.
- Cấu hình `.env` và `.env.example`.
- Docker Compose hoặc kết nối MySQL/MariaDB trong XAMPP.
- Seed data và script kiểm tra database.
- Backend API sử dụng Prisma Client.
- Tài liệu cài đặt và chạy local.
- Test database, API, Web và Mobile.

## 3. Giai đoạn 1 — Chuẩn bị môi trường

| ID | Task | Đầu ra |
| --- | --- | --- |
| MYSQL-01 | Chọn MySQL runtime | Chốt MySQL 8.x hoặc MariaDB của XAMPP |
| MYSQL-02 | Sao lưu PostgreSQL | Backup dữ liệu hiện có trước khi chuyển |
| MYSQL-03 | Tạo database MySQL | Database `wanderly` dùng charset `utf8mb4` |
| MYSQL-04 | Tạo tài khoản database | User riêng cho ứng dụng, không dùng `root` ngoài local |

Khuyến nghị dùng MySQL 8.x. Nếu sử dụng XAMPP, database thực tế thường là MariaDB và cần chạy thêm kiểm tra tương thích Prisma.

```sql
CREATE DATABASE wanderly
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER 'wanderly'@'localhost' IDENTIFIED BY 'wanderly_password';
GRANT ALL PRIVILEGES ON wanderly.* TO 'wanderly'@'localhost';
FLUSH PRIVILEGES;
```

## 4. Giai đoạn 2 — Chuyển Prisma schema

| ID | Task | Thay đổi |
| --- | --- | --- |
| MYSQL-05 | Đổi Prisma provider | `postgresql` thành `mysql` |
| MYSQL-06 | Chuyển UUID | `@db.Uuid` thành `@db.Char(36)` |
| MYSQL-07 | Chuyển timestamp | `@db.Timestamptz(6)` thành `@db.DateTime(6)` |
| MYSQL-08 | Rà soát kiểu dữ liệu | Kiểm tra `BigInt`, `Decimal`, `Json`, `Text`, `Time`, `Date` |
| MYSQL-09 | Rà soát index | Kiểm tra index giảm dần, composite index và độ dài index |
| MYSQL-10 | Xử lý dữ liệu địa lý | Thay phần phụ thuộc PostGIS bằng tọa độ hoặc MySQL Spatial |

Datasource mới:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

Ví dụ chuyển native types:

```prisma
// PostgreSQL
id        String   @id @default(uuid()) @db.Uuid
createdAt DateTime @default(now()) @db.Timestamptz(6)

// MySQL
id        String   @id @default(uuid()) @db.Char(36)
createdAt DateTime @default(now()) @db.DateTime(6)
```

Trong giai đoạn đầu, Wanderly có thể tiếp tục lưu `latitude` và `longitude` bằng `Decimal` và tính khoảng cách tại tầng ứng dụng. Chỉ thêm MySQL Spatial khi thực sự cần truy vấn địa lý ở database.

## 5. Giai đoạn 3 — Tạo migration MySQL

| ID | Task | Đầu ra |
| --- | --- | --- |
| MYSQL-11 | Lưu migration PostgreSQL cũ | Archive hoặc lưu bằng Git tag |
| MYSQL-12 | Tạo migration baseline MySQL | Migration tạo toàn bộ schema trên MySQL trống |
| MYSQL-13 | Kiểm tra foreign key | `Cascade`, `Restrict` và `SetNull` hoạt động đúng |
| MYSQL-14 | Kiểm tra enum/default | Enum và giá trị mặc định tạo đúng trên MySQL |

Không chạy các migration PostgreSQL cũ trên MySQL vì chúng chứa cú pháp đặc thù:

- `CREATE EXTENSION postgis`.
- Native type `UUID`.
- `TIMESTAMPTZ`.
- `gen_random_uuid()`.

Tạo migration mới:

```powershell
pnpm db:generate
pnpm exec prisma migrate dev --name mysql_initial --schema prisma/schema.prisma
```

## 6. Giai đoạn 4 — Cấu hình môi trường

| ID | Task | Đầu ra |
| --- | --- | --- |
| MYSQL-15 | Đổi `DATABASE_URL` | Connection string MySQL |
| MYSQL-16 | Cập nhật `.env.example` | Mẫu cấu hình không chứa mật khẩu thật |
| MYSQL-17 | Cập nhật Docker Compose | MySQL thay PostgreSQL/PostGIS |
| MYSQL-18 | Hỗ trợ XAMPP | Hướng dẫn kết nối MariaDB qua port `3306` |

Connection string đề xuất:

```dotenv
DATABASE_URL=mysql://wanderly:wanderly_password@localhost:3306/wanderly
```

Nếu chỉ chạy local bằng XAMPP và tài khoản `root` không có mật khẩu:

```dotenv
DATABASE_URL=mysql://root:@localhost:3306/wanderly
```

Không sử dụng cấu hình `root` không mật khẩu ở staging hoặc production.

Docker service dự kiến:

```yaml
mysql:
  image: mysql:8.4
  environment:
    MYSQL_DATABASE: wanderly
    MYSQL_USER: wanderly
    MYSQL_PASSWORD: wanderly_password
    MYSQL_ROOT_PASSWORD: root_password
  ports:
    - "3306:3306"
  volumes:
    - wanderly_mysql_data:/var/lib/mysql
```

Redis vẫn được giữ nguyên.

## 7. Giai đoạn 5 — Seed và chuyển dữ liệu

| ID | Task | Đầu ra |
| --- | --- | --- |
| MYSQL-19 | Sửa seed nếu cần | Seed tương thích MySQL |
| MYSQL-20 | Seed dữ liệu demo | Category, place và dữ liệu mẫu |
| MYSQL-21 | Viết script chuyển dữ liệu | Chỉ cần nếu phải giữ dữ liệu PostgreSQL cũ |
| MYSQL-22 | Đối chiếu dữ liệu | Số lượng và quan hệ bản ghi nguồn/đích khớp nhau |

Nếu database hiện tại chưa có dữ liệu quan trọng, ưu tiên tạo database MySQL mới và chạy seed:

```powershell
pnpm db:seed
```

## 8. Giai đoạn 6 — Kiểm tra Backend

| ID | Task | Nội dung kiểm tra |
| --- | --- | --- |
| MYSQL-23 | Auth | Register, login, refresh và logout |
| MYSQL-24 | Places | List, filter, detail và seed |
| MYSQL-25 | Favorites/Reviews | Foreign key và unique constraint |
| MYSQL-26 | Plans | CRUD, plan items và share |
| MYSQL-27 | Admin | Dashboard và audit log |
| MYSQL-28 | Transaction/concurrency | Unique constraint và rollback |

Cần kiểm tra việc chuyển đổi `BigInt` trước khi trả JSON từ API.

## 9. Giai đoạn 7 — Kiểm thử toàn project

Chạy tuần tự:

```powershell
pnpm db:generate
pnpm db:validate
pnpm db:typecheck
pnpm db:seed:test
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm --filter @wanderly/web test:e2e
```

Bổ sung integration test dùng MySQL thật cho:

- Đăng ký và đăng nhập.
- Tạo favorite không trùng.
- Tạo review không trùng theo user/place.
- Tạo plan và plan items.
- `Cascade`, `Restrict` và `SetNull`.
- Filter địa điểm theo tọa độ.

## 10. Giai đoạn 8 — Tài liệu và tích hợp

| ID | Task | Đầu ra |
| --- | --- | --- |
| MYSQL-29 | Cập nhật README | Hướng dẫn MySQL/XAMPP |
| MYSQL-30 | Cập nhật tài liệu hệ thống | Kiến trúc và thiết kế database mới |
| MYSQL-31 | Cập nhật `TASK_STATUS.md` | Trạng thái và kết quả kiểm tra |
| MYSQL-32 | Commit và push | Branch migration hoàn chỉnh |
| MYSQL-33 | Merge vào `main` | Chỉ merge khi toàn bộ kiểm tra đạt |

## 11. Definition of Done

Migration sang MySQL chỉ được coi là hoàn thành khi:

- Prisma schema không còn native type PostgreSQL.
- Migration MySQL chạy được trên database trống.
- Seed chạy thành công và không tạo dữ liệu trùng khi chạy lại.
- API kết nối MySQL thành công.
- Web và Mobile sử dụng API bình thường.
- Toàn bộ test, typecheck, lint và build đạt.
- Runtime không còn phụ thuộc PostgreSQL/PostGIS.
- README có hướng dẫn chạy bằng MySQL hoặc XAMPP.
- Có phương án backup và khôi phục dữ liệu cũ.

## 12. Rủi ro và lưu ý

- Migration PostgreSQL hiện tại không tương thích MySQL.
- Dữ liệu PostgreSQL không tự động chuyển sang MySQL.
- XAMPP thường cung cấp MariaDB, không hoàn toàn giống MySQL 8.x.
- MySQL không thay thế trực tiếp toàn bộ khả năng địa lý của PostGIS.
- Việc thay database phải được thực hiện trên branch riêng và kiểm tra toàn workspace trước khi merge.
