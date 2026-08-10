# Wanderly — Task theo nhóm chức năng

## Quy ước

- **P0:** bắt buộc để hoàn thành MVP.
- **P1:** cần có để sản phẩm hoàn chỉnh và demo tốt.
- **P2:** tính năng mở rộng, chỉ thực hiện sau khi MVP ổn định.
- Trạng thái đề xuất: `Backlog -> Ready -> In Progress -> Review -> Test -> Done`.

## 1. Nền tảng và kiến trúc

| ID     | Task                             | Đầu ra                                                | Ưu tiên | Phụ thuộc      |
| ------ | -------------------------------- | ----------------------------------------------------- | ------- | -------------- |
| FND-01 | Chốt phạm vi MVP và user stories | Danh sách user stories có acceptance criteria         | P0      | —              |
| FND-02 | Thiết kế kiến trúc hệ thống      | Sơ đồ frontend, backend, database, AI và external API | P0      | FND-01         |
| FND-03 | Thiết kế ERD                     | ERD và data dictionary                                | P0      | FND-01         |
| FND-04 | Định nghĩa API contract          | OpenAPI/Swagger và response mẫu                       | P0      | FND-02, FND-03 |
| FND-05 | Khởi tạo Web, Mobile và Backend  | React Web, Expo Mobile và API chạy được ở local       | P0      | FND-02         |
| FND-06 | Cấu hình database và migration   | PostgreSQL, migration và seed command                 | P0      | FND-03, FND-05 |
| FND-07 | Thiết lập convention             | Quy tắc branch, commit, review và code style          | P1      | FND-05         |

## 2. Xác thực và tài khoản

| ID      | Task                         | Đầu ra                           | Ưu tiên | Phụ thuộc     |
| ------- | ---------------------------- | -------------------------------- | ------- | ------------- |
| AUTH-01 | Đăng ký tài khoản            | API và giao diện đăng ký         | P0      | FND-04–FND-06 |
| AUTH-02 | Đăng nhập và refresh token   | Session đăng nhập an toàn        | P0      | AUTH-01       |
| AUTH-03 | Đăng xuất và thu hồi session | Luồng logout hoàn chỉnh          | P0      | AUTH-02       |
| AUTH-04 | Quên và đặt lại mật khẩu     | Email/token reset password       | P1      | AUTH-01       |
| AUTH-05 | Phân quyền User/Admin        | Middleware/guard kiểm soát quyền | P0      | AUTH-02       |
| AUTH-06 | Trang hồ sơ cá nhân          | Xem và cập nhật thông tin        | P1      | AUTH-02       |

## 3. Sở thích và cá nhân hóa

| ID      | Task                       | Đầu ra                                        | Ưu tiên | Phụ thuộc                  |
| ------- | -------------------------- | --------------------------------------------- | ------- | -------------------------- |
| PREF-01 | Khai báo danh mục sở thích | Cafe, food, art, outdoor và các category khác | P0      | PLACE-01                   |
| PREF-02 | Onboarding chọn sở thích   | Form lựa chọn sau đăng ký                     | P0      | AUTH-01, PREF-01           |
| PREF-03 | API cập nhật sở thích      | Lưu trọng số sở thích người dùng              | P0      | PREF-02                    |
| PREF-04 | Thu thập tín hiệu hành vi  | Favorite, visit, skip, replace và rating      | P2      | PLAN-08, FAV-01, REVIEW-01 |
| PREF-05 | Cập nhật preference score  | Hồ sơ sở thích học từ hành vi                 | P2      | PREF-04                    |

## 4. Địa điểm và danh mục

| ID       | Task                            | Đầu ra                                      | Ưu tiên | Phụ thuộc        |
| -------- | ------------------------------- | ------------------------------------------- | ------- | ---------------- |
| PLACE-01 | Thiết kế bảng Place và Category | Schema địa điểm, danh mục và quan hệ        | P0      | FND-03           |
| PLACE-02 | Import/seed dữ liệu địa điểm    | Bộ dữ liệu đủ cho demo                      | P0      | PLACE-01         |
| PLACE-03 | Chuẩn hóa thông tin địa điểm    | Tọa độ, giá, giờ mở cửa, tags và ảnh        | P0      | PLACE-02         |
| PLACE-04 | API danh sách địa điểm          | Pagination, sort và dữ liệu tóm tắt         | P0      | PLACE-03         |
| PLACE-05 | API tìm kiếm và bộ lọc          | Lọc theo category, giá, khoảng cách, rating | P0      | PLACE-04, MAP-02 |
| PLACE-06 | API chi tiết địa điểm           | About, ảnh, giờ mở cửa và vị trí            | P0      | PLACE-03         |
| PLACE-07 | Đồng bộ Places provider         | Adapter lấy/cập nhật dữ liệu bên ngoài      | P1      | EXT-01, PLACE-03 |

