# Wanderly

**Wanderly** là hệ thống đa nền tảng gồm **Web React** và **Mobile React Native**, hỗ trợ gợi ý địa điểm và tự động xây dựng lịch trình vui chơi cá nhân hóa dựa trên thời gian, ngân sách, vị trí, sở thích, giờ mở cửa và thời tiết.

Thay vì trả về một danh sách dài các địa điểm, Wanderly tạo ra một kế hoạch có thể thực hiện ngay:

```text
14:00  Cafe
          ↓ 1,3 km · 5 phút
16:00  Triển lãm
          ↓ 2,1 km · 8 phút
18:00  Đi dạo
          ↓ 900 m
19:30  Ăn tối

Tổng thời gian: 14:00–21:30
Quãng đường: khoảng 7,4 km
Chi phí: khoảng 650.000đ / 2 người
```

> Wanderly – Xây dựng hệ thống gợi ý địa điểm và lập kế hoạch vui chơi thông minh ứng dụng trí tuệ nhân tạo.

## Trạng thái dự án

Dự án đang ở giai đoạn phân tích và thiết kế. Repository hiện chứa tài liệu dự án; mã nguồn sẽ được khởi tạo theo kiến trúc và stack được chốt trong README này.

## Mục tiêu MVP

Luồng chính:

```text
Nhập yêu cầu tự nhiên
    -> Trích xuất constraint
    -> Người dùng xác nhận
    -> Tìm candidate có thật
    -> Xếp hạng địa điểm
    -> Tối ưu itinerary
    -> Kiểm tra constraint
    -> Hiển thị timeline, bản đồ và chi phí
```

MVP bao gồm:

- Đăng ký, đăng nhập và quản lý sở thích.
- Explore, tìm kiếm, lọc và xem chi tiết địa điểm.
- AI trích xuất thời gian, ngân sách, số người, sở thích và vị trí.
- Recommendation Engine xếp hạng địa điểm từ dữ liệu thật.
- Smart Itinerary theo giờ mở cửa, khoảng cách và ngân sách.
- Cảnh báo thời tiết cho hoạt động ngoài trời.
- Timeline, bản đồ, tuyến đường và budget breakdown.
- Smart Replace và tính lại phần lịch trình bị ảnh hưởng.
- Lưu, sửa, xóa và chia sẻ lịch trình.
- Admin quản lý địa điểm, danh mục, sự kiện và review.

Group Planning, voting, Surprise Me, AI Assistant và notification nâng cao thuộc phase 2.

## Công cụ và công nghệ được chọn

### Nguyên tắc lựa chọn

- TypeScript end-to-end cho Web, Mobile và Backend để giảm chi phí chuyển đổi.
- Web và Mobile dùng chung contract, API client và domain logic; không cố dùng chung UI component vì khác nền tảng.
- Modular monolith cho MVP: dễ phát triển, test và deploy hơn microservice.
- PostgreSQL làm nguồn dữ liệu chính; AI không được tự tạo địa điểm.
- External provider được bọc bằng adapter để có thể thay đổi nhà cung cấp.
- Thuật toán recommendation/planning chạy bằng code có thể kiểm thử; LLM chỉ hiểu yêu cầu và giải thích kết quả.

### Stack chính

