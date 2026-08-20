# Wanderly Task Status

Tài liệu này là nguồn theo dõi tiến độ triển khai. Mỗi task hoàn thành phải có hồ sơ riêng trong `docs/tasks/`.

## Trạng thái

| Task                                       | Trạng thái | Hoàn thành | Hồ sơ                           |
| ------------------------------------------ | ---------- | ---------: | ------------------------------- |
| FND-01 — Chốt phạm vi MVP và user stories  | Done       | 2026-08-10 | [FND-01](./tasks/FND-01.md)     |
| FND-02 — Thiết kế kiến trúc hệ thống       | Done       | 2026-08-10 | [FND-02](./tasks/FND-02.md)     |
| FND-03 — Thiết kế ERD                      | Done       | 2026-08-10 | [FND-03](./tasks/FND-03.md)     |
| FND-04 — Định nghĩa API contract           | Done       | 2026-08-14 | [FND-04](./tasks/FND-04.md)     |
| FND-05 — Khởi tạo Web, Mobile và Backend   | Done       | 2026-08-10 | [FND-05](./tasks/FND-05.md)     |
| FND-06 — Cấu hình database và migration    | Done       | 2026-08-10 | [FND-06](./tasks/FND-06.md)     |
| FND-07 — Thiết lập convention              | Done       | 2026-08-10 | [FND-07](./tasks/FND-07.md)     |
| AUTH-01 — Đăng ký tài khoản                | Done       | 2026-08-14 | [AUTH-01](./tasks/AUTH-01.md)   |
| AUTH-02 — Đăng nhập và refresh token       | Done       | 2026-08-14 | [AUTH-02](./tasks/AUTH-02.md)   |
| AUTH-03 — Đăng xuất và thu hồi session     | Done       | 2026-08-14 | [AUTH-03](./tasks/AUTH-03.md)   |
| AUTH-04 — Quên và đặt lại mật khẩu         | Done       | 2026-08-14 | [AUTH-04](./tasks/AUTH-04.md)   |
| AUTH-05 — Phân quyền User/Admin            | Done       | 2026-08-14 | [AUTH-05](./tasks/AUTH-05.md)   |
| AUTH-06 — Trang hồ sơ cá nhân              | Done       | 2026-08-14 | [AUTH-06](./tasks/AUTH-06.md)   |
| PREF-01 — Khai báo danh mục sở thích       | Done       | 2026-08-18 | [PREF-01](./tasks/PREF-01.md)   |
| PREF-02 — Onboarding chọn sở thích         | Done       | 2026-08-18 | [PREF-02](./tasks/PREF-02.md)   |
| PREF-03 — API cập nhật sở thích            | Done       | 2026-08-18 | [PREF-03](./tasks/PREF-03.md)   |
| PREF-04 — Thu thập tín hiệu hành vi        | Done       | 2026-08-20 | [PREF-04](./tasks/PREF-04.md)   |
| PREF-05 — Cập nhật preference score        | Done       | 2026-08-20 | [PREF-05](./tasks/PREF-05.md)   |
| AI-01 — PlanningConstraints schema         | Done       | 2026-08-18 | [AI-01](./tasks/AI-01.md)       |
| AI-02 — Prompt trích xuất yêu cầu          | Done       | 2026-08-18 | [AI-02](./tasks/AI-02.md)       |
| AI-03 — Structured output                  | Done       | 2026-08-18 | [AI-03](./tasks/AI-03.md)       |
| AI-04 — Chuẩn hóa constraint               | Done       | 2026-08-18 | [AI-04](./tasks/AI-04.md)       |
| AI-05 — Retry và fallback                  | Done       | 2026-08-18 | [AI-05](./tasks/AI-05.md)       |
| AI-06 — Form xác nhận constraint           | Done       | 2026-08-18 | [AI-06](./tasks/AI-06.md)       |
| AI-07 — Log AI interaction                 | Done       | 2026-08-18 | [AI-07](./tasks/AI-07.md)       |
| REC-01 — Lọc candidate ràng buộc cứng      | Done       | 2026-08-18 | [REC-01](./tasks/REC-01.md)     |
| REC-02 — Recommendation scoring model      | Done       | 2026-08-18 | [REC-02](./tasks/REC-02.md)     |
| REC-03 — Candidate ranking                 | Done       | 2026-08-18 | [REC-03](./tasks/REC-03.md)     |
| REC-04 — Lý do đề xuất                     | Done       | 2026-08-18 | [REC-04](./tasks/REC-04.md)     |
| EXT-01 — Chọn Places/Maps provider         | Done       | 2026-08-19 | [EXT-01](./tasks/EXT-01.md)     |
| MAP-01 — Tích hợp map provider             | Done       | 2026-08-19 | [MAP-01](./tasks/MAP-01.md)     |
| MAP-02 — Vị trí và geocoding               | Done       | 2026-08-19 | [MAP-02](./tasks/MAP-02.md)     |
| MAP-03 — Distance/travel-time adapter       | Done       | 2026-08-19 | [MAP-03](./tasks/MAP-03.md)     |
| MAP-04 — Marker và route                    | Done       | 2026-08-19 | [MAP-04](./tasks/MAP-04.md)     |
| MAP-05 — Cache kết quả tuyến đường          | Done       | 2026-08-19 | [MAP-05](./tasks/MAP-05.md)     |
| MAP-06 — Fallback khi provider lỗi          | Done       | 2026-08-19 | [MAP-06](./tasks/MAP-06.md)     |
| EXT-02 — Chọn Weather provider              | Done       | 2026-08-19 | [EXT-02](./tasks/EXT-02.md)     |
| EXT-03 — Chọn LLM provider/model            | Done       | 2026-08-20 | [EXT-03](./tasks/EXT-03.md)     |
| EXT-04 — Xây dựng adapter cho provider      | Done       | 2026-08-20 | [EXT-04](./tasks/EXT-04.md)     |
| EXT-05 — Timeout, retry và circuit breaker  | Done       | 2026-08-20 | [EXT-05](./tasks/EXT-05.md)     |
| EXT-06 — Theo dõi quota và chi phí          | Done       | 2026-08-20 | [EXT-06](./tasks/EXT-06.md)     |
| WEATHER-01 — Tích hợp Weather API           | Done       | 2026-08-19 | [WEATHER-01](./tasks/WEATHER-01.md) |
| WEATHER-02 — Phân loại indoor/outdoor       | Done       | 2026-08-19 | [WEATHER-02](./tasks/WEATHER-02.md) |
| WEATHER-03 — Phát hiện xung đột thời tiết   | Done       | 2026-08-19 | [WEATHER-03](./tasks/WEATHER-03.md) |
| WEATHER-04 — Đề xuất thay thế theo thời tiết | Done      | 2026-08-19 | [WEATHER-04](./tasks/WEATHER-04.md) |
| REPLACE-01 — Xác định constraint của slot   | Done       | 2026-08-19 | [REPLACE-01](./tasks/REPLACE-01.md) |
| REPLACE-02 — Tìm candidate thay thế         | Done       | 2026-08-19 | [REPLACE-02](./tasks/REPLACE-02.md) |
| REPLACE-03 — Tính lại route, time, budget   | Done       | 2026-08-19 | [REPLACE-03](./tasks/REPLACE-03.md) |
| REPLACE-04 — Giao diện Smart Replace        | Done       | 2026-08-19 | [REPLACE-04](./tasks/REPLACE-04.md) |
| REPLACE-05 — Lưu hành vi replace/skip       | Done       | 2026-08-20 | [REPLACE-05](./tasks/REPLACE-05.md) |
| PLACE-01 — Thiết kế bảng Place và Category | Done       | 2026-08-10 | [PLACE-01](./tasks/PLACE-01.md) |
| PLACE-02 — Import/seed dữ liệu địa điểm    | Done       | 2026-08-11 | [PLACE-02](./tasks/PLACE-02.md) |
| PLACE-03 — Chuẩn hóa thông tin địa điểm    | Done       | 2026-08-12 | [PLACE-03](./tasks/PLACE-03.md) |
| PLACE-04 — API danh sách địa điểm          | Done       | 2026-08-12 | [PLACE-04](./tasks/PLACE-04.md) |
| PLACE-05 — API tìm kiếm và bộ lọc          | Done       | 2026-08-18 | [PLACE-05](./tasks/PLACE-05.md) |
| PLACE-06 — API chi tiết địa điểm           | Done       | 2026-08-12 | [PLACE-06](./tasks/PLACE-06.md) |
| PLACE-07 — Đồng bộ Places provider         | Done       | 2026-08-19 | [PLACE-07](./tasks/PLACE-07.md) |
| EXP-01 — Trang Explore                     | Done       | 2026-08-13 | [EXP-01](./tasks/EXP-01.md)     |
| PLAN-02 — Planner v1                       | Done       | 2026-08-14 | [PLAN-02](./tasks/PLAN-02.md)   |
| PLAN-03 — Kiểm tra giờ mở cửa              | Done       | 2026-08-13 | [PLAN-03](./tasks/PLAN-03.md)   |
| PLAN-04 — Kiểm tra thời lượng              | Done       | 2026-08-14 | [PLAN-04](./tasks/PLAN-04.md)   |
| PLAN-05 — Tối ưu ngân sách                 | Done       | 2026-08-13 | [PLAN-05](./tasks/PLAN-05.md)   |
| PLAN-06 — Điều chỉnh theo thời tiết        | Done       | 2026-08-14 | [PLAN-06](./tasks/PLAN-06.md)   |
| PLAN-07 — Validate kế hoạch cuối cùng      | Done       | 2026-08-14 | [PLAN-07](./tasks/PLAN-07.md)   |
| PLAN-09 — Timeline lịch trình              | Done       | 2026-08-13 | [PLAN-09](./tasks/PLAN-09.md)   |
| PLAN-10 — Bản đồ lịch trình                | Done       | 2026-08-14 | [PLAN-10](./tasks/PLAN-10.md)   |
| PLAN-11 — Chỉnh sửa thủ công               | Done       | 2026-08-13 | [PLAN-11](./tasks/PLAN-11.md)   |
| PLAN-12 — Chia sẻ lịch trình               | Done       | 2026-08-14 | [PLAN-12](./tasks/PLAN-12.md)   |
| PLAN-08 — API lưu và lấy lịch trình        | Done       | 2026-08-14 | [PLAN-08](./tasks/PLAN-08.md)   |
| BUDGET-01 — Mô hình ước tính chi phí       | Done       | 2026-08-13 | [BUDGET-01](./tasks/BUDGET-01.md) |
| BUDGET-02 — Budget breakdown               | Done       | 2026-08-18 | [BUDGET-02](./tasks/BUDGET-02.md) |
| BUDGET-03 — Cảnh báo vượt ngân sách        | Done       | 2026-08-18 | [BUDGET-03](./tasks/BUDGET-03.md) |
| BUDGET-04 — Optimize Budget                | Done       | 2026-08-19 | [BUDGET-04](./tasks/BUDGET-04.md) |
| EXP-02 — Thanh tìm kiếm và bộ lọc          | Done       | 2026-08-14 | [EXP-02](./tasks/EXP-02.md)     |
| EXP-03 — Collection cơ bản                  | Done       | 2026-08-14 | [EXP-03](./tasks/EXP-03.md)     |
| EXP-04 — Trang Place Detail                | Done       | 2026-08-13 | [EXP-04](./tasks/EXP-04.md)     |
| EXP-05 — Directions và Share                | Done       | 2026-08-13 | [EXP-05](./tasks/EXP-05.md)     |
| EXP-06 — Add to Plan                        | Done       | 2026-08-14 | [EXP-06](./tasks/EXP-06.md)     |
| FAV-01 — Lưu/bỏ lưu địa điểm                | Done       | 2026-08-16 | [FAV-01](./tasks/FAV-01.md)     |
| FAV-02 — Danh sách địa điểm đã lưu          | Done       | 2026-08-14 | [FAV-02](./tasks/FAV-02.md)     |
| REVIEW-01 — Tạo và cập nhật đánh giá        | Done       | 2026-08-18 | [REVIEW-01](./tasks/REVIEW-01.md) |
| REVIEW-02 — Danh sách đánh giá              | Done       | 2026-08-18 | [REVIEW-02](./tasks/REVIEW-02.md) |
| REVIEW-03 — Báo cáo review                  | Done       | 2026-08-18 | [REVIEW-03](./tasks/REVIEW-03.md) |
| ADMIN-01 — Admin layout và route guard      | Done       | 2026-08-18 | [ADMIN-01](./tasks/ADMIN-01.md) |
| ADMIN-04 — Quản lý review/report            | Done       | 2026-08-18 | [ADMIN-04](./tasks/ADMIN-04.md) |
| ADMIN-02 — CRUD địa điểm và danh mục        | Done       | 2026-08-20 | [ADMIN-02](./tasks/ADMIN-02.md) |
| ADMIN-03 — Quản lý users và events          | Done       | 2026-08-20 | [ADMIN-03](./tasks/ADMIN-03.md) |
| ADMIN-05 — Dashboard số liệu cơ bản         | Done       | 2026-08-20 | [ADMIN-05](./tasks/ADMIN-05.md) |
| ADMIN-06 — Theo dõi AI usage                | Done       | 2026-08-20 | [ADMIN-06](./tasks/ADMIN-06.md) |
| OPS-01 — Docker Compose local                | Done       | 2026-08-20 | [OPS-01](./tasks/OPS-01.md)     |
| OPS-02 — CI lint, test và build              | Done       | 2026-08-20 | [OPS-02](./tasks/OPS-02.md)     |
| OPS-03 — Quản lý environment và secret       | Done       | 2026-08-20 | [OPS-03](./tasks/OPS-03.md)     |
| SEC-01 — Input validation/output encoding    | Done       | 2026-08-20 | [SEC-01](./tasks/SEC-01.md)     |
| SEC-02 — Rate limiting                       | Done       | 2026-08-20 | [SEC-02](./tasks/SEC-02.md)     |
| SEC-03 — Kiểm tra secret và dependency       | Done       | 2026-08-20 | [SEC-03](./tasks/SEC-03.md)     |
| PLAN-01 — Kế hoạch cơ bản                   | Done       | 2026-08-13 | [PLAN-01](./tasks/PLAN-01.md)   |
| EVENT-01 — Thiết kế và quản lý sự kiện      | Done       | 2026-08-20 | [EVENT-01](./tasks/EVENT-01.md) |
| EVENT-02 — Đưa sự kiện vào recommendation   | Done       | 2026-08-20 | [EVENT-02](./tasks/EVENT-02.md) |
| EVENT-03 — Hiển thị sự kiện trên Explore    | Done       | 2026-08-20 | [EVENT-03](./tasks/EVENT-03.md) |
| CLIENT-01 — Tạo package contracts            | Done       | 2026-08-20 | [CLIENT-01](./tasks/CLIENT-01.md) |
| CLIENT-02 — Tạo typed API client              | Done       | 2026-08-20 | [CLIENT-02](./tasks/CLIENT-02.md) |
| CLIENT-03 — Tạo domain helpers dùng chung     | Done       | 2026-08-20 | [CLIENT-03](./tasks/CLIENT-03.md) |
| CLIENT-04 — Thiết kế query key convention     | Done       | 2026-08-20 | [CLIENT-04](./tasks/CLIENT-04.md) |
| CLIENT-05 — Thiết kế deep link contract       | Done       | 2026-08-20 | [CLIENT-05](./tasks/CLIENT-05.md) |
| WEB-01 — Khởi tạo React + Vite                 | Done       | 2026-08-20 | [WEB-01](./tasks/WEB-01.md) |
| WEB-02 — Thiết lập React Router                | Done       | 2026-08-20 | [WEB-02](./tasks/WEB-02.md) |
| WEB-03 — Tạo Web design system                 | Done       | 2026-08-20 | [WEB-03](./tasks/WEB-03.md) |
| WEB-04 — Auth và onboarding                    | Done       | 2026-08-20 | [WEB-04](./tasks/WEB-04.md) |
| WEB-05 — Explore và Place Detail               | Done       | 2026-08-20 | [WEB-05](./tasks/WEB-05.md) |
| WEB-06 — AI Planner                             | Done       | 2026-08-20 | [WEB-06](./tasks/WEB-06.md) |
| WEB-07 — Itinerary experience                   | Done       | 2026-08-20 | [WEB-07](./tasks/WEB-07.md) |
| WEB-08 — Smart Replace                          | Done       | 2026-08-20 | [WEB-08](./tasks/WEB-08.md) |
| WEB-09 — Admin Web                              | Done       | 2026-08-20 | [WEB-09](./tasks/WEB-09.md) |
| WEB-10 — Web test                               | Done       | 2026-08-20 | [WEB-10](./tasks/WEB-10.md) |
| MOB-01 — Khởi tạo Expo React Native             | Done       | 2026-08-20 | [MOB-01](./tasks/MOB-01.md) |
| MOB-02 — Thiết lập Expo Router                  | Done       | 2026-08-20 | [MOB-02](./tasks/MOB-02.md) |
| MOB-03 — Tạo Mobile design system               | Done       | 2026-08-20 | [MOB-03](./tasks/MOB-03.md) |
| MOB-04 — Auth và secure session                 | Done       | 2026-08-20 | [MOB-04](./tasks/MOB-04.md) |
| MOB-05 — Quyền vị trí                           | Done       | 2026-08-20 | [MOB-05](./tasks/MOB-05.md) |
| MOB-06 — Explore và Place Detail                | Done       | 2026-08-20 | [MOB-06](./tasks/MOB-06.md) |
| MOB-07 — AI Planner native                      | Done       | 2026-08-20 | [MOB-07](./tasks/MOB-07.md) |
| MOB-08 — Itinerary native                       | Done       | 2026-08-20 | [MOB-08](./tasks/MOB-08.md) |
| MOB-09 — Map và route native                    | Done       | 2026-08-20 | [MOB-09](./tasks/MOB-09.md) |
| MOB-10 — Smart Replace native                   | Done       | 2026-08-20 | [MOB-10](./tasks/MOB-10.md) |
| MOB-11 — Deep link và Universal Link            | Done       | 2026-08-20 | [MOB-11](./tasks/MOB-11.md) |
| MOB-12 — Offline cache cơ bản                   | Done       | 2026-08-20 | [MOB-12](./tasks/MOB-12.md) |
| MOB-13 — Notification reminders                 | Done       | 2026-08-20 | [MOB-13](./tasks/MOB-13.md) |
| MOB-14 — Mobile test suite                      | Done       | 2026-08-20 | [MOB-14](./tasks/MOB-14.md) |
| MOB-15 — EAS build và release                   | Done       | 2026-08-20 | [MOB-15](./tasks/MOB-15.md) |
| MOB-16 — Favorites native hub                   | Done       | 2026-08-20 | [MOB-16](./tasks/MOB-16.md) |
| MOB-17 — Events native                          | Done       | 2026-08-20 | [MOB-17](./tasks/MOB-17.md) |
| MOB-18 — Profile native                         | Done       | 2026-08-20 | [MOB-18](./tasks/MOB-18.md) |
| MOB-19 — Reviews native                         | Done       | 2026-08-20 | [MOB-19](./tasks/MOB-19.md) |
| MOB-20 — Mobile telemetry queue                 | Done       | 2026-08-20 | [MOB-20](./tasks/MOB-20.md) |
| MOB-21 — Favorites sync foundation              | Done       | 2026-08-20 | [MOB-21](./tasks/MOB-21.md) |
| MOB-22 — Preferences native                     | Done       | 2026-08-20 | [MOB-22](./tasks/MOB-22.md) |
| MOB-23 — Review submit native                   | Done       | 2026-08-20 | [MOB-23](./tasks/MOB-23.md) |