## 5. Explore và Place Detail

| ID     | Task                     | Đầu ra                                  | Ưu tiên | Phụ thuộc            |
| ------ | ------------------------ | --------------------------------------- | ------- | -------------------- |
| EXP-01 | Trang Explore            | Danh sách địa điểm responsive           | P0      | PLACE-04             |
| EXP-02 | Thanh tìm kiếm và bộ lọc | Search/filter đồng bộ URL               | P0      | PLACE-05, EXP-01     |
| EXP-03 | Collection cơ bản        | Trending, Under 100k, Date và Rainy Day | P1      | PLACE-04, WEATHER-02 |
| EXP-04 | Trang Place Detail       | Thông tin, ảnh, giờ mở cửa và tags      | P0      | PLACE-06             |
| EXP-05 | Directions và Share      | Mở bản đồ và chia sẻ địa điểm           | P1      | EXP-04, MAP-01       |
| EXP-06 | Add to Plan              | Chọn địa điểm để thêm vào lịch trình    | P1      | EXP-04, PLAN-08      |

## 6. Favorite và Review

| ID        | Task                     | Đầu ra                        | Ưu tiên | Phụ thuộc           |
| --------- | ------------------------ | ----------------------------- | ------- | ------------------- |
| FAV-01    | Lưu/bỏ lưu địa điểm      | API và nút Favorite           | P1      | AUTH-02, PLACE-06   |
| FAV-02    | Danh sách yêu thích      | Trang địa điểm đã lưu         | P1      | FAV-01              |
| REVIEW-01 | Tạo và cập nhật đánh giá | Rating và nội dung review     | P1      | AUTH-02, PLACE-06   |
| REVIEW-02 | Danh sách đánh giá       | Review list và pagination     | P1      | REVIEW-01           |
| REVIEW-03 | Báo cáo nội dung vi phạm | Report review cho admin xử lý | P2      | REVIEW-02, ADMIN-04 |

## 7. AI Understanding

| ID    | Task                                | Đầu ra                                                   | Ưu tiên | Phụ thuộc     |
| ----- | ----------------------------------- | -------------------------------------------------------- | ------- | ------------- |
| AI-01 | Thiết kế PlanningConstraints schema | Schema date, time, people, budget, interests và location | P0      | FND-04        |
| AI-02 | Thiết kế prompt trích xuất yêu cầu  | Prompt có ví dụ và giới hạn rõ ràng                      | P0      | AI-01         |
| AI-03 | Tích hợp structured output          | Kết quả LLM đúng JSON schema                             | P0      | AI-02, EXT-03 |
| AI-04 | Validate và chuẩn hóa constraint    | Chuẩn hóa thời gian, tiền tệ và giá trị mặc định         | P0      | AI-03         |
| AI-05 | Retry và fallback                   | Xử lý timeout, JSON sai và provider lỗi                  | P0      | AI-04         |
| AI-06 | Form xác nhận constraint            | Người dùng xem và sửa trước khi generate                 | P0      | AI-01, AI-04  |
| AI-07 | Lưu AI interaction có giới hạn      | Log phục vụ debug, không lưu dữ liệu nhạy cảm quá mức    | P1      | AI-03         |

## 8. Recommendation Engine

| ID     | Task                              | Đầu ra                                                   | Ưu tiên | Phụ thuộc        |
| ------ | --------------------------------- | -------------------------------------------------------- | ------- | ---------------- |
| REC-01 | Lọc candidate theo ràng buộc cứng | Loại địa điểm đóng cửa, quá xa hoặc không phù hợp        | P0      | PLACE-05, AI-04  |
| REC-02 | Thiết kế scoring model            | Trọng số preference, distance, rating, budget và weather | P0      | REC-01           |
| REC-03 | Triển khai ranking                | Danh sách candidate kèm match score                      | P0      | REC-02           |
| REC-04 | Sinh lý do đề xuất                | Giải thích ngắn dựa trên dữ liệu thật                    | P1      | REC-03           |
| REC-05 | Semantic search bằng embedding    | Matching mô tả tự nhiên với địa điểm                     | P2      | REC-03           |
| REC-06 | Group preference scoring          | Tổng hợp sở thích nhiều thành viên                       | P2      | GROUP-03, REC-03 |