| Thành phần         | Công nghệ                                      | Vai trò                                               |
| ------------------ | ---------------------------------------------- | ----------------------------------------------------- |
| Monorepo           | pnpm workspaces + Turborepo                    | Quản lý Web, Mobile, Backend và shared packages       |
| Web                | React + Vite + TypeScript                      | Single-page web app                                   |
| Web routing        | React Router                                   | Điều hướng phía Web                                   |
| Web UI             | Tailwind CSS + shadcn/ui                       | Design system và component accessible cho Web         |
| Mobile             | React Native + Expo + TypeScript               | Ứng dụng Android/iOS                                  |
| Mobile routing     | Expo Router                                    | Điều hướng native theo file                           |
| Mobile UI          | NativeWind + React Native primitives           | Styling và component cho Mobile                       |
| Form/validation    | React Hook Form + Zod                          | Form dùng cùng schema trên hai client                 |
| Server state       | TanStack Query                                 | Cache và đồng bộ dữ liệu API trên Web/Mobile          |
| Client state       | Zustand                                        | Trạng thái planner tạm thời có phạm vi nhỏ            |
| Web map            | Google Maps JavaScript API                     | Bản đồ, marker và route trên Web                      |
| Mobile map         | react-native-maps                              | Bản đồ native Android/iOS                             |
| Backend            | NestJS + TypeScript                            | REST API theo module                                  |
| API contract       | OpenAPI/Swagger                                | Tài liệu và kiểm thử contract                         |
| ORM                | Prisma                                         | Schema, migration và truy vấn database                |
| Database           | PostgreSQL + PostGIS                           | Dữ liệu nghiệp vụ và truy vấn địa lý                  |
| Cache/job          | Redis + BullMQ                                 | Cache provider, notification và background job        |
| Authentication     | JWT access/refresh token + Argon2id            | Xác thực và quản lý session                           |
| AI                 | OpenAI Responses API + official JavaScript SDK | Structured constraint extraction và explanation       |
| Recommendation     | TypeScript scoring engine                      | Hard filter, weighted ranking và personalization      |
| Planning           | TypeScript heuristic optimizer                 | Route, time, opening hours và budget constraints      |
| Place/route        | Google Places API + Routes API                 | Địa điểm, khoảng cách và thời gian di chuyển          |
| Weather            | OpenWeather API                                | Dự báo theo tọa độ và thời gian                       |
| Web/unit test      | Vitest + React Testing Library                 | Test Web, shared logic và recommendation              |
| Mobile test        | Jest + React Native Testing Library            | Test component và interaction native                  |
| Backend test       | Vitest/Jest-compatible runner + Supertest      | Unit và integration test NestJS API                   |
| E2E test           | Playwright                                     | Kiểm thử hành trình người dùng                        |
| Local environment  | Docker Compose                                 | PostgreSQL, Redis và ứng dụng local                   |
| CI                 | GitHub Actions                                 | Lint, typecheck, test và build                        |
| Web deployment     | Vercel                                         | Build và phát hành Web React                          |
| Mobile delivery    | Expo EAS Build/Submit                          | Build Android/iOS và phát hành store/internal testing |
| Backend deployment | Railway                                        | API, PostgreSQL và Redis                              |
| Monitoring         | Sentry + structured logs                       | Theo dõi lỗi và request quan trọng                    |

Phiên bản runtime và package phải được pin trong lockfile tại thời điểm khởi tạo. Ưu tiên Node.js bản LTS đang được các framework được chọn hỗ trợ.

## Quyết định kỹ thuật quan trọng

### 1. Modular monolith thay vì microservices

Backend được chia module rõ ràng nhưng deploy thành một ứng dụng:

```text
Auth
User / Preference
Place / Category
Favorite / Review
AI Understanding
Recommendation
Plan / Smart Replace
Maps / Weather
Event / Notification
Admin
```

Cách này phù hợp quy mô đồ án, tránh network call và distributed transaction không cần thiết. Module chỉ được tách thành service độc lập khi có bằng chứng về nhu cầu scale hoặc ownership.

### 2. OpenAI chỉ xử lý phần phù hợp với LLM

Wanderly sử dụng OpenAI Responses API và Structured Outputs để chuyển câu tự nhiên thành `PlanningConstraints`. Model mặc định đề xuất là `gpt-5.6-terra`, được cấu hình qua biến môi trường để có thể thay đổi sau khi đo chất lượng và chi phí. Tài liệu chính thức hiện mô tả model này là lựa chọn cân bằng giữa năng lực và chi phí, hỗ trợ Responses API và Structured Outputs.

LLM được dùng cho:

- Trích xuất constraint.
- Hiểu lệnh chỉnh sửa lịch trình trong phase 2.
- Tạo lời giải thích ngắn từ dữ liệu đã xác minh.

LLM không được dùng để tự quyết định:

- `place_id` hoặc thông tin địa điểm.
- Giờ mở cửa.
- Khoảng cách và route.
- Phép tính ngân sách.
- Tính hợp lệ cuối cùng của itinerary.

### 3. Recommendation và planner có thể kiểm thử

Recommendation v1 sử dụng hard filter và weighted score:

```text
score =
  preference_match * 0.30 +
  distance_score   * 0.20 +
  rating_score     * 0.15 +
  budget_score     * 0.15 +
  opening_score    * 0.10 +
  weather_score    * 0.10
```

Planner v1 dùng heuristic:

1. Lọc candidate theo constraint cứng.
2. Chia khoảng thời gian thành activity slot.
3. Chọn candidate có điểm tốt cho từng slot.
4. Sắp xếp theo khoảng cách có xét giờ mở cửa.
5. Chèn thời gian di chuyển.
6. Kiểm tra thời gian, ngân sách và thời tiết.
7. Hoán đổi candidate nếu có vi phạm.
8. Chỉ lưu plan khi tất cả constraint cứng hợp lệ.