## Quy tắc cập nhật

- `Partial`: đã có một phần code/prototype nhưng chưa đạt đầy đủ đầu ra task gốc.
- `Needs Fix`: code từng được triển khai nhưng đang lỗi, bị regression hoặc không build được.
- `Branch only`: code tồn tại trên branch riêng nhưng chưa được tích hợp vào nhánh đang audit.

- `Done` chỉ được ghi khi đầu ra đã tồn tại và đã được kiểm tra.
- Mỗi hồ sơ task phải ghi mục tiêu, phạm vi, thay đổi, quyết định, cách kiểm tra và phần việc tiếp theo.
- Nếu task làm thay đổi kiến trúc/API/database, tài liệu thiết kế gốc cũng phải được cập nhật.
- Không đánh dấu task hoàn thành chỉ vì đã tạo file khung.

## Kết quả audit 2026-08-13

- Unit test: 20 test đạt; Web và Mobile chưa có test case.
- Typecheck đạt, nhưng production build thất bại tại `PlansPage.tsx`.
- PLAN-02 đã được tích hợp và bổ sung parser/kiểm thử metadata. PLAN-04 dùng khoảng cách tọa độ để ước tính thời gian di chuyển. PLAN-06 đã tích hợp dự báo Open-Meteo với lựa chọn thủ công làm fallback. PLAN-07 đã tổng hợp validation thành kết quả có category và kiểm tra dữ liệu chưa tải đủ.
- PLAN-08 đã có CRUD API và Prisma persistence; còn `Partial` đến khi thay header user tạm bằng JWT principal từ AUTH-05.
- PLAN-10 đã có sơ đồ SVG marker/polyline, tổng khoảng cách Haversine và liên kết tuyến Google Maps.
- PLAN-12 đã được tích hợp lại với Planner hiện tại: liên kết snapshot công khai mở ở chế độ chỉ đọc và không phụ thuộc local storage của người nhận.
- Favorites, Reviews và Admin hiện chủ yếu dùng localStorage, chưa đạt yêu cầu backend/auth.
- Chi tiết xem [TASK-AUDIT-2026-08-13](./tasks/TASK-AUDIT-2026-08-13.md).