## 9. Smart Itinerary

| ID      | Task                             | Đầu ra                                           | Ưu tiên | Phụ thuộc           |
| ------- | -------------------------------- | ------------------------------------------------ | ------- | ------------------- |
| PLAN-01 | Thiết kế Plan và PlanItem        | Schema lịch trình có cấu trúc                    | P0      | FND-03              |
| PLAN-02 | Xây dựng planner v1              | Chọn và sắp xếp các địa điểm theo thời gian      | P0      | REC-03, MAP-03      |
| PLAN-03 | Kiểm tra giờ mở cửa              | Không xếp địa điểm ngoài thời gian hoạt động     | P0      | PLAN-02, PLACE-03   |
| PLAN-04 | Kiểm tra thời lượng và di chuyển | Plan nằm trong start/end time                    | P0      | PLAN-02, MAP-03     |
| PLAN-05 | Tối ưu ngân sách                 | Ước tính tổng chi phí và cảnh báo vượt ngân sách | P0      | PLAN-02, BUDGET-01  |
| PLAN-06 | Điều chỉnh theo thời tiết        | Hạn chế hoạt động ngoài trời khi thời tiết xấu   | P1      | PLAN-02, WEATHER-03 |
| PLAN-07 | Validate plan cuối cùng          | Không trả plan vi phạm constraint cứng           | P0      | PLAN-03–PLAN-06     |
| PLAN-08 | API lưu và lấy lịch trình        | CRUD Plan và PlanItem                            | P0      | PLAN-01, PLAN-07    |
| PLAN-09 | Timeline lịch trình              | UI theo thứ tự thời gian                         | P0      | PLAN-08             |
| PLAN-10 | Bản đồ lịch trình                | Marker, route và tổng khoảng cách                | P0      | PLAN-08, MAP-04     |
| PLAN-11 | Chỉnh sửa thủ công               | Đổi thời gian, thứ tự hoặc xóa plan item         | P1      | PLAN-08             |
| PLAN-12 | Chia sẻ lịch trình               | Public read-only link                            | P1      | PLAN-08             |

## 10. Budget Planner

| ID        | Task                     | Đầu ra                                  | Ưu tiên | Phụ thuộc             |
| --------- | ------------------------ | --------------------------------------- | ------- | --------------------- |
| BUDGET-01 | Mô hình ước tính chi phí | Chi phí địa điểm, ăn uống và di chuyển  | P0      | PLACE-03, MAP-03      |
| BUDGET-02 | Budget breakdown         | Bảng chi phí từng mục và tổng cộng      | P0      | BUDGET-01, PLAN-09    |
| BUDGET-03 | Cảnh báo vượt ngân sách  | Hiển thị số tiền vượt và nguyên nhân    | P0      | BUDGET-02             |
| BUDGET-04 | Optimize Budget          | Đề xuất phương án tương tự nhưng rẻ hơn | P1      | BUDGET-03, REPLACE-02 |

## 11. Maps, khoảng cách và tuyến đường

| ID     | Task                         | Đầu ra                                                | Ưu tiên | Phụ thuộc |
| ------ | ---------------------------- | ----------------------------------------------------- | ------- | --------- |
| MAP-01 | Tích hợp map provider        | Google Maps trên Web và react-native-maps trên Mobile | P0      | EXT-01    |
| MAP-02 | Tìm vị trí và geocoding      | Lấy tọa độ bắt đầu của người dùng                     | P0      | MAP-01    |
| MAP-03 | Distance/travel-time adapter | Khoảng cách và thời gian giữa các điểm                | P0      | MAP-01    |
| MAP-04 | Hiển thị marker và route     | Polyline cho toàn bộ itinerary                        | P0      | MAP-03    |
| MAP-05 | Cache kết quả tuyến đường    | Giảm quota và thời gian phản hồi                      | P1      | MAP-03    |
| MAP-06 | Fallback khi provider lỗi    | Ước lượng khoảng cách và thông báo phù hợp            | P1      | MAP-03    |

## 12. Weather-aware Planning