### 4. PostgreSQL và PostGIS

PostgreSQL lưu toàn bộ dữ liệu nghiệp vụ. PostGIS hỗ trợ truy vấn bán kính và khoảng cách ban đầu; route thực tế và travel time lấy từ Maps provider.

Tiền được lưu dưới dạng số nguyên theo đơn vị đồng với VND. Thời gian dùng UTC trong database và hiển thị theo timezone của plan/user.

## Kiến trúc hệ thống

```mermaid
flowchart LR
    UW["Web user"] --> WEB["React + Vite"]
    UM["Mobile user"] --> MOBILE["React Native + Expo"]
    WEB --> API["NestJS REST API"]
    MOBILE --> API

    API --> AUTH["Auth/User"]
    API --> PLACE["Place/Explore"]
    API --> AI["AI Understanding"]
    API --> REC["Recommendation"]
    API --> PLAN["Itinerary Planner"]
    API --> ADMIN["Admin"]

    AUTH --> DB[("PostgreSQL + PostGIS")]
    PLACE --> DB
    REC --> DB
    PLAN --> DB
    ADMIN --> DB

    API --> REDIS[("Redis")]
    AI --> OPENAI["OpenAI Responses API"]
    PLACE --> GOOGLE["Google Places"]
    PLAN --> ROUTES["Google Routes"]
    PLAN --> WEATHER["OpenWeather"]
```

## Cấu trúc repository dự kiến

```text
wanderly/
├─ apps/
│  ├─ web/                    # React + Vite web app
│  ├─ mobile/                 # React Native + Expo app
│  └─ api/                    # NestJS backend
├─ packages/
│  ├─ contracts/              # Zod schemas và API types dùng chung
│  ├─ api-client/             # Typed API client dùng cho Web/Mobile
│  ├─ domain/                 # Domain helpers dùng chung, không chứa UI
│  ├─ recommendation/         # Scoring và candidate filtering
│  ├─ planner/                # Itinerary optimizer và validator
│  ├─ ui-web/                 # Web UI components
│  ├─ ui-mobile/              # Mobile UI components
│  ├─ eslint-config/
│  └─ typescript-config/
├─ prisma/
│  ├─ schema.prisma
│  ├─ migrations/
│  └─ seed.ts
├─ infra/
│  ├─ docker/
│  └─ compose.yaml
├─ docs/
├─ .github/workflows/
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
└─ README.md
```

Đây là cấu trúc mục tiêu; các thư mục sẽ được tạo khi bắt đầu phase khởi tạo mã nguồn.

## Mô hình dữ liệu chính

```mermaid
erDiagram
    USERS ||--o| USER_PROFILES : has
    USERS ||--o{ USER_PREFERENCES : selects
    CATEGORIES ||--o{ USER_PREFERENCES : describes

    PLACES ||--o{ PLACE_CATEGORIES : classified_as
    CATEGORIES ||--o{ PLACE_CATEGORIES : contains
    PLACES ||--o{ PLACE_IMAGES : has
    PLACES ||--o{ PLACE_OPENING_HOURS : opens

    USERS ||--o{ FAVORITES : saves
    PLACES ||--o{ FAVORITES : saved
    USERS ||--o{ REVIEWS : writes
    PLACES ||--o{ REVIEWS : receives

    USERS ||--o{ PLANS : owns
    PLANS ||--o{ PLAN_ITEMS : contains
    PLACES ||--o{ PLAN_ITEMS : scheduled_at
    PLANS ||--o{ PLAN_SHARES : shared_by

    USERS ||--o{ USER_FEEDBACKS : provides
    USERS ||--o{ AI_INTERACTIONS : invokes
```

Thiết kế chi tiết từng bảng nằm trong tài liệu thiết kế hệ thống.

## Biến môi trường dự kiến

Không commit giá trị thật của các biến sau:

```dotenv
# Runtime
NODE_ENV=development
WEB_URL=http://localhost:3000
API_URL=http://localhost:4000

# Database/cache
DATABASE_URL=postgresql://wanderly:wanderly@localhost:5432/wanderly?schema=public
REDIS_URL=redis://localhost:6379

# Authentication
JWT_ACCESS_SECRET=replace_me
JWT_REFRESH_SECRET=replace_me

# OpenAI
OPENAI_API_KEY=replace_me
OPENAI_MODEL=gpt-5.6-terra

# Google Maps Platform
GOOGLE_MAPS_API_KEY=replace_me
GOOGLE_PLACES_API_KEY=replace_me
GOOGLE_ROUTES_API_KEY=replace_me

# Weather
OPENWEATHER_API_KEY=replace_me

# Monitoring
SENTRY_DSN=
```

