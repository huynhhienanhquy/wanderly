# Kế hoạch triển khai đề tài Wanderly

## 1. Mục tiêu

Xây dựng hệ thống đa nền tảng gồm Web React và Mobile React Native, giúp người dùng mô tả nhu cầu bằng ngôn ngữ tự nhiên, sau đó tạo một lịch trình vui chơi có thể thực hiện được dựa trên thời gian, ngân sách, vị trí, sở thích, giờ mở cửa và thời tiết.

Tên đề tài đề xuất:

**Wanderly – Xây dựng hệ thống gợi ý địa điểm và lập kế hoạch vui chơi thông minh ứng dụng trí tuệ nhân tạo**

Giả định kế hoạch: nhóm 4 thành viên, thời gian 12 tuần. Có thể điều chỉnh số người và deadline mà không thay đổi cấu trúc backlog.

## 2. Phạm vi MVP

### Bắt buộc

1. Đăng ký, đăng nhập và hồ sơ sở thích.
2. Explore: danh sách, tìm kiếm, lọc và xem chi tiết địa điểm.
3. Nhập yêu cầu bằng ngôn ngữ tự nhiên và xác nhận các ràng buộc đã trích xuất.
4. Recommendation Engine xếp hạng địa điểm từ dữ liệu thật trong hệ thống; LLM không tự tạo địa điểm.
5. Tạo itinerary có cấu trúc, thỏa thời gian, ngân sách, giờ mở cửa và khoảng cách.
6. Hiển thị timeline, bản đồ, chi phí và tổng quãng đường.
7. Thay thế một địa điểm và tự tính lại lịch trình.
8. Lưu, sửa, xóa và chia sẻ lịch trình.
9. Tích hợp thời tiết ở mức cảnh báo và ưu tiên hoạt động trong/ngoài trời.
10. Admin CRUD địa điểm, danh mục và sự kiện.

### Sau MVP

- Group Planning và vote.
- Surprise Me.
- Chat chỉnh sửa lịch trình bằng hội thoại.
- Học sở thích từ lịch sử và feedback nâng cao.
- Notification thời gian thực.
- Dashboard phân tích nâng cao và các chức năng native nâng cao như background location.

## 3. Kiến trúc đề xuất

- Web: React, Vite, TypeScript, Tailwind CSS, shadcn/ui và Google Maps JavaScript API.
- Mobile: React Native, Expo, TypeScript, Expo Router, NativeWind và react-native-maps.
- Shared client packages: Zod contracts, typed API client, domain helpers, TanStack Query và Zustand.
- Backend: NestJS hoặc Spring Boot; REST API; OpenAPI/Swagger.
- Database: PostgreSQL; PostGIS nếu cần truy vấn địa lý nâng cao.
- Cache/job: Redis chỉ bổ sung khi luồng chính đã ổn định.
- AI: LLM trả về JSON có schema để trích xuất yêu cầu và giải thích kết quả.
- Recommendation: scoring có trọng số, chạy bằng code và có thể kiểm thử.
- Planning: thuật toán heuristic có ràng buộc; không giao toàn bộ việc lập lịch cho LLM.
- External services: Places/Maps, Directions và Weather API.

Luồng chính:

`Yêu cầu tự nhiên -> Trích xuất constraint -> Tìm candidate -> Xếp hạng -> Tối ưu itinerary -> Kiểm tra ràng buộc -> Hiển thị plan`

## 4. Phân công nhân sự

### Thành viên A – Backend lead và dữ liệu

- Thiết kế database, migration và seed data.
- Auth, user, preference, place, category, favorite và review API.
- Admin CRUD và phân quyền.
- Chuẩn hóa dữ liệu địa điểm, giờ mở cửa, mức giá và tọa độ.
- Viết API contract và integration test cho các module phụ trách.

### Thành viên B – AI, recommendation và optimization

- Thiết kế JSON schema cho việc trích xuất intent/constraint.
- Tích hợp LLM, validation, retry và chống hallucination.
- Xây dựng candidate filtering và công thức recommendation score.
- Xây dựng itinerary planner theo thời gian, khoảng cách, ngân sách và giờ mở cửa.
- Smart Replace và tính lại phần lịch trình bị ảnh hưởng.
- Viết bộ test scenario và đo chất lượng recommendation/planning.

### Thành viên C – Web React

- Web design system, responsive layout và React Router.
- Trang chủ/AI Planner và màn hình xác nhận constraint.
- Explore, Place Detail, Favorites và Profile/Preferences.
- Timeline itinerary, budget breakdown và trạng thái loading/error/empty.
- Luồng lưu, sửa, chia sẻ và Smart Replace.
- Web component test và end-to-end test cho happy path.