| ID         | Task                               | Đầu ra                                 | Ưu tiên | Phụ thuộc              |
| ---------- | ---------------------------------- | -------------------------------------- | ------- | ---------------------- |
| WEATHER-01 | Tích hợp Weather API               | Dự báo theo vị trí và thời gian        | P1      | EXT-02                 |
| WEATHER-02 | Phân loại hoạt động indoor/outdoor | Thuộc tính dùng khi đánh giá thời tiết | P1      | PLACE-03               |
| WEATHER-03 | Phát hiện xung đột thời tiết       | Cảnh báo mưa/nắng nóng theo plan item  | P1      | WEATHER-01, WEATHER-02 |
| WEATHER-04 | Đề xuất thay thế theo thời tiết    | Danh sách địa điểm phù hợp hơn         | P1      | WEATHER-03, REPLACE-02 |

## 13. Smart Replace

| ID         | Task                                | Đầu ra                                        | Ưu tiên | Phụ thuộc                     |
| ---------- | ----------------------------------- | --------------------------------------------- | ------- | ----------------------------- |
| REPLACE-01 | Xác định constraint của slot        | Thời gian, vị trí, category và budget còn lại | P0      | PLAN-07                       |
| REPLACE-02 | Tìm candidate thay thế              | Danh sách lựa chọn có match score             | P0      | REPLACE-01, REC-03            |
| REPLACE-03 | Tính lại route, thời gian và budget | Plan mới hợp lệ sau thay thế                  | P0      | REPLACE-02, MAP-03, BUDGET-01 |
| REPLACE-04 | Giao diện Smart Replace             | Modal lựa chọn và preview tác động            | P0      | REPLACE-03                    |
| REPLACE-05 | Lưu hành vi replace/skip            | Dữ liệu phục vụ cá nhân hóa                   | P2      | REPLACE-04, PREF-04           |

## 14. Group Planning và Voting

| ID       | Task                         | Đầu ra                      | Ưu tiên | Phụ thuộc                 |
| -------- | ---------------------------- | --------------------------- | ------- | ------------------------- |
| GROUP-01 | Tạo nhóm và link mời         | Group planning session      | P2      | AUTH-02                   |
| GROUP-02 | Thành viên khai báo sở thích | Preference riêng trong nhóm | P2      | GROUP-01, PREF-01         |
| GROUP-03 | Tính group preference        | Hồ sơ sở thích tổng hợp     | P2      | GROUP-02                  |
| GROUP-04 | Sinh nhiều phương án plan    | Plan A/B/C                  | P2      | GROUP-03, REC-06, PLAN-07 |
| VOTE-01  | Vote phương án               | Một vote mỗi thành viên     | P2      | GROUP-04                  |
| VOTE-02  | Chốt phương án thắng         | Finalized group plan        | P2      | VOTE-01                   |

## 15. Surprise Me và AI Assistant

| ID      | Task                                 | Đầu ra                               | Ưu tiên | Phụ thuộc        |
| ------- | ------------------------------------ | ------------------------------------ | ------- | ---------------- |
| SUR-01  | Chọn mức Familiar/Balanced/Adventure | Exploration mode                     | P2      | PREF-03          |
| SUR-02  | Sinh plan ngẫu nhiên có kiểm soát    | Adventure hợp lệ theo budget/time    | P2      | SUR-01, PLAN-07  |
| CHAT-01 | Hiểu lệnh chỉnh sửa plan             | Structured plan modification command | P2      | AI-04, PLAN-08   |
| CHAT-02 | Áp dụng thay đổi có validation       | Plan mới sau hội thoại               | P2      | CHAT-01, PLAN-07 |
| CHAT-03 | Hiển thị lịch sử chỉnh sửa           | Conversation và plan version         | P2      | CHAT-02          |

## 16. Feedback và Notification

| ID          | Task                        | Đầu ra                            | Ưu tiên | Phụ thuộc            |
| ----------- | --------------------------- | --------------------------------- | ------- | -------------------- |
| FEEDBACK-01 | Đánh giá toàn bộ plan       | Overall rating sau chuyến đi      | P2      | PLAN-08              |
| FEEDBACK-02 | Đánh giá từng địa điểm      | Loved/Okay/Disliked cho plan item | P2      | FEEDBACK-01          |
| FEEDBACK-03 | Đưa feedback vào preference | Cập nhật trọng số sở thích        | P2      | FEEDBACK-02, PREF-05 |
| NOTI-01     | Nhắc lịch trình sắp diễn ra | In-app/email notification         | P2      | PLAN-08              |
| NOTI-02     | Cảnh báo thay đổi thời tiết | Đề nghị điều chỉnh plan           | P2      | WEATHER-03, NOTI-01  |
| NOTI-03     | Gợi ý sự kiện phù hợp       | Notification cá nhân hóa          | P2      | PREF-05, EVENT-02    |