Trong triển khai thực tế, Web chỉ nhận Maps browser key đã giới hạn domain/API. Mobile dùng key riêng, giới hạn theo Android package name, iOS bundle identifier và signing certificate. Các secret khác chỉ tồn tại ở backend hoặc secret store.

## Cách chạy dự kiến

Phần này có hiệu lực sau khi source code được scaffold.

### Yêu cầu

- Node.js LTS.
- pnpm qua Corepack.
- Docker Desktop hoặc Docker Engine có Compose.

### Khởi động local

```bash
corepack enable
pnpm install
cp .env.example .env
docker compose -f infra/compose.yaml up -d
pnpm db:migrate
pnpm db:seed
pnpm dev
```

Địa chỉ dự kiến:

- Web: `http://localhost:3000`
- Mobile: Expo development server hiển thị URL/QR trong terminal
- API: `http://localhost:4000`
- Swagger: `http://localhost:4000/docs`

### Kiểm tra chất lượng

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

## Quy ước phát triển

- Nhánh tính năng: `feature/<task-id>-<short-name>`.
- Pull request phải liên kết task và mô tả acceptance criteria.
- Không merge khi lint, typecheck, test hoặc build thất bại.
- Mỗi pull request cần ít nhất một người khác review.
- Không commit `.env`, API key, access token hoặc dữ liệu cá nhân.
- Thay đổi database phải đi qua migration.
- Thay đổi API phải cập nhật OpenAPI và shared contract.
- Task chỉ hoàn thành khi có test và đã kiểm tra trên staging.

## Tiêu chí thành công của MVP

- Constraint extraction đạt tối thiểu 90% trên evaluation set.
- 100% plan trong test set không vi phạm giờ mở cửa và thời gian.
- Không có địa điểm do LLM tự bịa; mọi `place_id` tồn tại trong database/provider.
- Nếu tồn tại phương án trong ngân sách, planner tìm được phương án phù hợp trong ít nhất 95% test case.
- Thời gian tạo plan P95 mục tiêu dưới 10 giây.
- Ba hành trình Couple, cá nhân và gia đình vượt qua E2E test.

## Roadmap

| Giai đoạn             | Tuần | Kết quả                                  |
| --------------------- | ---: | ---------------------------------------- |
| Phân tích và thiết kế |    1 | Scope, wireframe, ERD, API contract      |
| Nền tảng              |  2–3 | Auth, Place, Explore, CI và Docker       |
| Planner v1            |  4–5 | Constraint extraction và plan end-to-end |
| Trải nghiệm plan      |  6–7 | Timeline, map, budget và weather         |
| Hoàn thiện MVP        |  8–9 | Smart Replace, admin và staging          |
| Chất lượng            |   10 | Feature freeze, security và performance  |
| Báo cáo               |   11 | Báo cáo, slide và video                  |
| Bàn giao              |   12 | Release và rehearsal                     |

## Tài liệu dự án

- [Theo dõi trạng thái task](./docs/TASK_STATUS.md)
- [Hướng dẫn đóng góp](./CONTRIBUTING.md)
- [Kế hoạch triển khai](./WANDERLY_PROJECT_PLAN.md)
- [Backlog theo nhóm chức năng](./WANDERLY_FUNCTIONAL_TASKS.md)
- [Phân tích, thiết kế hệ thống và database](./WANDERLY_SYSTEM_ANALYSIS_AND_DATABASE_DESIGN.md)

## Bước tiếp theo

1. Review và chốt stack với toàn nhóm.
2. Tạo wireframe cho ba hành trình demo.
3. Scaffold monorepo, Web React, Mobile React Native, Backend và shared packages.
4. Tạo Prisma schema/migration đầu tiên từ tài liệu database.
5. Seed dữ liệu địa điểm đủ cho kịch bản demo.
6. Hoàn thành vertical slice đầu tiên: Explore -> Place Detail.
7. Hoàn thành vertical slice thứ hai: prompt -> constraint -> itinerary -> timeline.

## Giấy phép

Chưa xác định. Nếu repository được công khai, nhóm cần chọn license trước khi nhận đóng góp bên ngoài.