### Thành viên D – Mobile React Native, tích hợp và DevOps

- Xây dựng ứng dụng Expo, Expo Router và mobile design system.
- Triển khai các màn hình Auth, Explore, Planner, Timeline và Profile trên Mobile.
- Tích hợp react-native-maps, vị trí thiết bị và deep link chia sẻ plan.
- Tích hợp Maps/Places, route/distance và Weather API dùng chung qua Backend.
- Docker Compose, biến môi trường, CI/CD và môi trường staging.
- Observability cơ bản: log, error tracking, health check.
- Mobile test, EAS Build và bản cài Android/iOS cho demo.
- Cùng cả nhóm thực hiện test plan, security/performance smoke test và release.

### Trách nhiệm chung

- A và B thống nhất data contract của Place, Constraint, Plan và PlanItem ngay tuần 2.
- B, C và D thống nhất response mẫu trước khi Web/Mobile tích hợp AI.
- C và D thống nhất shared contract/API client, hành vi bản đồ và trải nghiệm tương đương giữa Web/Mobile.
- Mỗi pull request cần ít nhất một người khác review; task chỉ hoàn thành khi có test và tài liệu API liên quan.

## 5. Roadmap 12 tuần

| Giai đoạn        | Tuần | Kết quả cần đạt                                 | A                     | B                             | C                                | D                                         |
| ---------------- | ---: | ----------------------------------------------- | --------------------- | ----------------------------- | -------------------------------- | ----------------------------------------- |
| Khởi động        |    1 | Scope, user flow, wireframe, kiến trúc, backlog | ERD nháp              | Spike AI/planner              | Wireframe                        | Repo, CI nháp                             |
| Nền tảng         |  2–3 | Auth và Explore chạy với dữ liệu seed           | Auth, Place API       | Schema constraint, scoring v1 | Web Layout, Auth, Explore        | Mobile shell, Auth, Explore, Docker       |
| Planner v1       |  4–5 | Tạo được plan end-to-end                        | Plan API, persistence | Extractor + planner v1        | Web Planner + constraint confirm | Mobile Planner + distance/weather adapter |
| Trải nghiệm plan |  6–7 | Timeline, map, budget và validation             | Favorite/review/share | Scoring v2, constraint checks | Web Timeline/Place Detail        | Mobile Timeline/Map, integration tests    |
| Hoàn thiện MVP   |  8–9 | Replace, admin và xử lý lỗi                     | Admin API, RBAC       | Smart Replace                 | Replace + admin UI               | Staging, E2E, monitoring                  |
| Chất lượng       |   10 | Feature freeze; sửa lỗi và tối ưu               | API/security fixes    | Evaluation/tuning             | Responsive/accessibility         | Load/security testing                     |
| Báo cáo          |   11 | Báo cáo, số liệu đánh giá, video nháp           | DB/API chương         | AI/algorithm chương           | UI/UX chương                     | Test/deployment chương                    |
| Bàn giao         |   12 | Demo ổn định và release                         | Seed/demo support     | Fallback demo                 | Demo flow                        | Deploy, rehearsal, backup                 |

## 6. Backlog và dependency

### Epic 1 – Foundation

- F01: Chốt user stories và acceptance criteria — chung — tuần 1.
- F02: Wireframe các luồng chính — C — phụ thuộc F01.
- F03: ERD và API contract — A — phụ thuộc F01.
- F04: Repo, CI, Docker Compose, convention — D — tuần 1.
- F05: Spike Places/Maps/Weather và kiểm tra quota — D — tuần 1.
- F06: Spike LLM structured output — B — tuần 1.

### Epic 2 – Account và địa điểm

- U01: Auth và RBAC — A.
- U02: Profile và preferences — A + C — phụ thuộc U01.
- P01: Category/Place schema, migration, seed — A — phụ thuộc F03.
- P02: Search/filter/pagination API — A — phụ thuộc P01.
- P03: Explore UI — C — phụ thuộc API contract; có thể phát triển với mock.
- P04: Place Detail, favorite và review — A + C — phụ thuộc P01, U01.
- P05: Admin CRUD — A + D — phụ thuộc U01, P01.

### Epic 3 – AI Planner

- AI01: Constraint JSON schema — B — phụ thuộc F03.
- AI02: Natural-language extractor — B — phụ thuộc AI01.
- AI03: Màn hình xác nhận/chỉnh constraint — C — phụ thuộc AI01.
- R01: Candidate hard filters — B — phụ thuộc P01.
- R02: Weighted recommendation scoring — B — phụ thuộc R01.
- M01: Distance/travel-time adapter — D — phụ thuộc F05.
- W01: Weather adapter và cache — D — phụ thuộc F05.
- PL01: Planner v1 — B — phụ thuộc R02, M01.
- PL02: Kiểm tra giờ mở cửa, budget, weather — B — phụ thuộc PL01, W01.
- PL03: Plan/PlanItem persistence API — A — phụ thuộc F03.