## 17. Event

| ID       | Task                           | Đầu ra                             | Ưu tiên | Phụ thuộc        |
| -------- | ------------------------------ | ---------------------------------- | ------- | ---------------- |
| EVENT-01 | Thiết kế và quản lý sự kiện    | Event schema và CRUD API           | P1      | FND-03, AUTH-05  |
| EVENT-02 | Đưa sự kiện vào recommendation | Event xuất hiện khi đúng thời gian | P1      | EVENT-01, REC-03 |
| EVENT-03 | Hiển thị sự kiện trên Explore  | Event cards và detail              | P1      | EVENT-01, EXP-01 |

## 18. Admin

| ID       | Task                        | Đầu ra                              | Ưu tiên | Phụ thuộc           |
| -------- | --------------------------- | ----------------------------------- | ------- | ------------------- |
| ADMIN-01 | Admin layout và route guard | Khu vực quản trị riêng              | P1      | AUTH-05             |
| ADMIN-02 | CRUD địa điểm và danh mục   | Form và bảng quản lý dữ liệu        | P1      | PLACE-04, ADMIN-01  |
| ADMIN-03 | Quản lý users và events     | Danh sách, trạng thái và CRUD event | P1      | ADMIN-01, EVENT-01  |
| ADMIN-04 | Quản lý reviews/reports     | Ẩn hoặc xử lý nội dung vi phạm      | P2      | ADMIN-01, REVIEW-03 |
| ADMIN-05 | Dashboard số liệu cơ bản    | Users, plans, places và rating      | P1      | ADMIN-01, PLAN-08   |
| ADMIN-06 | Theo dõi AI usage           | Số request, latency, lỗi và chi phí | P2      | AI-07, ADMIN-01     |

## 19. External services

| ID     | Task                              | Đầu ra                                | Ưu tiên | Phụ thuộc     |
| ------ | --------------------------------- | ------------------------------------- | ------- | ------------- |
| EXT-01 | Chọn Places/Maps provider         | Quyết định provider, quota và chi phí | P0      | FND-01        |
| EXT-02 | Chọn Weather provider             | Quyết định provider và giới hạn API   | P1      | FND-01        |
| EXT-03 | Chọn LLM provider/model           | Quyết định model, chi phí và fallback | P0      | FND-01        |
| EXT-04 | Xây dựng adapter cho provider     | Interface giúp thay provider          | P0      | EXT-01–EXT-03 |
| EXT-05 | Timeout, retry và circuit breaker | External call không làm treo hệ thống | P1      | EXT-04        |
| EXT-06 | Theo dõi quota và chi phí         | Log/metric sử dụng từng provider      | P1      | EXT-04        |

## 20. DevOps, bảo mật và vận hành

| ID     | Task                                | Đầu ra                                    | Ưu tiên | Phụ thuộc        |
| ------ | ----------------------------------- | ----------------------------------------- | ------- | ---------------- |
| OPS-01 | Docker Compose local                | Khởi chạy toàn hệ thống bằng một lệnh     | P0      | FND-05, FND-06   |
| OPS-02 | CI lint, test và build              | Pipeline chạy trên pull request           | P0      | OPS-01           |
| OPS-03 | Quản lý environment và secret       | Template env và secret store              | P0      | OPS-01           |
| OPS-04 | Deploy staging                      | URL staging cho cả nhóm kiểm thử          | P0      | OPS-02           |
| OPS-05 | Deploy production                   | Bản release phục vụ demo                  | P1      | OPS-04, QA-06    |
| OPS-06 | Logging và health check             | Log có cấu trúc và endpoint kiểm tra      | P1      | OPS-04           |
| OPS-07 | Error tracking và metrics           | Theo dõi lỗi, latency và provider call    | P1      | OPS-06           |
| SEC-01 | Input validation và output encoding | Ngăn dữ liệu không hợp lệ/XSS cơ bản      | P0      | Các API chính    |
| SEC-02 | Rate limiting                       | Bảo vệ auth và AI endpoint                | P0      | AUTH-02, AI-03   |
| SEC-03 | Kiểm tra secret và dependency       | Không lộ key, xử lý dependency rủi ro cao | P0      | OPS-03           |
| SEC-04 | Phân quyền object-level             | User không truy cập plan của người khác   | P0      | AUTH-05, PLAN-08 |