### Epic 4 – Trải nghiệm lịch trình

- I01: Timeline và budget breakdown — C — phụ thuộc response contract PL01.
- I02: Bản đồ và route — C + D — phụ thuộc M01.
- I03: Save/edit/delete/share plan — A + C — phụ thuộc PL03.
- I04: Smart Replace — B + C — phụ thuộc R02, PL02.
- I05: Trạng thái lỗi/fallback khi external API hoặc LLM lỗi — B + C + D.

### Epic 5 – QA, release và báo cáo

- Q01: Unit test scoring/planner — B.
- Q02: Integration test API/database — A.
- Q03: E2E ba hành trình chính — C + D.
- Q04: Security, rate limit, validation và secret audit — A + D.
- Q05: Evaluation dataset tối thiểu 30–50 tình huống — B + D.
- Q06: Deploy staging/production, backup demo data — D.
- Q07: Báo cáo, slide, video và kịch bản demo — cả nhóm.

## 7. Ba hành trình bắt buộc để demo

1. Couple: 2 người, 14:00–21:00, 700.000đ, cafe/chụp ảnh/ăn tối.
2. Cá nhân: 1 người, 4 giờ, ngân sách thấp, ưu tiên gần và hoạt động trong nhà khi mưa.
3. Gia đình: có trẻ nhỏ, ban ngày, giới hạn khoảng cách và giờ đóng cửa.

Mỗi hành trình phải chứng minh được: constraint được hiểu đúng, địa điểm có thật, lịch trình không vi phạm giờ mở cửa, tổng chi phí trong giới hạn hoặc có cảnh báo, và Smart Replace tính lại được plan.

## 8. Definition of Done

Một task chỉ được coi là hoàn thành khi:

- Đạt acceptance criteria và đã được review.
- Không chứa secret; input được validate; lỗi có thông báo phù hợp.
- Có test ở mức hợp lý và CI pass.
- API/schema được cập nhật nếu có thay đổi contract.
- Web và Mobile có đủ loading, empty và error state; các luồng P0 hoạt động tương đương trên hai nền tảng.
- Tính năng đã được deploy lên staging và kiểm tra với dữ liệu gần thực tế.

## 9. Chỉ số đánh giá đồ án

- Tỷ lệ trích xuất đúng constraint trên evaluation set: mục tiêu >= 90%.
- Tỷ lệ plan hợp lệ về thời gian/giờ mở cửa: 100% trên test set.
- Tỷ lệ plan không vượt ngân sách khi tồn tại phương án hợp lệ: mục tiêu >= 95%.
- Thời gian tạo plan P95: mục tiêu dưới 10 giây.
- Không có địa điểm do LLM tự bịa; mọi `place_id` phải tồn tại trong database/provider.
- E2E pass cho ba hành trình demo.

## 10. Rủi ro và phương án giảm thiểu

| Rủi ro                            | Giảm thiểu                                                         |
| --------------------------------- | ------------------------------------------------------------------ |
| Scope quá lớn                     | Feature freeze sau tuần 9; chuyển Group/Surprise/Chat sang phase 2 |
| API bản đồ tốn phí hoặc hết quota | Cache, seed địa điểm, adapter dễ thay provider và chế độ demo      |
| LLM trả sai cấu trúc              | JSON schema, validation, retry có giới hạn và form xác nhận        |
| LLM bịa địa điểm                  | Chỉ cho planner dùng `place_id` từ candidate list                  |
| Không tìm được plan hợp lệ        | Nới ràng buộc có kiểm soát và giải thích rõ cho người dùng         |
| Tích hợp muộn                     | Mock API từ tuần 2 và demo end-to-end đầu tiên ở cuối tuần 5       |
| Demo phụ thuộc mạng               | Chuẩn bị dữ liệu cache và kịch bản fallback                        |

## 11. Nhịp làm việc

- Sprint một tuần; planning đầu tuần, demo và retrospective cuối tuần.
- Daily async: đã làm, sẽ làm, blocker.
- Board: Backlog -> Ready -> In Progress -> Review -> Test -> Done.
- Mỗi người chỉ giữ tối đa hai task In Progress.
- Milestone bắt buộc: cuối tuần 3 Explore; cuối tuần 5 Planner end-to-end; cuối tuần 9 MVP staging; tuần 10 feature freeze.