## 21. QA và kiểm thử

| ID    | Task                               | Đầu ra                                                | Ưu tiên | Phụ thuộc           |
| ----- | ---------------------------------- | ----------------------------------------------------- | ------- | ------------------- |
| QA-01 | Viết test plan                     | Test matrix theo user story                           | P0      | FND-01              |
| QA-02 | Unit test recommendation           | Kiểm tra scoring và filter                            | P0      | REC-03              |
| QA-03 | Unit test planner                  | Kiểm tra time, budget và opening hours                | P0      | PLAN-07             |
| QA-04 | Integration test API/database      | Auth, Place và Plan API                               | P0      | API chính           |
| QA-05 | E2E ba hành trình demo             | Couple, cá nhân và gia đình                           | P0      | PLAN-10, REPLACE-04 |
| QA-06 | Regression test MVP                | Checklist trước release                               | P0      | QA-02–QA-05         |
| QA-07 | Performance test                   | P95 tạo plan dưới mục tiêu                            | P1      | OPS-04              |
| QA-08 | Security smoke test                | Auth, access control, validation và rate limit        | P0      | SEC-01–SEC-04       |
| QA-09 | Kiểm tra đa nền tảng/accessibility | Web responsive, keyboard và Android/iOS accessibility | P1      | UI chính            |
| QA-10 | Demo offline/fallback              | Seed/cache và kịch bản khi API lỗi                    | P0      | EXT-05, OPS-05      |

## 22. Báo cáo và bàn giao

| ID     | Task                                | Đầu ra                                     | Ưu tiên | Phụ thuộc      |
| ------ | ----------------------------------- | ------------------------------------------ | ------- | -------------- |
| DOC-01 | Viết tổng quan và phân tích yêu cầu | Chương bài toán, đối tượng và use case     | P0      | FND-01         |
| DOC-02 | Viết kiến trúc và database          | Sơ đồ kiến trúc, ERD và API                | P0      | FND-02–FND-04  |
| DOC-03 | Mô tả AI và thuật toán              | Constraint extraction, scoring và planning | P0      | PLAN-07        |
| DOC-04 | Trình bày kiểm thử và đánh giá      | Dataset, metric và kết quả test            | P0      | QA-02–QA-08    |
| DOC-05 | Viết hướng dẫn cài đặt              | README và cấu hình môi trường              | P0      | OPS-01–OPS-04  |
| DOC-06 | Chuẩn bị slide và video             | Slide, video và dữ liệu demo               | P0      | MVP hoàn thành |
| DOC-07 | Chuẩn bị kịch bản bảo vệ            | Phân vai, câu hỏi và phương án dự phòng    | P0      | DOC-01–DOC-06  |

## 23. Web, Mobile và shared client

### Shared client packages

| ID        | Task                          | Đầu ra                                            | Ưu tiên | Phụ thuộc |
| --------- | ----------------------------- | ------------------------------------------------- | ------- | --------- |
| CLIENT-01 | Tạo package contracts         | Zod schema và TypeScript types dùng chung         | P0      | FND-04    |
| CLIENT-02 | Tạo typed API client          | Auth, refresh token, error mapping và request ID  | P0      | CLIENT-01 |
| CLIENT-03 | Tạo domain helpers dùng chung | Format tiền/thời gian, constraint và plan helpers | P0      | CLIENT-01 |
| CLIENT-04 | Thiết kế query key convention | TanStack Query cache thống nhất hai client        | P1      | CLIENT-02 |
| CLIENT-05 | Thiết kế deep link contract   | URL plan/place dùng được trên Web và Mobile       | P1      | PLAN-12   |

### Web React

| ID     | Task                    | Đầu ra                                          | Ưu tiên | Phụ thuộc                        |
| ------ | ----------------------- | ----------------------------------------------- | ------- | -------------------------------- |
| WEB-01 | Khởi tạo React + Vite   | Web app chạy local và build production          | P0      | FND-05                           |
| WEB-02 | Thiết lập React Router  | Public, authenticated và admin routes           | P0      | WEB-01, AUTH-05                  |
| WEB-03 | Tạo Web design system   | Tailwind, shadcn/ui, theme và responsive layout | P0      | WEB-01                           |
| WEB-04 | Auth và onboarding      | Login, register, profile và preferences         | P0      | WEB-02, AUTH-01–AUTH-03, PREF-03 |
| WEB-05 | Explore và Place Detail | Search, filter, detail, favorite và review      | P0      | EXP-01–EXP-04, CLIENT-02         |
| WEB-06 | AI Planner              | Input, constraint confirmation và generate      | P0      | AI-06, CLIENT-02                 |
| WEB-07 | Itinerary experience    | Timeline, budget, map, save và share            | P0      | PLAN-08–PLAN-12                  |
| WEB-08 | Smart Replace           | Candidate modal và preview thay đổi             | P0      | REPLACE-04                       |
| WEB-09 | Admin Web               | CRUD place, category, event và review           | P1      | ADMIN-01–ADMIN-05                |
| WEB-10 | Web test                | Component test và Playwright E2E                | P0      | WEB-04–WEB-08                    |

### Mobile React Native

| ID     | Task                         | Đầu ra                                                | Ưu tiên | Phụ thuộc                          |
| ------ | ---------------------------- | ----------------------------------------------------- | ------- | ---------------------------------- |
| MOB-01 | Khởi tạo Expo React Native   | Android/iOS app chạy bằng development build           | P0      | FND-05                             |
| MOB-02 | Thiết lập Expo Router        | Auth stack, tabs và plan routes                       | P0      | MOB-01                             |
| MOB-03 | Tạo Mobile design system     | NativeWind, typography, spacing và components         | P0      | MOB-01                             |
| MOB-04 | Auth và secure session       | Login/register; refresh token trong SecureStore       | P0      | MOB-02, AUTH-01–AUTH-03, CLIENT-02 |
| MOB-05 | Quyền vị trí                 | Permission flow, denied state và lấy current location | P0      | MOB-01, MAP-02                     |
| MOB-06 | Explore và Place Detail      | Native list, search, filter, detail và favorite       | P0      | EXP-01–EXP-04, CLIENT-02           |
| MOB-07 | AI Planner                   | Input, constraint confirmation và generate            | P0      | AI-06, CLIENT-02                   |
| MOB-08 | Itinerary timeline và budget | Native timeline, save và share                        | P0      | PLAN-08, PLAN-09, BUDGET-02        |
| MOB-09 | Bản đồ native                | react-native-maps, marker, polyline và directions     | P0      | MAP-04, MOB-05                     |
| MOB-10 | Smart Replace                | Native bottom sheet và cập nhật plan                  | P0      | REPLACE-04                         |
| MOB-11 | Deep link và app link        | Mở shared place/plan trong app hoặc Web fallback      | P1      | CLIENT-05                          |
| MOB-12 | Offline/cache cơ bản         | Xem lại plan gần nhất khi mất mạng                    | P1      | MOB-08, CLIENT-04                  |
| MOB-13 | Push notification            | Expo Notifications cho reminder/weather phase 2       | P2      | NOTI-01, NOTI-02                   |
| MOB-14 | Mobile test                  | React Native Testing Library và flow test chính       | P0      | MOB-04–MOB-10                      |
| MOB-15 | EAS Build/Submit             | Bản internal Android/iOS và cấu hình signing          | P1      | MOB-14, QA-06                      |

Không chia sẻ UI component trực tiếp giữa Web và Mobile. Chỉ chia sẻ contract, API client, validation schema, query convention và domain logic không phụ thuộc nền tảng.

## 24. Thứ tự triển khai MVP

1. `FND -> AUTH -> PLACE`
2. `AI Understanding -> Recommendation`
3. `Maps/Distance -> Smart Itinerary -> Budget`
4. `Explore/Place Detail -> Timeline/Map`
5. `Smart Replace -> Admin`
6. `Security -> QA -> Deploy -> Báo cáo`

Các nhóm P2 chỉ được bắt đầu sau khi `QA-05` vượt qua đầy đủ ba hành trình demo.

## 25. Definition of Done chung

Một task chỉ chuyển sang `Done` khi:

- Đạt acceptance criteria và đã được review.
- Có test phù hợp; CI pass.
- Không chứa secret và input được validate.
- API/schema/tài liệu liên quan đã được cập nhật.
- UI có loading, empty và error state nếu áp dụng.
- Đã kiểm tra trên staging với dữ liệu gần thực tế.
